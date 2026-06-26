// PARSE BLOCK TEXT -> DOM PARTS
function parseText(text, ivals) {
  const parts = [];
  const re = /\[([a-z]+):([^\]]+)\]/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ kind: 'text', val: text.slice(last, m.index) });
    parts.push({ kind: 'input', itype: m[1], name: m[2], val: ivals[m[2]] !== undefined ? ivals[m[2]] : '' });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ kind: 'text', val: text.slice(last) });
  return parts;
}

function renderContent(parts, bobj) {
  const wrap = document.createElement('div');
  wrap.className = 'blk-content';

  parts.forEach(p => {
    if (p.kind === 'text') {
      const sp = document.createElement('span');
      sp.textContent = p.val;
      wrap.appendChild(sp);
      return;
    }

    if (p.itype === 'code') {
      wrap.appendChild(renderCodeInput(p, bobj));
      return;
    }

    if (p.itype === 'args') {
      wrap.appendChild(renderDynamicArgs(p, bobj));
      return;
    }

    wrap.appendChild(renderValueSlot(p, bobj));
  });

  return wrap;
}

function renderCodeInput(p, bobj) {
  const inp = document.createElement('textarea');
  inp.className = 'blk-input blk-code-input';
  inp.dataset.itype = p.itype;
  inp.dataset.iname = p.name;
  inp.dataset.bid = bobj.id;
  inp.value = p.val || '';
  inp.rows = 4;
  inp.addEventListener('mousedown', e => e.stopPropagation());
  inp.addEventListener('input', function() {
    const b = blocks.find(x => x.id == this.dataset.bid);
    if (b) b.ivals[this.dataset.iname] = this.value;
  });
  return inp;
}

function renderDynamicArgs(p, bobj) {
  const bd = def.blocks[bobj.defKey];
  const cfg = getDynamicArgConfig(bd, p.name);
  if (!Array.isArray(bobj.ivals[p.name])) bobj.ivals[p.name] = [];
  while (bobj.ivals[p.name].length < (cfg.min || 0)) bobj.ivals[p.name].push('');

  const wrap = document.createElement('span');
  wrap.className = `dynamic-args${bd.block_type === 'function' ? ' function-args' : ''}`;
  wrap.dataset.iname = p.name;
  wrap.dataset.bid = bobj.id;

  const renderItems = () => {
    wrap.innerHTML = '';
    bobj.ivals[p.name].forEach((_value, index) => {
      const slotName = `${p.name}_${index}`;
      const item = document.createElement('span');
      item.className = 'dynamic-arg-item';
      item.dataset.index = index;

      const slot = renderValueSlot({
        itype: cfg.inputType || 'text',
        name: slotName,
        val: bobj.ivals[p.name][index] || cfg.default || cfg.placeholder || '',
        options: cfg.options
      }, bobj);
      slot.classList.add('dynamic-value-slot');
      item.appendChild(slot);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'arg-remove-btn';
      remove.textContent = '-';
      remove.title = 'Quitar argumento';
      remove.addEventListener('mousedown', e => e.stopPropagation());
      remove.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        removeDynamicArg(bobj, p.name, index);
        renderItems();
      });
      item.appendChild(remove);
      wrap.appendChild(item);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'arg-add-btn';
    add.textContent = '+';
    add.title = 'Agregar argumento';
    add.addEventListener('mousedown', e => e.stopPropagation());
    add.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      bobj.ivals[p.name].push('');
      renderItems();
    });
    wrap.appendChild(add);
  };

  renderItems();
  return wrap;
}

function getDynamicArgConfig(bd, name) {
  return (bd.dynamicArgs && bd.dynamicArgs[name]) || {};
}

function removeDynamicArg(bobj, groupName, index) {
  const slotName = `${groupName}_${index}`;
  const childBid = bobj.nested && bobj.nested[slotName];
  if (childBid) {
    const child = blocks.find(b => b.id == childBid);
    if (child) detachBlockFromParent(child);
  }
  if (bobj.nested) delete bobj.nested[slotName];
  bobj.ivals[groupName].splice(index, 1);

  const shifted = {};
  Object.entries(bobj.nested || {}).forEach(([key, val]) => {
    const prefix = `${groupName}_`;
    if (!key.startsWith(prefix)) {
      shifted[key] = val;
      return;
    }
    const n = Number(key.slice(prefix.length));
    if (n < index) shifted[key] = val;
    if (n > index) {
      const nextKey = `${groupName}_${n - 1}`;
      shifted[nextKey] = val;
      const child = blocks.find(b => b.id == val);
      if (child) child.slotName = nextKey;
    }
  });
  bobj.nested = shifted;
}

function renderValueSlot(p, bobj) {
  const slot = document.createElement('span');
  slot.className = p.itype === 'expr' ? 'expr-slot value-slot' : 'value-slot';
  slot.dataset.itype = p.itype;
  slot.dataset.iname = p.name;
  slot.dataset.bid = bobj.id;
  slot.dataset.parentBid = bobj.id;

  const nestedBid = bobj.nested && bobj.nested[p.name];
  const nestedBlock = nestedBid ? blocks.find(b => b.id == nestedBid) : null;
  if (nestedBlock) {
    attachBlockToSlot(bobj, p.name, nestedBlock, slot);
  } else {
    slot.appendChild(renderInlineInput(p, bobj));
    slot.appendChild(renderSlotLinkButton(bobj, p.name, slot));
  }

  slot.addEventListener('click', e => {
    e.stopPropagation();
  });

  slot.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.stopPropagation();
    detachSlotChild(bobj, p.name, slot);
  });

  return slot;
}

function renderSlotLinkButton(bobj, slotName, slotEl) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'slot-link-btn';
  btn.textContent = '+';
  btn.title = 'Enlazar bloque';
  btn.addEventListener('mousedown', e => e.stopPropagation());
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedSlot && selectedSlot.parentBid == bobj.id && selectedSlot.slotName === slotName) {
      clearSelectedSlot();
      hideTip();
      return;
    }
    clearSelectedSlot();
    selectedSlot = { parentBid: bobj.id, slotName, slotEl, buttonEl: btn };
    slotEl.classList.add('expr-slot-selected');
    btn.textContent = '-';
    btn.classList.add('active');
    updateAttachHints();
    showTip(btn, 'Click en una expresion resaltada para insertarla');
  });
  return btn;
}

function renderInlineInput(p, bobj) {
  if (p.itype === 'select' || getSelectOptions(bobj, p.name).length) {
    return renderSelectInput(p, bobj);
  }

  const inp = document.createElement('input');
  inp.className = 'blk-input';
  inp.dataset.itype = p.itype;
  inp.dataset.iname = p.name;
  inp.dataset.bid = bobj.id;
  inp.type = p.itype === 'number' ? 'number' : 'text';
  inp.value = p.val || (p.itype === 'number' ? '0' : p.name);
  inp.style.width = Math.max(40, (inp.value.length + 2) * 8) + 'px';
  if (getInputValue(bobj, p.name) === undefined) setInputValue(bobj, p.name, inp.value);

  inp.addEventListener('mousedown', e => e.stopPropagation());
  inp.addEventListener('click', e => e.stopPropagation());
  inp.addEventListener('input', function() {
    this.style.width = Math.max(40, (this.value.length + 2) * 8) + 'px';
    const b = blocks.find(x => x.id == this.dataset.bid);
    if (b) setInputValue(b, this.dataset.iname, this.value);
  });
  return inp;
}

function renderSelectInput(p, bobj) {
  const select = document.createElement('select');
  select.className = 'blk-input blk-select';
  select.dataset.itype = p.itype;
  select.dataset.iname = p.name;
  select.dataset.bid = bobj.id;

  const options = getSelectOptions(bobj, p.name);
  const fallback = p.val || getInputConfig(bobj, p.name).default || (options[0] && getOptionValue(options[0])) || '';
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = getOptionValue(option);
    opt.textContent = getOptionLabel(option);
    select.appendChild(opt);
  });

  select.value = fallback;
  if (getInputValue(bobj, p.name) === undefined) setInputValue(bobj, p.name, select.value);

  select.addEventListener('mousedown', e => e.stopPropagation());
  select.addEventListener('click', e => e.stopPropagation());
  select.addEventListener('change', function() {
    const b = blocks.find(x => x.id == this.dataset.bid);
    if (b) setInputValue(b, this.dataset.iname, this.value);
  });
  return select;
}

function getSelectOptions(bobj, name) {
  const parsed = parseDynamicSlotName(name);
  if (parsed) {
    const bd = def.blocks[bobj.defKey] || {};
    const cfg = getDynamicArgConfig(bd, parsed.group);
    if (Array.isArray(cfg.options)) return cfg.options;
  }
  const cfg = getInputConfig(bobj, name);
  return Array.isArray(cfg.options) ? cfg.options : [];
}

function getInputConfig(bobj, name) {
  const bd = def.blocks[bobj.defKey] || {};
  const parsed = parseDynamicSlotName(name);
  const baseName = parsed ? parsed.group : name;
  return (bd.inputs && bd.inputs[baseName]) || (bd.selects && { options: bd.selects[baseName] }) || {};
}

function getOptionValue(option) {
  return typeof option === 'object' ? String(option.value ?? option.label ?? '') : String(option);
}

function getOptionLabel(option) {
  return typeof option === 'object' ? String(option.label ?? option.value ?? '') : String(option);
}

function setInputValue(bobj, name, value) {
  const parsed = parseDynamicSlotName(name);
  if (parsed) {
    if (!Array.isArray(bobj.ivals[parsed.group])) bobj.ivals[parsed.group] = [];
    bobj.ivals[parsed.group][parsed.index] = value;
  } else {
    bobj.ivals[name] = value;
  }
}

function getInputValue(bobj, name) {
  const parsed = parseDynamicSlotName(name);
  if (parsed) return Array.isArray(bobj.ivals[parsed.group]) ? bobj.ivals[parsed.group][parsed.index] : '';
  return bobj.ivals[name];
}

function parseDynamicSlotName(name) {
  const m = String(name).match(/^(.+)_(\d+)$/);
  if (!m) return null;
  return { group: m[1], index: Number(m[2]) };
}

function attachBlockToSlot(parentBlock, slotName, childBlock, slotEl) {
  if (!parentBlock || !childBlock || parentBlock.id == childBlock.id) return false;
  if (isDescendantBlock(childBlock.id, parentBlock.id)) return false;

  if (childBlock.parentBid) detachBlockFromParent(childBlock);

  if (!parentBlock.nested) parentBlock.nested = {};
  const previousBid = parentBlock.nested[slotName];
  if (previousBid && previousBid != childBlock.id) {
    const previous = blocks.find(b => b.id == previousBid);
    if (previous) detachBlockFromParent(previous);
  }

  parentBlock.nested[slotName] = childBlock.id;
  childBlock.parentBid = parentBlock.id;
  childBlock.slotName = slotName;

  slotEl.innerHTML = '';
  slotEl.classList.add('has-child');
  childBlock.el.style.position = 'relative';
  childBlock.el.style.left = '0px';
  childBlock.el.style.top = '0px';
  childBlock.el.style.transform = 'none';
  childBlock.el.classList.remove('selected', 'dragging-b');
  slotEl.appendChild(childBlock.el);
  redrawWires();
  return true;
}

function detachSlotChild(parentBlock, slotName, slotEl) {
  const childBid = parentBlock && parentBlock.nested ? parentBlock.nested[slotName] : null;
  const childBlock = childBid ? blocks.find(b => b.id == childBid) : null;
  if (!childBlock) return;
  detachBlockFromParent(childBlock, slotEl);
}

function detachBlockFromParent(childBlock, knownSlotEl = null) {
  if (!childBlock || !childBlock.parentBid) return;
  const parentBlock = blocks.find(b => b.id == childBlock.parentBid);
  const slotName = childBlock.slotName;
  const slotEl = knownSlotEl || document.querySelector(`.value-slot[data-bid="${childBlock.parentBid}"][data-iname="${slotName}"]`);
  const childRect = childBlock.el.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  if (parentBlock && parentBlock.nested) delete parentBlock.nested[slotName];
  childBlock.parentBid = null;
  childBlock.slotName = null;

  world.appendChild(childBlock.el);
  childBlock.el.style.position = 'absolute';
  setBlockWorldPos(childBlock.el, childRect.left - canvasRect.left - panX, childRect.top - canvasRect.top - panY);

  if (slotEl) {
    slotEl.classList.remove('has-child', 'expr-slot-selected');
    slotEl.innerHTML = '';
    const p = {
      itype: slotEl.dataset.itype,
      name: slotName,
      val: parentBlock ? getInputValue(parentBlock, slotName) : ''
    };
    slotEl.appendChild(renderInlineInput(p, parentBlock));
    slotEl.appendChild(renderSlotLinkButton(parentBlock, slotName, slotEl));
  }
  redrawWires();
}

function isDescendantBlock(candidateParentId, candidateChildId) {
  const child = blocks.find(b => b.id == candidateChildId);
  let current = child;
  while (current && current.parentBid) {
    if (current.parentBid == candidateParentId) return true;
    current = blocks.find(b => b.id == current.parentBid);
  }
  return false;
}

function updateAttachHints() {
  document.querySelectorAll('.blk.attach-candidate').forEach(el => el.classList.remove('attach-candidate'));
  if (!selectedSlot) return;
  blocks.forEach(b => {
    if (b.parentBid || b.id == selectedSlot.parentBid) return;
    if (b.el.dataset.isExpr !== 'true') return;
    if (isDescendantBlock(b.id, selectedSlot.parentBid)) return;
    b.el.classList.add('attach-candidate');
  });
}

// ═══════════════════════════════════════════════════════
//  CREATE BLOCK ON CANVAS
// ═══════════════════════════════════════════════════════
function createBlock(defKey, x, y, ivals = {}, overrideId = null) {
  const bd = def.blocks[defKey];
  if (!bd) return;
  const meta = BLOCK_TYPE_META[bd.block_type] || BLOCK_TYPE_META['a-b'];
  const id = overrideId !== null ? overrideId : ++bseq;
  const color = bd.color || '#555';
  const isExpr = isExpressionBlockDef(bd, meta);
  const bobj = { id, defKey, el: null, ivals: { ...ivals }, parentBid: null, slotName: null, nested: {} };

  const wrap = document.createElement('div');
  wrap.className = isExpr ? 'blk blk-expr' : 'blk';
  wrap.dataset.bid = id;
  wrap.dataset.defkey = defKey;
  wrap.dataset.isExpr = isExpr;
  setBlockWorldPos(wrap, x, y);
  bobj.el = wrap;

  // body
  const body = document.createElement('div');
  body.className = isExpr ? 'blk-body blk-body-expr' : 'blk-body';
  body.style.background = colorDarken(color, 0.7);
  body.style.borderColor = colorDarken(color, 0.5);
  body.style.boxShadow = `0 4px 20px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1)`;

  // top notch
  if (meta.notchTop) {
    const nt = document.createElement('div');
    nt.className = 'blk-notch-top';
    nt.style.background = colorDarken(color, 0.45);
    wrap.appendChild(nt);
    body.style.borderTopLeftRadius = '4px';
  }

  const tag = document.createElement('div');
  tag.className = 'blk-tag';
  tag.style.color = color;
  tag.textContent = meta.tag;
  if (!isExpr) body.appendChild(tag);

  const parts = parseText(bd.text, ivals);
  body.appendChild(renderContent(parts, bobj));

  // condition labels
  if (bd.block_type === 'condition') {
    const lrow = document.createElement('div');
    lrow.style.cssText = 'display:flex;justify-content:space-between;margin-top:6px;font-size:10px;opacity:.6';
    lrow.innerHTML = `<span style="color:#5c9eff">✓ verdadero</span><span style="color:#ff5577">✗ falso</span>`;
    body.appendChild(lrow);
  }

  // bottom notch
  if (meta.notchBot) {
    const nb = document.createElement('div');
    nb.className = 'blk-notch-bot';
    nb.style.background = colorDarken(color, 0.45);
    body.appendChild(nb);
  }

  wrap.appendChild(body);

  // Click to attach to selected slot (for expression/value blocks)
  if (isExpr) {
    wrap.addEventListener('click', e => {
      if (selectedSlot && !e.target.classList.contains('expr-slot')) {
        const parentBlock = blocks.find(b => b.id == selectedSlot.parentBid);
        if (parentBlock && attachBlockToSlot(parentBlock, selectedSlot.slotName, bobj, selectedSlot.slotEl)) {
          clearSelectedSlot();
          hideTip();
        }
      }
    });
  }

  // connector dots (only for non-expr blocks)
  if (!isExpr) {
    const bw = 160; // estimated, will use actual after append
    meta.conns.forEach(c => {
      const dot = document.createElement('div');
      dot.className = 'cdot';
      dot.dataset.bid = id;
      dot.dataset.cid = c.id;
      dot.dataset.dir = c.dir;
      dot.dataset.pos = c.pos;
      // position is set after append via updateDotPositions
      wrap.appendChild(dot);

      dot.addEventListener('mousedown', onWireDown);
      dot.addEventListener('mouseenter', e => {
        if (wiring) dot.classList.add('snap');
        showTip(dot, c.dir === 'in' ? 'Entrada' : c.id === 'true' ? 'Verdadero' : c.id === 'false' ? 'Falso' : 'Salida');
      });
      dot.addEventListener('mouseleave', () => { dot.classList.remove('snap'); hideTip(); });
    });
  }

  wrap.addEventListener('mousedown', onBlockDown);
  wrap.addEventListener('contextmenu', onCtxMenu);
  world.appendChild(wrap);

  // set dot positions now that we have real size
  if (!isExpr) {
    requestAnimationFrame(() => updateDotPositions(wrap, meta));
  }

  blocks.push(bobj);
  return bobj;
}

function updateDotPositions(wrap, meta) {
  const w = wrap.offsetWidth;
  const h = wrap.offsetHeight;
  meta.conns.forEach(c => {
    const dot = wrap.querySelector(`.cdot[data-cid="${c.id}"]`);
    if (!dot) return;
    let lx, ly;
    if (c.pos === 'top')   { lx = 36; ly = 0; }
    else if (c.pos === 'bot') { lx = 36; ly = h; }
    else if (c.pos === 'bot-l') { lx = w * 0.28; ly = h; }
    else if (c.pos === 'bot-r') { lx = w * 0.72; ly = h; }
    else if (c.pos === 'right') { lx = w; ly = h * 0.5; }
    dot.style.left = lx + 'px';
    dot.style.top  = ly + 'px';
  });
}

// ═══════════════════════════════════════════════════════
//  DRAG BLOCKS
// ═══════════════════════════════════════════════════════
function onBlockDown(e) {
  if (e.target.classList.contains('cdot')) return;
  if (e.target.classList.contains('blk-input')) return;
  if (e.button !== 0) return;
  e.preventDefault();
  e.stopPropagation();
  document.querySelectorAll('.blk.selected').forEach(b => b.classList.remove('selected'));
  const el = e.currentTarget;
  const bobj = blocks.find(b => b.id == el.dataset.bid);
  if (bobj && bobj.parentBid) detachBlockFromParent(bobj);
  el.classList.add('selected', 'dragging-b');
  const er = el.getBoundingClientRect();
  dragOX = e.clientX - er.left;
  dragOY = e.clientY - er.top;
  dragging = el;
}

// TRAY DRAG + CATEGORY JUMP
function rebuildTray() {
  const tb = document.getElementById('tray-blocks');
  const cats = document.getElementById('tray-categories');
  tb.innerHTML = '';
  cats.innerHTML = '';
  if (!def) return;

  const badge = document.getElementById('lang-badge');
  badge.textContent = (def.lang || '?').toUpperCase();
  const pn = document.getElementById('project-name');
  if (def.project) pn.value = def.project;

  const grouped = groupBlocksByCategory();
  renderCategoryList(cats, grouped);

  Object.entries(grouped).forEach(([cat, entries]) => {
    if (activeTrayCategory !== 'all' && activeTrayCategory !== cat) return;

    const section = document.createElement('div');
    section.className = 'tray-section';
    section.id = `tray-cat-${cat}`;
    section.style.setProperty('--cat-color', getCategoryColor(cat));

    const title = document.createElement('div');
    title.className = 'tray-section-title';
    title.textContent = getCategoryLabel(cat);
    section.appendChild(title);

    entries.forEach(([key, bd]) => section.appendChild(createTrayBlock(key, bd)));
    tb.appendChild(section);
  });
}

function groupBlocksByCategory() {
  const grouped = {};
  Object.entries(def.blocks).forEach(([key, bd]) => {
    const cat = bd.category || 'general';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push([key, bd]);
  });
  return grouped;
}

function renderCategoryList(cats, grouped) {
  const allBtn = createCategoryButton('all', 'Todos', '#777', Object.values(grouped).flat().length);
  cats.appendChild(allBtn);

  Object.keys(grouped).forEach(cat => {
    cats.appendChild(createCategoryButton(cat, getCategoryLabel(cat), getCategoryColor(cat), grouped[cat].length));
  });
}

function createCategoryButton(cat, label, color, count) {
  const btn = document.createElement('button');
  btn.className = `tray-cat${activeTrayCategory === cat ? ' active' : ''}`;
  btn.innerHTML = `<span class="tray-cat-swatch" style="background:${color}"></span><span>${escHtml(label)}</span><span style="margin-left:auto;opacity:.55">${count}</span>`;
  btn.addEventListener('click', () => {
    activeTrayCategory = cat;
    rebuildTray();
    const target = cat === 'all' ? document.getElementById('tray-blocks') : document.getElementById(`tray-cat-${cat}`);
    if (target) target.scrollIntoView({ block: 'start' });
  });
  return btn;
}

function createTrayBlock(key, bd) {
  const meta = BLOCK_TYPE_META[bd.block_type] || BLOCK_TYPE_META['a-b'];
  const isExprPreview = isExpressionBlockDef(bd, meta);
  const item = document.createElement('div');
  item.className = `tray-block tray-${bd.block_type}${isExprPreview ? ' tray-expr' : ''}`;
  item.dataset.defkey = key;
  item.draggable = true;
  item.style.background = colorDarken(bd.color || '#555', 0.7);
  item.style.borderColor = colorDarken(bd.color || '#555', 0.5);

  const label = renderTrayLabel(bd.text);
  item.innerHTML = `
    <div class="tb-type" style="color:${bd.color || '#aaa'}">${escHtml(meta.tag)}</div>
    <div class="tb-label">${label}</div>
    <div class="tb-sub">${escHtml(key)}</div>`;

  item.addEventListener('dragstart', e => e.dataTransfer.setData('defkey', key));
  item.addEventListener('mouseenter', () => showTip(item, bd.action));
  item.addEventListener('mouseleave', hideTip);
  return item;
}

function renderTrayLabel(text) {
  return escHtml(text).replace(/\[([a-z]+):([^\]]+)\]/g, (_m, type, name) => {
    return `<span class="tb-input-pill">${escHtml(type)}:${escHtml(name)}</span>`;
  });
}

function getCategoryColor(cat) {
  return (def.categories && def.categories[cat]) || '#777';
}

function getCategoryLabel(cat) {
  return cat.replace(/[_-]+/g, ' ');
}

canvas.addEventListener('dragover', e => e.preventDefault());
canvas.addEventListener('drop', e => {
  e.preventDefault();
  const key = e.dataTransfer.getData('defkey');
  if (!key || !def) return;
  const p = screenToWorld(e);
  createBlock(key, p.x - 80, p.y - 25);
});

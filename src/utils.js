// UTILS
function clearCanvas(force = false) {
  if (!force && !confirm('Limpiar canvas?')) return false;
  blocks.forEach(b => b.el.remove());
  blocks = [];
  conns = [];
  wsvg.innerHTML = '';
  clearSelectedSlot();
  dragging = null;
  wiring = null;
  return true;
}

function isBlockOnCanvas(b) {
  return b && b.el && b.el.parentElement === world;
}

function setBlockWorldPos(el, x, y) {
  el.style.left = `${Math.round(x)}px`;
  el.style.top = `${Math.round(y)}px`;
  el.dataset.x = Math.round(x);
  el.dataset.y = Math.round(y);
}

function getBlockWorldPos(el) {
  return {
    x: Number(el.dataset.x ?? parseFloat(el.style.left) ?? 0) || 0,
    y: Number(el.dataset.y ?? parseFloat(el.style.top) ?? 0) || 0
  };
}

function canvasPoint(e) {
  const cr = canvas.getBoundingClientRect();
  return { x: e.clientX - cr.left, y: e.clientY - cr.top };
}

function screenToWorld(e) {
  const p = canvasPoint(e);
  return { x: p.x - panX, y: p.y - panY };
}

function updateWorldTransform() {
  world.style.transform = `translate(${panX}px, ${panY}px)`;
  canvas.style.backgroundPosition = `${panX}px ${panY}px`;
  redrawWires();
}

function clearSelectedSlot() {
  if (selectedSlot && selectedSlot.slotEl) {
    selectedSlot.slotEl.classList.remove('expr-slot-selected');
  }
  if (selectedSlot && selectedSlot.buttonEl) {
    selectedSlot.buttonEl.textContent = '+';
    selectedSlot.buttonEl.classList.remove('active');
  }
  selectedSlot = null;
  document.querySelectorAll('.blk.attach-candidate').forEach(el => el.classList.remove('attach-candidate'));
}

function isExpressionBlockDef(blockDef, meta) {
  if (!blockDef) return false;
  if (meta && meta.isExpr) return true;
  if (blockDef.block_type === 'expr' || blockDef.output) return true;
  const action = String(blockDef.action || '').trim();
  const category = String(blockDef.category || '').toLowerCase();
  const valueCategory = category === 'operators' || category === 'sensing';
  return valueCategory && action && !/[;{]$/.test(action);
}

function colorDarken(hex, factor) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const rf = Math.round(r * factor);
  const gf = Math.round(g * factor);
  const bf = Math.round(b * factor);
  return `rgb(${rf},${gf},${bf})`;
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showTip(el, txt) {
  if (!txt) return;
  const r = el.getBoundingClientRect();
  tip.innerHTML = escHtml(String(txt).slice(0, 80));
  tip.style.left = `${r.left}px`;
  tip.style.top = `${r.top - 30}px`;
  tip.style.opacity = 1;
}

function hideTip() {
  tip.style.opacity = 0;
}

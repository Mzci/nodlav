// ═══════════════════════════════════════════════════════
//  CONTEXT MENU
// ═══════════════════════════════════════════════════════
function onCtxMenu(e) {
  e.preventDefault();
  ctxTarget = e.currentTarget.dataset.bid;
  const ctx = document.getElementById('ctx');
  ctx.style.display = 'block';
  ctx.style.left = e.clientX + 'px';
  ctx.style.top  = e.clientY + 'px';
}
function closeCtx() { document.getElementById('ctx').style.display='none'; ctxTarget=null; }
function ctxDel() {
  if (!ctxTarget) return;
  const ids = collectBlockTreeIds(ctxTarget);
  conns = conns.filter(c => !ids.has(String(c.from)) && !ids.has(String(c.to)));
  ids.forEach(id => {
    const el = canvas.querySelector(`.blk[data-bid="${id}"]`);
    if (el) el.remove();
  });
  blocks.forEach(b => {
    if (b.nested) {
      Object.keys(b.nested).forEach(slot => {
        if (ids.has(String(b.nested[slot]))) delete b.nested[slot];
      });
    }
  });
  blocks = blocks.filter(b => !ids.has(String(b.id)));
  redrawWires(); closeCtx();
}
function ctxDisconn() {
  if (!ctxTarget) return;
  conns = conns.filter(c => c.from!=ctxTarget && c.to!=ctxTarget);
  document.querySelectorAll(`.cdot[data-bid="${ctxTarget}"]`).forEach(d => d.classList.remove('in-use'));
  redrawWires(); closeCtx();
}
document.addEventListener('click', () => { closeCtx(); });

function collectBlockTreeIds(rootId) {
  const ids = new Set([String(rootId)]);
  let changed = true;
  while (changed) {
    changed = false;
    blocks.forEach(b => {
      if (b.parentBid && ids.has(String(b.parentBid)) && !ids.has(String(b.id))) {
        ids.add(String(b.id));
        changed = true;
      }
    });
  }
  return ids;
}

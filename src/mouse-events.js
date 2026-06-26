// ═══════════════════════════════════════════════════════
//  MOUSE EVENTS
// ═══════════════════════════════════════════════════════
canvas.addEventListener('mousedown', e => {
  if (e.button === 2) {
    if (e.target.closest('.blk')) return;
    e.preventDefault();
    e.stopPropagation();
    panning = true;
    panStartX = e.clientX - panX;
    panStartY = e.clientY - panY;
    canvas.style.cursor = 'grabbing';
  }
});

canvas.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('mousemove', e => {
  const cp = canvasPoint(e);
  const wp = screenToWorld(e);

  if (panning) {
    panX = e.clientX - panStartX;
    panY = e.clientY - panStartY;
    updateWorldTransform();
    return;
  }

  if (dragging) {
    setBlockWorldPos(dragging, wp.x - dragOX, wp.y - dragOY);
    redrawWires();
  }

  if (wiring && previewEl) {
    const d1 = canvas.querySelector(`.cdot[data-bid="${wiring.bid}"][data-cid="${wiring.cid}"]`);
    if (d1) { const p = dotAbsPos(d1); previewEl.setAttribute('d', bezier(p.x,p.y,cp.x,cp.y)); }
    const SNAP = 24;
    document.querySelectorAll('.cdot').forEach(d => {
      if (d === wiring.el) return;
      const p = dotAbsPos(d);
      d.classList.toggle('snap', Math.hypot(p.x-cp.x, p.y-cp.y) < SNAP);
    });
  }
});

document.addEventListener('mouseup', e => {
  if (panning) {
    panning = false;
    canvas.style.cursor = 'default';
  }
  if (dragging) {
    dragging.classList.remove('dragging-b');
    dragging = null;
  }
  if (wiring) {
    const cp = canvasPoint(e);
    const SNAP = 24;
    let best = null, bestD = SNAP;
    document.querySelectorAll('.cdot').forEach(d => {
      if (d === wiring.el) return;
      // prevent connecting two outputs or two inputs
      if (d.dataset.dir === wiring.el.dataset.dir) return;
      const p = dotAbsPos(d);
      const dist = Math.hypot(p.x-cp.x, p.y-cp.y);
      if (dist < bestD) { bestD = dist; best = d; }
    });
    if (best) {
      const dup = conns.some(c =>
        (c.from==wiring.bid&&c.fc==wiring.cid&&c.to==best.dataset.bid&&c.tc==best.dataset.cid)||
        (c.from==best.dataset.bid&&c.fc==best.dataset.cid&&c.to==wiring.bid&&c.tc==wiring.cid)
      );
      if (!dup) {
        // ensure from=out, to=in
        let from=wiring.bid,fc=wiring.cid,to=best.dataset.bid,tc=best.dataset.cid;
        if (wiring.el.dataset.dir==='in') { [from,fc,to,tc]=[to,tc,from,fc]; }
        conns.push({from,fc,to,tc});
      }
      best.classList.remove('snap');
    }
    document.querySelectorAll('.cdot').forEach(d => d.classList.remove('snap'));
    if (previewEl) { previewEl.remove(); previewEl = null; }
    wiring = null;
    redrawWires();
  }
});

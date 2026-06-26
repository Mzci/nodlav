// ═══════════════════════════════════════════════════════
//  WIRING
// ═══════════════════════════════════════════════════════
function onWireDown(e) {
  e.stopPropagation(); e.preventDefault();
  wiring = { bid: e.currentTarget.dataset.bid, cid: e.currentTarget.dataset.cid, el: e.currentTarget };
  previewEl = document.createElementNS('http://www.w3.org/2000/svg','path');
  previewEl.setAttribute('class','wire-preview');
  wsvg.appendChild(previewEl);
}

function dotAbsPos(dot) {
  const cr = canvas.getBoundingClientRect();
  const dr = dot.getBoundingClientRect();
  return { x: dr.left + dr.width/2 - cr.left, y: dr.top + dr.height/2 - cr.top };
}

function bezier(x1,y1,x2,y2) {
  const dy = Math.max(Math.abs(y2-y1)*0.55, 50);
  return `M${x1},${y1} C${x1},${y1+dy} ${x2},${y2-dy} ${x2},${y2}`;
}

function redrawWires() {
  // remove live wires but keep preview
  wsvg.querySelectorAll('.wire-live,.wire-glow').forEach(e=>e.remove());
  // reset dot state
  document.querySelectorAll('.cdot').forEach(d => d.classList.remove('in-use'));

  conns.forEach(c => {
    const d1 = canvas.querySelector(`.cdot[data-bid="${c.from}"][data-cid="${c.fc}"]`);
    const d2 = canvas.querySelector(`.cdot[data-bid="${c.to}"][data-cid="${c.tc}"]`);
    if (!d1 || !d2) return;
    const p1 = dotAbsPos(d1), p2 = dotAbsPos(d2);
    const bz = bezier(p1.x,p1.y,p2.x,p2.y);

    const glow = document.createElementNS('http://www.w3.org/2000/svg','path');
    glow.setAttribute('class','wire-glow');
    const line = document.createElementNS('http://www.w3.org/2000/svg','path');
    line.setAttribute('class','wire-live');

    // conditional coloring
    let strokeColor = null;
    if (c.fc === 'true')  strokeColor = '#5c9eff';
    if (c.fc === 'false') strokeColor = '#ff5577';
    if (strokeColor) {
      line.setAttribute('stroke', strokeColor);
      glow.setAttribute('stroke', strokeColor);
    }

    glow.setAttribute('d', bz);
    line.setAttribute('d', bz);

    wsvg.insertBefore(glow, wsvg.firstChild);
    wsvg.insertBefore(line, wsvg.firstChild);
    d1.classList.add('in-use');
    d2.classList.add('in-use');
  });
}

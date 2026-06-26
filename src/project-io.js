// PROJECT IMPORT/EXPORT
function exportProject() {
  const proj = {
    project: document.getElementById('project-name').value || '',
    lang: def ? def.lang : '',
    prelude: def ? def.prelude : '',
    blocks: def ? def.blocks : {},
    categories: def ? def.categories : {},
    canvas: {
      view: { x: panX, y: panY },
      placed: blocks.map(b => {
        const pos = getBlockWorldPos(b.el);
        return {
          id: b.id,
          defKey: b.defKey,
          x: pos.x,
          y: pos.y,
          ivals: b.ivals,
          parentBid: b.parentBid,
          slotName: b.slotName,
          nested: b.nested || {}
        };
      }),
      connections: conns
    }
  };
  const a = document.createElement('a');
  a.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(proj, null, 2));
  a.download = `${(proj.project || 'proyecto').replace(/\s+/g, '_')}.blockengine.json`;
  a.click();
}

function importProject() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const proj = JSON.parse(event.target.result);
        clearCanvas(true);

        if (proj.blocks) {
          def = {
            project: proj.project,
            lang: proj.lang,
            prelude: proj.prelude || '',
            categories: proj.categories || {},
            blocks: proj.blocks
          };
          activeTrayCategory = 'all';
          rebuildTray();
        }

        if (proj.project) document.getElementById('project-name').value = proj.project;

        const placed = (proj.canvas && proj.canvas.placed) || [];
        placed.forEach(b => createBlock(b.defKey, b.x, b.y, b.ivals || {}, b.id));

        placed.forEach(saved => {
          const b = blocks.find(x => x.id == saved.id);
          if (!b) return;
          b.nested = saved.nested || {};
          b.parentBid = null;
          b.slotName = null;
        });
        restoreNestedBlocks();

        bseq = placed.length ? Math.max(...placed.map(b => Number(b.id) || 0)) : 0;
        conns = (proj.canvas && proj.canvas.connections) || [];

        panX = (proj.canvas && proj.canvas.view && Number(proj.canvas.view.x)) || 0;
        panY = (proj.canvas && proj.canvas.view && Number(proj.canvas.view.y)) || 0;
        updateWorldTransform();
      } catch (err) {
        alert('Error al importar proyecto: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function restoreNestedBlocks() {
  blocks.forEach(parent => {
    Object.entries(parent.nested || {}).forEach(([slotName, childBid]) => {
      const child = blocks.find(b => b.id == childBid);
      const slotEl = parent.el.querySelector(`.value-slot[data-iname="${slotName}"]`);
      if (child && slotEl) attachBlockToSlot(parent, slotName, child, slotEl);
    });
  });
}

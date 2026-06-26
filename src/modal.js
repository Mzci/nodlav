// ═══════════════════════════════════════════════════════
//  JSON MODAL
// ═══════════════════════════════════════════════════════
function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  document.getElementById('modal-error').textContent = '';
  if (!document.getElementById('json-textarea').value)
    document.getElementById('json-textarea').value = JSON.stringify(EXAMPLE_JSON, null, 2);
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function loadExample() {
  document.getElementById('json-textarea').value = JSON.stringify(EXAMPLE_JSON, null, 2);
  document.getElementById('modal-overlay').classList.add('open');
}

function applyJSON() {
  const raw = document.getElementById('json-textarea').value;
  const errEl = document.getElementById('modal-error');
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.blocks || typeof parsed.blocks !== 'object') throw new Error("Falta 'blocks'");
    // validate each block has block_type and action
    Object.entries(parsed.blocks).forEach(([k,v]) => {
      if (!v.block_type) throw new Error(`Bloque '${k}' sin block_type`);
      if (!BLOCK_TYPE_META[v.block_type]) throw new Error(`block_type '${v.block_type}' desconocido. Válidos: ${Object.keys(BLOCK_TYPE_META).join(', ')}`);
    });
    def = parsed;
    activeTrayCategory = 'all';
    rebuildTray();
    closeModal();
  } catch(e) {
    errEl.textContent = '⚠ ' + e.message;
  }
}

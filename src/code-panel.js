// ═══════════════════════════════════════════════════════
//  CODE PANEL (LIVE CODE PREVIEW)
// ═══════════════════════════════════════════════════════
const codePanel = document.getElementById('code-panel');
const codeContent = document.getElementById('code-content').querySelector('code');

function toggleCodePanel() {
  codePanel.classList.toggle('open');
  if (codePanel.classList.contains('open')) {
    updateLiveCode();
  }
}

function updateLiveCode() {
  if (!def) {
    codeContent.textContent = '// Cargá una definición primero';
    return;
  }
  const code = buildCodeGraph();
  codeContent.textContent = code || '// No hay bloques conectados a un inicio';
}

// Hook into existing mouseup to update code panel
const originalMouseUp = document.addEventListener.toString();
document.addEventListener('mouseup', e => {
  if (codePanel.classList.contains('open')) {
    updateLiveCode();
  }
});

// Update after block creation/deletion
const observer = new MutationObserver(() => {
  if (codePanel.classList.contains('open')) {
    updateLiveCode();
  }
});

observer.observe(canvas, { childList: true, subtree: true });

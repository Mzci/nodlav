// ═══════════════════════════════════════════════════════
//  OUTPUT PANEL
// ═══════════════════════════════════════════════════════
function openOutput(tab) {
  document.getElementById('output-panel').classList.add('open');
  if (tab) switchTab(tab);
}
function closeOutput() { document.getElementById('output-panel').classList.remove('open'); }
function switchTab(t) {
  activeTab = t;
  document.querySelectorAll('.out-tab').forEach(bt => bt.classList.toggle('active', bt.textContent.toLowerCase().includes(t === 'console' ? 'consola' : 'código')));
}
function writeOut(html) {
  const ob = document.getElementById('out-body');
  ob.innerHTML += html + '\n';
  ob.scrollTop = ob.scrollHeight;
}

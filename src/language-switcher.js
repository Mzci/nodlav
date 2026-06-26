// ═══════════════════════════════════════════════════════
//  LANGUAGE SWITCHER
// ═══════════════════════════════════════════════════════
function changeLanguage() {
  const lang = document.getElementById('lang-selector').value;
  let langTemplate;
  
  switch(lang) {
    case 'py':
      langTemplate = PYTHON_JSON;
      break;
    case 'cpp':
      langTemplate = CPP_JSON;
      break;
    case 'php':
      langTemplate = PHP_JSON;
      break;
    default:
      langTemplate = EXAMPLE_JSON;
  }
  
  // Clear canvas and load new template
  if (!clearCanvas()) return;
  def = langTemplate;
  rebuildTray();
  
  // Update lang badge
  document.getElementById('lang-badge').textContent = lang.toUpperCase();
}

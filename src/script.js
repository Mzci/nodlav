// ═══════════════════════════════════════════════════════
//  BOOT — auto load example
// ═══════════════════════════════════════════════════════
def = EXAMPLE_JSON;
rebuildTray();
// place a few starter blocks
setTimeout(() => {
  createBlock('start',   60, 50);
  createBlock('log',     60, 160, { mensaje: 'Hola mundo' });
  createBlock('loop',    60, 270, { veces: '3' });
  createBlock('comment', 280, 50, { nota: 'Este es mi programa' });
}, 50);
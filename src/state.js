// ═══════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════
let def = null;         // loaded JSON definition
let blocks = [];        // placed blocks on canvas
let conns = [];         // wire connections
let bseq = 0;
let dragging = null, dragOX = 0, dragOY = 0;
let wiring = null;      // { bid, cid, el }
let previewEl = null;
let ctxTarget = null;
let activeTab = 'console';
let panning = false, panStartX = 0, panStartY = 0, panX = 0, panY = 0;
let nesting = null;     // { parentBid, slotName } for nesting expr blocks
let selectedSlot = null; // { parentBid, slotName, slotEl } for click-based nesting
let activeTrayCategory = 'all';

const canvas = document.getElementById('canvas');
const wsvg   = document.getElementById('wsvg');
const world  = document.getElementById('world');
const tip    = document.getElementById('tip');

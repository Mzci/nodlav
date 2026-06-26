// ═══════════════════════════════════════════════════════
//  CODE GENERATION
// ═══════════════════════════════════════════════════════
function resolveAction(bd, ivals, bobj) {
  let action = bd.action || '';
  const definedVars = getDefinedVariables();
  
  Object.entries(ivals).forEach(([k,v]) => {
    action = Array.isArray(v)
      ? applyDynamicArgsReplacement(action, k, v, bobj, definedVars)
      : applyFieldReplacement(action, k, v, bobj, definedVars);
  });
  return action;
}

// Recursively resolve an expression block
function resolveExprBlock(bobj) {
  const bd = def.blocks[bobj.defKey];
  if (!bd) return '';

  const definedVars = getDefinedVariables();
  let action = bd.action || '';
  Object.entries(bobj.ivals).forEach(([k, v]) => {
    action = Array.isArray(v)
      ? applyDynamicArgsReplacement(action, k, v, bobj, definedVars)
      : applyFieldReplacement(action, k, v, bobj, definedVars);
  });

  return action;
}

// Get all variable names and their values from set_var blocks
function getDefinedVariables() {
  const vars = {};
  blocks.forEach(b => {
    const bd = def.blocks[b.defKey];
    if (!bd) return;

    ['nombre', 'variable', 'resultado', 'array', 'lista', 'name'].forEach(k => {
      if (b.ivals[k]) vars[b.ivals[k]] = b.ivals[k];
    });

    if (bd.block_type === 'function' && Array.isArray(b.ivals.args)) {
      b.ivals.args.forEach(arg => {
        if (arg) vars[arg] = arg;
      });
    }
  });
  return vars;
}

// Resolve {{var}} references in input values
function resolveInputValue(value, definedVars) {
  if (!value) return value;
  let resolved = value;

  if (definedVars[resolved]) return resolved;
  
  // Check if value contains any {{var}} references
  const hasVarRefs = Object.keys(definedVars).some(varName => 
    resolved.includes('{{' + varName + '}}')
  );
  
  if (hasVarRefs) {
    // Build concatenation for string with variables
    const parts = [];
    let lastPos = 0;
    
    // Find all variable references in order
    const allMatches = [];
    Object.keys(definedVars).forEach(varName => {
      const pattern = '{{' + varName + '}}';
      let pos = resolved.indexOf(pattern);
      while (pos !== -1) {
        allMatches.push({ pos, varName, pattern });
        pos = resolved.indexOf(pattern, pos + 1);
      }
    });
    
    // Sort by position
    allMatches.sort((a, b) => a.pos - b.pos);
    
    allMatches.forEach(match => {
      // Add text before variable
      if (match.pos > lastPos) {
        const text = resolved.slice(lastPos, match.pos);
        parts.push(JSON.stringify(text));
      }
      // Add variable reference (use variable name for runtime references)
      parts.push(match.varName);
      lastPos = match.pos + match.pattern.length;
    });
    
    // Add remaining text
    if (lastPos < resolved.length) {
      parts.push(JSON.stringify(resolved.slice(lastPos)));
    }
    
    // Join with + for concatenation
    resolved = parts.join(' + ');
  } else {
    // No variables - check if value is a number
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && value.trim() !== '' && !isNaN(value)) {
      // It's a number, return without quotes
      resolved = value;
    } else {
      // It's a string, add quotes
      resolved = JSON.stringify(value);
    }
  }
  
  return resolved;
}

function isExpressionField(name) {
  return ![
    'nombre', 'variable', 'resultado', 'array', 'lista', 'name',
    'modulo', 'alias', 'nombres', 'libreria', 'tipo', 'metodo', 'prop',
    'item', 'i', 'dict', 'objeto', 'respuesta', 'vector', 'servo', 'modo', 'nivel'
  ].includes(name);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyFieldReplacement(action, key, value, bobj, definedVars) {
  const rawReplacement = value ?? '';
  const replacement = getExpressionReplacement(key, value, bobj, definedVars);
  const safeKey = escapeRegExp(key);
  return action
    .replace(new RegExp(`(['"\`])\\{\\{${safeKey}\\}\\}\\1`, 'g'), replacement)
    .split('{{' + key + '}}').join(replacement)
    .split('&' + key + '&').join(rawReplacement);
}

function getExpressionReplacement(key, value, bobj, definedVars) {
  if (bobj && bobj.nested && bobj.nested[key]) {
    const nestedBlock = blocks.find(b => b.id == bobj.nested[key]);
    return nestedBlock ? resolveExprBlock(nestedBlock) : resolveInputValue(value, definedVars);
  }
  if (isRawField(key, bobj)) return value ?? '';
  if (!isExpressionField(key)) return value ?? '';
  return value ? resolveInputValue(value, definedVars) : `/* ${key} no definido */`;
}

function isRawField(key, bobj) {
  if (!bobj || !def || !def.blocks) return false;
  const bd = def.blocks[bobj.defKey] || {};
  const parsed = parseDynamicSlotNameForCode(key);
  const baseKey = parsed ? parsed.group : key;
  const cfg = (bd.inputs && bd.inputs[baseKey]) || {};
  if (cfg.raw !== undefined) return !!cfg.raw;
  return getFieldType(bd, baseKey) === 'select';
}

function getFieldType(bd, name) {
  const re = /\[([a-z]+):([^\]]+)\]/g;
  let m;
  while ((m = re.exec(bd.text || '')) !== null) {
    if (m[2] === name) return m[1];
  }
  return '';
}

function parseDynamicSlotNameForCode(name) {
  const m = String(name).match(/^(.+)_(\d+)$/);
  if (!m) return null;
  return { group: m[1], index: Number(m[2]) };
}

function applyDynamicArgsReplacement(action, key, values, bobj, definedVars) {
  const bd = def.blocks[bobj.defKey];
  const cfg = (bd.dynamicArgs && bd.dynamicArgs[key]) || {};
  const joiner = cfg.join !== undefined ? cfg.join : ', ';
  const mode = cfg.mode || 'expr';
  const parts = values.map((value, index) => {
    const slotName = `${key}_${index}`;
    if (bobj.nested && bobj.nested[slotName]) {
      const nestedBlock = blocks.find(b => b.id == bobj.nested[slotName]);
      if (nestedBlock) return resolveExprBlock(nestedBlock);
    }
    if (mode === 'raw') return value || cfg.placeholder || `arg${index + 1}`;
    if (cfg.raw) return value || cfg.placeholder || '';
    return value ? resolveInputValue(value, definedVars) : `/* ${key}${index + 1} */`;
  });
  const replacement = parts.join(joiner);
  const safeKey = escapeRegExp(key);
  return action
    .replace(new RegExp(`(['"\`])\\{\\{${safeKey}\\}\\}\\1`, 'g'), replacement)
    .split('{{' + key + '}}').join(replacement)
    .split('&' + key + '&').join(values.join(joiner));
}

function buildCodeGraph() {
  const lines = [];
  const visited = new Set();

  if (def.prelude) lines.push(def.prelude);

  blocks.forEach(b => {
    const bd = def.blocks[b.defKey];
    if (bd && bd.topLevel) {
      lines.push(resolveAction(bd, b.ivals, b));
      visited.add(b.id);
    }
  });

  if (lines.length && lines[lines.length - 1] !== '') lines.push('');

  function walk(bid, depth) {
    if (visited.has(bid)) return;
    visited.add(bid);
    const bobj = blocks.find(b => b.id == bid);
    if (!bobj) return;
    const bd = def.blocks[bobj.defKey];
    if (!bd) return;
    const pad = '  '.repeat(depth);
    
    const code = resolveAction(bd, bobj.ivals, bobj);

    if (bd.block_type === 'start' && bd.close !== undefined) {
      lines.push(pad + code);
      const next = conns.find(c => c.from==bid && c.fc==='out');
      if (next) walk(next.to, depth + 1);
      pushClose(lines, pad, bd);
    } else if (bd.block_type === 'loop') {
      lines.push(pad + code);
      const next = conns.find(c => c.from==bid && c.fc==='out');
      if (next) walk(next.to, depth + 1);
      pushClose(lines, pad, bd);
    } else if (bd.block_type === 'condition') {
      lines.push(pad + code);
      const trueConn  = conns.find(c => c.from==bid && c.fc==='true');
      const falseConn = conns.find(c => c.from==bid && c.fc==='false');
      if (trueConn) walk(trueConn.to, depth + 1);
      if (falseConn) {
        const elseLine = getElseLine(bd);
        if (elseLine) lines.push(pad + elseLine);
        walk(falseConn.to, depth + 1);
      }
      pushClose(lines, pad, bd);
    } else if (bd.block_type === 'function' || bd.block_type === 'class') {
      lines.push(pad + code);
      const next = conns.find(c => c.from==bid && c.fc==='out');
      if (next) walk(next.to, depth + 1);
      pushClose(lines, pad, bd);
    } else if (bd.block_type === 'event') {
      lines.push(pad + code);
      const next = conns.find(c => c.from==bid && c.fc==='out');
      if (next) walk(next.to, depth + 1);
      pushClose(lines, pad, bd);
    } else {
      lines.push(pad + code);
      const next = conns.find(c => c.from==bid && c.fc==='out');
      if (next) walk(next.to, depth);
    }
  }

  blocks.forEach(b => {
    const bd = def.blocks[b.defKey];
    if (bd && (bd.block_type === 'function' || bd.block_type === 'class')) walk(b.id, 0);
  });

  if (lines.length && lines[lines.length - 1] !== '') lines.push('');

  blocks.forEach(b => {
    const bd = def.blocks[b.defKey];
    if (bd && (bd.block_type === 'start' || bd.block_type === 'event')) walk(b.id, 0);
  });

  return lines.join('\n');
}

function pushClose(lines, pad, bd) {
  const close = getCloseLine(bd);
  if (close) lines.push(pad + close);
}

function getCloseLine(bd) {
  if (bd.close !== undefined) return bd.close;
  const lang = (def.lang || 'js').toLowerCase();
  if (lang === 'py' || lang === 'python') return '';
  if (bd.block_type === 'event' && lang === 'js') return '}});';
  return '}';
}

function getElseLine(bd) {
  if (bd.elseAction !== undefined) return bd.elseAction;
  const lang = (def.lang || 'js').toLowerCase();
  if (lang === 'py' || lang === 'python') return 'else:';
  return '} else {';
}

function runBlocks() {
  if (!def) { openOutput('console'); writeOut('<span class="out-line-err">⚠ Cargá una definición primero.</span>'); return; }
  const code = buildCodeGraph();
  openOutput('console');
  writeOut(`<span class="out-line-ok">▶ Ejecutando (${def.lang || '?'})...</span>\n`);
  if (!code.trim()) { writeOut('<span class="out-line-err">No hay bloques conectados a un inicio.</span>'); return; }
  if ((def.lang || 'js').toLowerCase() === 'js') {
    const log = [];
    const fakeConsole = { log: (...a) => log.push(a.map(String).join(' ')), error: (...a) => log.push('ERR: '+a.join(' ')) };
    try {
      const fn = new Function('console', code);
      fn(fakeConsole);
      log.forEach(l => writeOut(`<span class="out-line-ok">» ${escHtml(l)}</span>`));
      if (!log.length) writeOut('<span style="color:var(--text3)">Sin salida.</span>');
    } catch(err) {
      writeOut(`<span class="out-line-err">Error: ${escHtml(err.message)}</span>`);
    }
  } else {
    writeOut(`<span class="out-line-code">${escHtml(code)}</span>\n<span style="color:var(--text3)">Ejecución directa solo disponible para JS. Para ${def.lang}, exportá el código.</span>`);
  }
}

function exportCode() {
  if (!def) return;
  const code = buildCodeGraph();
  openOutput('code');
  writeOut(`<span class="out-line-code">${escHtml(code)}</span>`);
  const ext = { js:'js', py:'py', cpp:'cpp', php:'php', custom:'txt' }[def.lang] || 'txt';
  const a = document.createElement('a');
  a.href = 'data:text/plain,' + encodeURIComponent(code);
  a.download = `${(def.project||'programa').replace(/\s+/g,'_')}.${ext}`;
  a.click();
}

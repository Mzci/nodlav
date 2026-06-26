// ═══════════════════════════════════════════════════════
//  BLOCK TYPE SYSTEM
// ═══════════════════════════════════════════════════════
const BLOCK_TYPE_META = {
  "start":     { tag:"INICIO",     conns:[{id:"out",  pos:"bot", dir:"out"}],                                         notchTop:false, notchBot:true  },
  "a-b":       { tag:"PROCESO",    conns:[{id:"in",   pos:"top", dir:"in"}, {id:"out", pos:"bot", dir:"out"}],        notchTop:true,  notchBot:true  },
  "condition": { tag:"IF/ELSE",    conns:[{id:"in",   pos:"top", dir:"in"}, {id:"true",pos:"bot-l",dir:"out"},{id:"false",pos:"bot-r",dir:"out"}], notchTop:true, notchBot:false },
  "loop":      { tag:"LOOP",       conns:[{id:"in",   pos:"top", dir:"in"}, {id:"out", pos:"bot", dir:"out"}],        notchTop:true,  notchBot:true  },
  "event":     { tag:"EVENTO",     conns:[{id:"out",  pos:"bot", dir:"out"}],                                         notchTop:false, notchBot:true  },
  "function":  { tag:"FUNCION",    conns:[{id:"out",  pos:"bot", dir:"out"}],                                         notchTop:false, notchBot:true  },
  "class":     { tag:"CLASE",      conns:[{id:"out",  pos:"bot", dir:"out"}],                                         notchTop:false, notchBot:true  },
  "import":    { tag:"IMPORT",     conns:[],                                                                           notchTop:false, notchBot:false },
  "end":       { tag:"FIN/RET",    conns:[{id:"in",   pos:"top", dir:"in"}],                                          notchTop:true,  notchBot:false },
  "comment":   { tag:"COMENTARIO", conns:[],                                                                           notchTop:false, notchBot:false },
  "code":      { tag:"CÓDIGO",     conns:[{id:"in",   pos:"top", dir:"in"}, {id:"out", pos:"bot", dir:"out"}],        notchTop:true,  notchBot:true  },
  "expr":      { tag:"EXPRESIÓN",  conns:[],                                                                           notchTop:false, notchBot:false, isExpr:true }
};

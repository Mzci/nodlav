// ═══════════════════════════════════════════════════════
//  LANGUAGE TEMPLATES
// ═══════════════════════════════════════════════════════
const PYTHON_JSON = {
  project: "nodlav",
  lang: "py",
  blocks: {
    "start": {
      color: "#e85d04",
      text: "Al iniciar",
      block_type: "start",
      action: "# punto de entrada"
    },
    "log": {
      color: "#5845d6",
      text: "Mostrar [text:mensaje]",
      block_type: "a-b",
      action: "print({{mensaje}})"
    },
    "set_var": {
      color: "#5845d6",
      text: "Variable [text:nombre] = [text:valor]",
      block_type: "a-b",
      action: "{{nombre}} = {{valor}}"
    },
    "input": {
      color: "#ff8c42",
      text: "Input [text:variable] = [text:mensaje]",
      block_type: "a-b",
      action: "{{variable}} = input({{mensaje}})"
    },
    "increment": {
      color: "#ff8c42",
      text: "Incrementar [text:variable]",
      block_type: "a-b",
      action: "{{variable}} += 1"
    },
    "decrement": {
      color: "#ff8c42",
      text: "Decrementar [text:variable]",
      block_type: "a-b",
      action: "{{variable}} -= 1"
    },
    "add": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] + [text:b]",
      block_type: "a-b",
      action: "{{resultado}} = {{a}} + {{b}}"
    },
    "subtract": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] - [text:b]",
      block_type: "a-b",
      action: "{{resultado}} = {{a}} - {{b}}"
    },
    "multiply": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] * [text:b]",
      block_type: "a-b",
      action: "{{resultado}} = {{a}} * {{b}}"
    },
    "divide": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] / [text:b]",
      block_type: "a-b",
      action: "{{resultado}} = {{a}} / {{b}}"
    },
    "concat": {
      color: "#991b1b",
      text: "[text:resultado] = [text:a] + [text:b]",
      block_type: "a-b",
      action: "{{resultado}} = {{a}} + {{b}}"
    },
    "compare_eq": {
      color: "#3a7de8",
      text: "[text:a] == [text:b]",
      block_type: "condition",
      action: "if {{a}} == {{b}}:"
    },
    "compare_ne": {
      color: "#3a7de8",
      text: "[text:a] != [text:b]",
      block_type: "condition",
      action: "if {{a}} != {{b}}:"
    },
    "compare_gt": {
      color: "#3a7de8",
      text: "[text:a] > [text:b]",
      block_type: "condition",
      action: "if {{a}} > {{b}}:"
    },
    "compare_lt": {
      color: "#3a7de8",
      text: "[text:a] < [text:b]",
      block_type: "condition",
      action: "if {{a}} < {{b}}:"
    },
    "array_push": {
      color: "#a78bfa",
      text: "[text:array].append([text:valor])",
      block_type: "a-b",
      action: "{{array}}.append({{valor}})"
    },
    "array_length": {
      color: "#a78bfa",
      text: "[text:resultado] = len([text:array])",
      block_type: "a-b",
      action: "{{resultado}} = len({{array}})"
    },
    "string_length": {
      color: "#a78bfa",
      text: "[text:resultado] = len([text:texto])",
      block_type: "a-b",
      action: "{{resultado}} = len({{texto}})"
    },
    "custom_code": {
      color: "#374151",
      text: "Código [code:codigo]",
      block_type: "code",
      action: "&codigo&"
    },
    "if": {
      color: "#3a7de8",
      text: "Si [expr:condicion]",
      block_type: "condition",
      action: "if {{condicion}}:"
    },
    "loop": {
      color: "#00917a",
      text: "Repetir [text:veces] veces",
      block_type: "loop",
      action: "for _i in range({{veces}}):"
    },
    "while": {
      color: "#00917a",
      text: "Mientras [expr:condicion]",
      block_type: "loop",
      action: "while {{condicion}}:"
    },
    "break": {
      color: "#ff5577",
      text: "Romper ciclo",
      block_type: "a-b",
      action: "break"
    },
    "return": {
      color: "#991b1b",
      text: "Retornar [text:valor]",
      block_type: "end",
      action: "return {{valor}}"
    },
    "comment": {
      color: "#6b7280",
      text: "[text:nota]",
      block_type: "comment",
      action: "# {{nota}}"
    },
    "expr_eq": {
      color: "#3a7de8",
      text: "[expr:a] == [expr:b]",
      block_type: "expr",
      action: "{{a}} == {{b}}"
    },
    "expr_ne": {
      color: "#3a7de8",
      text: "[expr:a] != [expr:b]",
      block_type: "expr",
      action: "{{a}} != {{b}}"
    },
    "expr_gt": {
      color: "#3a7de8",
      text: "[expr:a] > [expr:b]",
      block_type: "expr",
      action: "{{a}} > {{b}}"
    },
    "expr_lt": {
      color: "#3a7de8",
      text: "[expr:a] < [expr:b]",
      block_type: "expr",
      action: "{{a}} < {{b}}"
    },
    "expr_add": {
      color: "#b45309",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_sub": {
      color: "#b45309",
      text: "[expr:a] - [expr:b]",
      block_type: "expr",
      action: "{{a}} - {{b}}"
    },
    "expr_mul": {
      color: "#b45309",
      text: "[expr:a] * [expr:b]",
      block_type: "expr",
      action: "{{a}} * {{b}}"
    },
    "expr_div": {
      color: "#b45309",
      text: "[expr:a] / [expr:b]",
      block_type: "expr",
      action: "{{a}} / {{b}}"
    },
    "expr_concat": {
      color: "#991b1b",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_number": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_string": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_var": {
      color: "#a78bfa",
      text: "[text:name]",
      block_type: "expr",
      action: "{{name}}"
    }
  }
};

const CPP_JSON = {
  project: "nodlav",
  lang: "cpp",
  blocks: {
    "start": {
      color: "#e85d04",
      text: "Al iniciar",
      block_type: "start",
      action: "// punto de entrada\nint main() {",
      close: "}"
    },
    "log": {
      color: "#5845d6",
      text: "Mostrar [text:mensaje]",
      block_type: "a-b",
      action: "std::cout << {{mensaje}} << std::endl;"
    },
    "set_var": {
      color: "#5845d6",
      text: "Variable [text:nombre] = [text:valor]",
      block_type: "a-b",
      action: "auto {{nombre}} = {{valor}};"
    },
    "increment": {
      color: "#ff8c42",
      text: "Incrementar [text:variable]",
      block_type: "a-b",
      action: "{{variable}}++;"
    },
    "decrement": {
      color: "#ff8c42",
      text: "Decrementar [text:variable]",
      block_type: "a-b",
      action: "{{variable}}--;"
    },
    "add": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] + [text:b]",
      block_type: "a-b",
      action: "auto {{resultado}} = {{a}} + {{b}};"
    },
    "subtract": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] - [text:b]",
      block_type: "a-b",
      action: "auto {{resultado}} = {{a}} - {{b}};"
    },
    "multiply": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] * [text:b]",
      block_type: "a-b",
      action: "auto {{resultado}} = {{a}} * {{b}};"
    },
    "divide": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] / [text:b]",
      block_type: "a-b",
      action: "auto {{resultado}} = {{a}} / {{b}};"
    },
    "compare_eq": {
      color: "#3a7de8",
      text: "[text:a] == [text:b]",
      block_type: "condition",
      action: "if ({{a}} == {{b}}) {"
    },
    "compare_ne": {
      color: "#3a7de8",
      text: "[text:a] != [text:b]",
      block_type: "condition",
      action: "if ({{a}} != {{b}}) {"
    },
    "compare_gt": {
      color: "#3a7de8",
      text: "[text:a] > [text:b]",
      block_type: "condition",
      action: "if ({{a}} > {{b}}) {"
    },
    "compare_lt": {
      color: "#3a7de8",
      text: "[text:a] < [text:b]",
      block_type: "condition",
      action: "if ({{a}} < {{b}}) {"
    },
    "custom_code": {
      color: "#374151",
      text: "Código [code:codigo]",
      block_type: "code",
      action: "&codigo&"
    },
    "if": {
      color: "#3a7de8",
      text: "Si [expr:condicion]",
      block_type: "condition",
      action: "if ({{condicion}}) {"
    },
    "loop": {
      color: "#00917a",
      text: "Repetir [text:veces] veces",
      block_type: "loop",
      action: "for (int _i = 0; _i < {{veces}}; _i++) {"
    },
    "while": {
      color: "#00917a",
      text: "Mientras [expr:condicion]",
      block_type: "loop",
      action: "while ({{condicion}}) {"
    },
    "break": {
      color: "#ff5577",
      text: "Romper ciclo",
      block_type: "a-b",
      action: "break;"
    },
    "return": {
      color: "#991b1b",
      text: "Retornar [text:valor]",
      block_type: "end",
      action: "return {{valor}};"
    },
    "comment": {
      color: "#6b7280",
      text: "[text:nota]",
      block_type: "comment",
      action: "// {{nota}}"
    },
    "expr_eq": {
      color: "#3a7de8",
      text: "[expr:a] == [expr:b]",
      block_type: "expr",
      action: "{{a}} == {{b}}"
    },
    "expr_ne": {
      color: "#3a7de8",
      text: "[expr:a] != [expr:b]",
      block_type: "expr",
      action: "{{a}} != {{b}}"
    },
    "expr_gt": {
      color: "#3a7de8",
      text: "[expr:a] > [expr:b]",
      block_type: "expr",
      action: "{{a}} > {{b}}"
    },
    "expr_lt": {
      color: "#3a7de8",
      text: "[expr:a] < [expr:b]",
      block_type: "expr",
      action: "{{a}} < {{b}}"
    },
    "expr_add": {
      color: "#b45309",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_sub": {
      color: "#b45309",
      text: "[expr:a] - [expr:b]",
      block_type: "expr",
      action: "{{a}} - {{b}}"
    },
    "expr_mul": {
      color: "#b45309",
      text: "[expr:a] * [expr:b]",
      block_type: "expr",
      action: "{{a}} * {{b}}"
    },
    "expr_div": {
      color: "#b45309",
      text: "[expr:a] / [expr:b]",
      block_type: "expr",
      action: "{{a}} / {{b}}"
    },
    "expr_concat": {
      color: "#991b1b",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_number": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_string": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_var": {
      color: "#a78bfa",
      text: "[text:name]",
      block_type: "expr",
      action: "{{name}}"
    }
  }
};

const PHP_JSON = {
  project: "nodlav",
  lang: "php",
  prelude: "<?php",
  blocks: {
    "start": {
      color: "#e85d04",
      text: "Al iniciar",
      block_type: "start",
      action: "// punto de entrada"
    },
    "log": {
      color: "#5845d6",
      text: "Mostrar [text:mensaje]",
      block_type: "a-b",
      action: "echo {{mensaje}};"
    },
    "set_var": {
      color: "#5845d6",
      text: "Variable [text:nombre] = [text:valor]",
      block_type: "a-b",
      action: "${{nombre}} = {{valor}};"
    },
    "input": {
      color: "#ff8c42",
      text: "Input [text:variable] = [text:mensaje]",
      block_type: "a-b",
      action: "${{variable}} = readline({{mensaje}});"
    },
    "increment": {
      color: "#ff8c42",
      text: "Incrementar [text:variable]",
      block_type: "a-b",
      action: "${{variable}}++;"
    },
    "decrement": {
      color: "#ff8c42",
      text: "Decrementar [text:variable]",
      block_type: "a-b",
      action: "${{variable}}--;"
    },
    "add": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] + [text:b]",
      block_type: "a-b",
      action: "${{resultado}} = {{a}} + {{b}};"
    },
    "subtract": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] - [text:b]",
      block_type: "a-b",
      action: "${{resultado}} = {{a}} - {{b}};"
    },
    "multiply": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] * [text:b]",
      block_type: "a-b",
      action: "${{resultado}} = {{a}} * {{b}};"
    },
    "divide": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] / [text:b]",
      block_type: "a-b",
      action: "${{resultado}} = {{a}} / {{b}};"
    },
    "concat": {
      color: "#991b1b",
      text: "[text:resultado] = [text:a] . [text:b]",
      block_type: "a-b",
      action: "${{resultado}} = {{a}} . {{b}};"
    },
    "compare_eq": {
      color: "#3a7de8",
      text: "[text:a] == [text:b]",
      block_type: "condition",
      action: "if ({{a}} == {{b}}) {"
    },
    "compare_ne": {
      color: "#3a7de8",
      text: "[text:a] != [text:b]",
      block_type: "condition",
      action: "if ({{a}} != {{b}}) {"
    },
    "compare_gt": {
      color: "#3a7de8",
      text: "[text:a] > [text:b]",
      block_type: "condition",
      action: "if ({{a}} > {{b}}) {"
    },
    "compare_lt": {
      color: "#3a7de8",
      text: "[text:a] < [text:b]",
      block_type: "condition",
      action: "if ({{a}} < {{b}}) {"
    },
    "array_push": {
      color: "#a78bfa",
      text: "[text:array].push([text:valor])",
      block_type: "a-b",
      action: "array_push({{array}}, {{valor}});"
    },
    "array_length": {
      color: "#a78bfa",
      text: "[text:resultado] = count([text:array])",
      block_type: "a-b",
      action: "${{resultado}} = count({{array}});"
    },
    "string_length": {
      color: "#a78bfa",
      text: "[text:resultado] = strlen([text:texto])",
      block_type: "a-b",
      action: "${{resultado}} = strlen({{texto}});"
    },
    "custom_code": {
      color: "#374151",
      text: "Código [code:codigo]",
      block_type: "code",
      action: "&codigo&"
    },
    "if": {
      color: "#3a7de8",
      text: "Si [expr:condicion]",
      block_type: "condition",
      action: "if ({{condicion}}) {"
    },
    "loop": {
      color: "#00917a",
      text: "Repetir [text:veces] veces",
      block_type: "loop",
      action: "for ($i = 0; $i < {{veces}}; $i++) {"
    },
    "while": {
      color: "#00917a",
      text: "Mientras [expr:condicion]",
      block_type: "loop",
      action: "while ({{condicion}}) {"
    },
    "break": {
      color: "#ff5577",
      text: "Romper ciclo",
      block_type: "a-b",
      action: "break;"
    },
    "return": {
      color: "#991b1b",
      text: "Retornar [text:valor]",
      block_type: "end",
      action: "return {{valor}};"
    },
    "comment": {
      color: "#6b7280",
      text: "[text:nota]",
      block_type: "comment",
      action: "// {{nota}}"
    },
    "expr_eq": {
      color: "#3a7de8",
      text: "[expr:a] == [expr:b]",
      block_type: "expr",
      action: "{{a}} == {{b}}"
    },
    "expr_ne": {
      color: "#3a7de8",
      text: "[expr:a] != [expr:b]",
      block_type: "expr",
      action: "{{a}} != {{b}}"
    },
    "expr_gt": {
      color: "#3a7de8",
      text: "[expr:a] > [expr:b]",
      block_type: "expr",
      action: "{{a}} > {{b}}"
    },
    "expr_lt": {
      color: "#3a7de8",
      text: "[expr:a] < [expr:b]",
      block_type: "expr",
      action: "{{a}} < {{b}}"
    },
    "expr_add": {
      color: "#b45309",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_sub": {
      color: "#b45309",
      text: "[expr:a] - [expr:b]",
      block_type: "expr",
      action: "{{a}} - {{b}}"
    },
    "expr_mul": {
      color: "#b45309",
      text: "[expr:a] * [expr:b]",
      block_type: "expr",
      action: "{{a}} * {{b}}"
    },
    "expr_div": {
      color: "#b45309",
      text: "[expr:a] / [expr:b]",
      block_type: "expr",
      action: "{{a}} / {{b}}"
    },
    "expr_concat": {
      color: "#991b1b",
      text: "[expr:a] . [expr:b]",
      block_type: "expr",
      action: "{{a}} . {{b}}"
    },
    "expr_number": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_string": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_var": {
      color: "#a78bfa",
      text: "[text:name]",
      block_type: "expr",
      action: "${{name}}"
    }
  }
};

// ═══════════════════════════════════════════════════════
//  EXAMPLE JSON (JavaScript - default)
// ═══════════════════════════════════════════════════════
const EXAMPLE_JSON = {
  project: "nodlav",
  lang: "js",
  blocks: {
    "start": {
      color: "#e85d04",
      text: "Al iniciar",
      block_type: "start",
      action: "// punto de entrada"
    },
    "log": {
      color: "#5845d6",
      text: "Mostrar [text:mensaje]",
      block_type: "a-b",
      action: "console.log({{mensaje}})"
    },
    "set_var": {
      color: "#5845d6",
      text: "Variable [text:nombre] = [text:valor]",
      block_type: "a-b",
      action: "let {{nombre}} = {{valor}};"
    },
    "input": {
      color: "#ff8c42",
      text: "Input [text:variable] = [text:mensaje]",
      block_type: "a-b",
      action: "let {{variable}} = prompt({{mensaje}});"
    },
    "increment": {
      color: "#ff8c42",
      text: "Incrementar [text:variable]",
      block_type: "a-b",
      action: "{{variable}}++;"
    },
    "decrement": {
      color: "#ff8c42",
      text: "Decrementar [text:variable]",
      block_type: "a-b",
      action: "{{variable}}--;"
    },
    "add": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] + [text:b]",
      block_type: "a-b",
      action: "let {{resultado}} = {{a}} + {{b}};"
    },
    "subtract": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] - [text:b]",
      block_type: "a-b",
      action: "let {{resultado}} = {{a}} - {{b}};"
    },
    "multiply": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] * [text:b]",
      block_type: "a-b",
      action: "let {{resultado}} = {{a}} * {{b}};"
    },
    "divide": {
      color: "#b45309",
      text: "[text:resultado] = [text:a] / [text:b]",
      block_type: "a-b",
      action: "let {{resultado}} = {{a}} / {{b}};"
    },
    "concat": {
      color: "#991b1b",
      text: "[text:resultado] = [text:a] + [text:b]",
      block_type: "a-b",
      action: "let {{resultado}} = {{a}} + {{b}};"
    },
    "compare_eq": {
      color: "#3a7de8",
      text: "[text:a] == [text:b]",
      block_type: "condition",
      action: "if ({{a}} == {{b}}) {"
    },
    "compare_ne": {
      color: "#3a7de8",
      text: "[text:a] != [text:b]",
      block_type: "condition",
      action: "if ({{a}} != {{b}}) {"
    },
    "compare_gt": {
      color: "#3a7de8",
      text: "[text:a] > [text:b]",
      block_type: "condition",
      action: "if ({{a}} > {{b}}) {"
    },
    "compare_lt": {
      color: "#3a7de8",
      text: "[text:a] < [text:b]",
      block_type: "condition",
      action: "if ({{a}} < {{b}}) {"
    },
    "array_push": {
      color: "#a78bfa",
      text: "[text:array].push([text:valor])",
      block_type: "a-b",
      action: "{{array}}.push({{valor}});"
    },
    "array_length": {
      color: "#a78bfa",
      text: "[text:resultado] = [text:array].length",
      block_type: "a-b",
      action: "let {{resultado}} = {{array}}.length;"
    },
    "string_length": {
      color: "#a78bfa",
      text: "[text:resultado] = [text:texto].length",
      block_type: "a-b",
      action: "let {{resultado}} = {{texto}}.length;"
    },
    "custom_code": {
      color: "#374151",
      text: "Código [code:codigo]",
      block_type: "code",
      action: "&codigo&"
    },
    "if": {
      color: "#3a7de8",
      text: "Si [expr:condicion]",
      block_type: "condition",
      action: "if ({{condicion}}) {"
    },
    "loop": {
      color: "#00917a",
      text: "Repetir [text:veces] veces",
      block_type: "loop",
      action: "for (let _i = 0; _i < {{veces}}; _i++) {"
    },
    "while": {
      color: "#00917a",
      text: "Mientras [expr:condicion]",
      block_type: "loop",
      action: "while ({{condicion}}) {"
    },
    "break": {
      color: "#ff5577",
      text: "Romper ciclo",
      block_type: "a-b",
      action: "break;"
    },
    "event": {
      color: "#b45309",
      text: "Al presionar [text:tecla]",
      block_type: "event",
      action: "document.addEventListener('keydown', e => { if(e.key==='&tecla&') {"
    },
    "return": {
      color: "#991b1b",
      text: "Retornar [text:valor]",
      block_type: "end",
      action: "return &valor&;"
    },
    "comment": {
      color: "#374151",
      text: "# [text:nota]",
      block_type: "comment",
      action: "// &nota&"
    },
    "expr_eq": {
      color: "#3a7de8",
      text: "[expr:a] == [expr:b]",
      block_type: "expr",
      action: "{{a}} == {{b}}"
    },
    "expr_ne": {
      color: "#3a7de8",
      text: "[expr:a] != [expr:b]",
      block_type: "expr",
      action: "{{a}} != {{b}}"
    },
    "expr_gt": {
      color: "#3a7de8",
      text: "[expr:a] > [expr:b]",
      block_type: "expr",
      action: "{{a}} > {{b}}"
    },
    "expr_lt": {
      color: "#3a7de8",
      text: "[expr:a] < [expr:b]",
      block_type: "expr",
      action: "{{a}} < {{b}}"
    },
    "expr_add": {
      color: "#b45309",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_sub": {
      color: "#b45309",
      text: "[expr:a] - [expr:b]",
      block_type: "expr",
      action: "{{a}} - {{b}}"
    },
    "expr_mul": {
      color: "#b45309",
      text: "[expr:a] * [expr:b]",
      block_type: "expr",
      action: "{{a}} * {{b}}"
    },
    "expr_div": {
      color: "#b45309",
      text: "[expr:a] / [expr:b]",
      block_type: "expr",
      action: "{{a}} / {{b}}"
    },
    "expr_concat": {
      color: "#991b1b",
      text: "[expr:a] + [expr:b]",
      block_type: "expr",
      action: "{{a}} + {{b}}"
    },
    "expr_number": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_string": {
      color: "#6b7280",
      text: "[text:value]",
      block_type: "expr",
      action: "{{value}}"
    },
    "expr_var": {
      color: "#a78bfa",
      text: "[text:name]",
      block_type: "expr",
      action: "{{name}}"
    }
  }
};

const TEMPLATE_PALETTE = {
  flow: "#F59E0B",
  function: "#14B8A6",
  io: "#3B82F6",
  data: "#8B5CF6",
  math: "#22C55E",
  logic: "#06B6D4",
  text: "#EC4899",
  api: "#0EA5E9",
  file: "#84CC16",
  library: "#A855F7",
  robot: "#F97316",
  class: "#D946EF",
  time: "#EAB308",
  web: "#38BDF8",
  device: "#10B981",
  code: "#64748B",
  stop: "#EF4444"
};

const TEMPLATE_CATEGORIES = {
  flow: TEMPLATE_PALETTE.flow,
  function: TEMPLATE_PALETTE.function,
  io: TEMPLATE_PALETTE.io,
  data: TEMPLATE_PALETTE.data,
  math: TEMPLATE_PALETTE.math,
  logic: TEMPLATE_PALETTE.logic,
  text: TEMPLATE_PALETTE.text,
  api: TEMPLATE_PALETTE.api,
  file: TEMPLATE_PALETTE.file,
  library: TEMPLATE_PALETTE.library,
  robot: TEMPLATE_PALETTE.robot,
  class: TEMPLATE_PALETTE.class,
  time: TEMPLATE_PALETTE.time,
  web: TEMPLATE_PALETTE.web,
  device: TEMPLATE_PALETTE.device,
  code: TEMPLATE_PALETTE.code,
  stop: TEMPLATE_PALETTE.stop
};

function styleCodeTemplate(template) {
  template.categories = TEMPLATE_CATEGORIES;
  Object.entries(template.blocks).forEach(([key, block]) => {
    const group = getTemplateGroup(key, block);
    block.category = group;
    block.color = TEMPLATE_PALETTE[group] || block.color;
  });
  return template;
}

function getTemplateGroup(key, block) {
  if (block.block_type === 'function' || key.includes('function') || key.includes('func')) return 'function';
  if (block.block_type === 'class' || key.includes('class') || key.includes('_method') || key.includes('_object')) return 'class';
  if (block.block_type === 'import' || key.includes('import') || key.includes('include') || key.includes('using_')) return 'library';
  if (key.includes('time') || key.includes('date') || key.includes('sleep') || key.includes('timeout') || key.includes('interval') || key.includes('millis') || key.includes('chrono')) return 'time';
  if (key.includes('dom') || key.includes('html') || key.includes('css') || key.includes('query') || key.includes('element')) return 'web';
  if (key.includes('device') || key.includes('geo') || key.includes('camera') || key.includes('battery') || key.includes('clipboard') || key.includes('notification') || key.includes('vibrate')) return 'device';
  if (key.includes('fetch') || key.includes('api') || key.includes('json') || key.includes('http') || key.includes('url')) return 'api';
  if (key.includes('file') || key.includes('csv') || key.includes('read_') || key.includes('write_')) return 'file';
  if (key.includes('pin') || key.includes('digital') || key.includes('analog') || key.includes('servo') || key.includes('motor') || key.includes('delay') || key.includes('serial')) return 'robot';
  if (['start', 'event'].includes(block.block_type) || ['loop', 'while', 'if'].includes(key)) return 'flow';
  if (['log', 'input'].includes(key)) return 'io';
  if (key.includes('var') || key.includes('array') || ['increment', 'decrement'].includes(key)) return 'data';
  if (key.includes('add') || key.includes('sub') || key.includes('mul') || key.includes('div') || key === 'expr_number') return 'math';
  if (key.includes('compare') || key.includes('expr_eq') || key.includes('expr_ne') || key.includes('expr_gt') || key.includes('expr_lt')) return 'logic';
  if (key.includes('concat') || key.includes('string') || key === 'expr_string') return 'text';
  if (['custom_code', 'comment'].includes(key)) return 'code';
  if (['break', 'return'].includes(key) || block.block_type === 'end') return 'stop';
  return 'code';
}

function addFunctionBlocks(template) {
  const lang = (template.lang || 'js').toLowerCase();
  let defAction = "function {{nombre}}({{args}}) {";
  let callAction = "{{nombre}}({{args}});";
  let close = "}";

  if (lang === 'py') {
    defAction = "def {{nombre}}({{args}}):";
    callAction = "{{nombre}}({{args}})";
    close = "";
  } else if (lang === 'cpp') {
    defAction = "auto {{nombre}}({{args}}) {";
    callAction = "{{nombre}}({{args}});";
  } else if (lang === 'php') {
    defAction = "function {{nombre}}({{args}}) {";
    callAction = "{{nombre}}({{args}});";
  }

  template.blocks.define_function = {
    color: TEMPLATE_PALETTE.function,
    category: "function",
    text: "Definir funcion [text:nombre] [args:args]",
    block_type: "function",
    action: defAction,
    close,
    dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "arg" } }
  };
  template.blocks.call_function = {
    color: TEMPLATE_PALETTE.function,
    category: "function",
    text: "Llamar funcion [text:nombre] [args:args]",
    block_type: "a-b",
    action: callAction,
    dynamicArgs: { args: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } }
  };

  let assignAction = "{{resultado}} = {{nombre}}({{args}})";
  if (lang === 'js') assignAction = "let {{resultado}} = {{nombre}}({{args}});";
  if (lang === 'cpp') assignAction = "auto {{resultado}} = {{nombre}}({{args}});";
  if (lang === 'php') assignAction = "${{resultado}} = {{nombre}}({{args}});";

  template.blocks.call_function_result = {
    color: TEMPLATE_PALETTE.function,
    category: "function",
    text: "[text:resultado] = llamar [text:nombre] [args:args]",
    block_type: "a-b",
    action: assignAction,
    dynamicArgs: { args: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } }
  };
}

[PYTHON_JSON, CPP_JSON, PHP_JSON, EXAMPLE_JSON].forEach(addFunctionBlocks);
[PYTHON_JSON, CPP_JSON, EXAMPLE_JSON].forEach(addLanguagePowerBlocks);
[PYTHON_JSON, CPP_JSON, PHP_JSON, EXAMPLE_JSON].forEach(addVariadicConcatBlocks);
[PYTHON_JSON, CPP_JSON, PHP_JSON, EXAMPLE_JSON].forEach(normalizeReturnBlocks);
[PYTHON_JSON, CPP_JSON, PHP_JSON, EXAMPLE_JSON].forEach(styleCodeTemplate);

function addLanguagePowerBlocks(template) {
  const lang = (template.lang || 'js').toLowerCase();
  if (lang === 'py') addPythonPowerBlocks(template);
  if (lang === 'js') addJavaScriptPowerBlocks(template);
  if (lang === 'cpp') addCppPowerBlocks(template);
}

function addBlocks(template, extraBlocks) {
  Object.entries(extraBlocks).forEach(([key, block]) => {
    template.blocks[key] = block;
  });
}

function topImport(text, action) {
  return {
    color: TEMPLATE_PALETTE.library,
    category: "library",
    text,
    block_type: "import",
    action,
    topLevel: true
  };
}

function addPythonPowerBlocks(template) {
  addBlocks(template, {
    import_module: topImport("import [text:modulo]", "import {{modulo}}"),
    import_module_as: topImport("import [text:modulo] as [text:alias]", "import {{modulo}} as {{alias}}"),
    from_import: topImport("from [text:modulo] import [text:nombres]", "from {{modulo}} import {{nombres}}"),
    import_common_data: topImport("libs datos comunes", "import json\nimport csv\nfrom pathlib import Path\nfrom datetime import datetime"),
    import_time: topImport("lib time", "import time"),
    import_asyncio: topImport("lib asyncio", "import asyncio"),
    import_requests: topImport("lib requests", "import requests"),
    import_numpy_pandas: topImport("libs numpy pandas", "import numpy as np\nimport pandas as pd"),
    import_flask: topImport("lib Flask API", "from flask import Flask, request, jsonify\napp = Flask(__name__)"),

    py_try: { color: TEMPLATE_PALETTE.logic, category: "logic", text: "Intentar", block_type: "condition", action: "try:", elseAction: "except Exception as error:" },
    py_raise: { color: TEMPLATE_PALETTE.stop, category: "stop", text: "Lanzar error [expr:error]", block_type: "a-b", action: "raise Exception({{error}})" },
    py_sleep: { color: TEMPLATE_PALETTE.time, category: "time", text: "Esperar [expr:segundos] segundos", block_type: "a-b", action: "time.sleep({{segundos}})" },
    py_async_sleep: { color: TEMPLATE_PALETTE.time, category: "time", text: "await sleep [expr:segundos] segundos", block_type: "a-b", action: "await asyncio.sleep({{segundos}})" },
    py_now: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = fecha actual", block_type: "a-b", action: "{{resultado}} = datetime.now()" },
    py_timestamp: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = timestamp", block_type: "a-b", action: "{{resultado}} = time.time()" },
    py_perf_counter: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = contador preciso", block_type: "a-b", action: "{{resultado}} = time.perf_counter()" },
    py_format_date: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = formatear fecha [expr:fecha] con [text:formato]", block_type: "a-b", action: "{{resultado}} = {{fecha}}.strftime('&formato&')" },

    py_class: { color: TEMPLATE_PALETTE.class, category: "class", text: "Clase [text:nombre]", block_type: "class", action: "class {{nombre}}:", close: "" },
    py_class_extends: { color: TEMPLATE_PALETTE.class, category: "class", text: "Clase [text:nombre] hereda [text:base]", block_type: "class", action: "class {{nombre}}({{base}}):", close: "" },
    py_constructor: { color: TEMPLATE_PALETTE.class, category: "class", text: "Constructor self [args:args]", block_type: "function", action: "def __init__(self, {{args}}):", close: "", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "valor" } } },
    py_method: { color: TEMPLATE_PALETTE.class, category: "class", text: "Metodo [text:nombre] self [args:args]", block_type: "function", action: "def {{nombre}}(self, {{args}}):", close: "", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "valor" } } },
    py_set_attr: { color: TEMPLATE_PALETTE.class, category: "class", text: "self.[text:atributo] = [expr:valor]", block_type: "a-b", action: "self.{{atributo}} = {{valor}}" },
    py_get_attr: { color: TEMPLATE_PALETTE.class, category: "class", text: "[text:resultado] = [expr:objeto].[text:atributo]", block_type: "a-b", action: "{{resultado}} = {{objeto}}.{{atributo}}" },
    py_object_new: { color: TEMPLATE_PALETTE.class, category: "class", text: "[text:resultado] = nuevo [text:clase] [args:args]", block_type: "a-b", action: "{{resultado}} = {{clase}}({{args}})", dynamicArgs: { args: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } } },
    py_call_method: { color: TEMPLATE_PALETTE.class, category: "class", text: "[text:resultado] = [expr:objeto].[text:metodo] [args:args]", block_type: "a-b", action: "{{resultado}} = {{objeto}}.{{metodo}}({{args}})", dynamicArgs: { args: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } } },

    py_list_create: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:lista] = lista [args:items]", block_type: "a-b", action: "{{lista}} = [{{items}}]", dynamicArgs: { items: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } } },
    py_dict_create: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:dict] = dict [code:pares]", block_type: "a-b", action: "{{dict}} = {\n&pares&\n}" },
    py_for_each: { color: TEMPLATE_PALETTE.flow, category: "flow", text: "Por cada [text:item] en [expr:coleccion]", block_type: "loop", action: "for {{item}} in {{coleccion}}:" },
    py_range_loop: { color: TEMPLATE_PALETTE.flow, category: "flow", text: "Para [text:i] en rango [expr:inicio] a [expr:fin]", block_type: "loop", action: "for {{i}} in range({{inicio}}, {{fin}}):" },
    py_list_append: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:lista].append([expr:valor])", block_type: "a-b", action: "{{lista}}.append({{valor}})" },
    py_dict_set: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:dict][[expr:clave]] = [expr:valor]", block_type: "a-b", action: "{{dict}}[{{clave}}] = {{valor}}" },

    py_read_text: { color: TEMPLATE_PALETTE.file, category: "file", text: "[text:resultado] = leer archivo [expr:ruta]", block_type: "a-b", action: "{{resultado}} = Path({{ruta}}).read_text(encoding='utf-8')" },
    py_write_text: { color: TEMPLATE_PALETTE.file, category: "file", text: "Escribir [expr:ruta] contenido [expr:contenido]", block_type: "a-b", action: "Path({{ruta}}).write_text({{contenido}}, encoding='utf-8')" },
    py_load_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:resultado] = cargar JSON [expr:ruta]", block_type: "a-b", action: "{{resultado}} = json.loads(Path({{ruta}}).read_text(encoding='utf-8'))" },
    py_save_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "Guardar JSON [expr:ruta] datos [expr:datos]", block_type: "a-b", action: "Path({{ruta}}).write_text(json.dumps({{datos}}, indent=2, ensure_ascii=False), encoding='utf-8')" },

    py_get: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:respuesta] = GET [expr:url]", block_type: "a-b", action: "{{respuesta}} = requests.get({{url}})" },
    py_post_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:respuesta] = POST [expr:url] JSON [expr:datos]", block_type: "a-b", action: "{{respuesta}} = requests.post({{url}}, json={{datos}})" },
    py_response_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:resultado] = JSON de [text:respuesta]", block_type: "a-b", action: "{{resultado}} = {{respuesta}}.json()" },
    py_flask_route: { color: TEMPLATE_PALETTE.api, category: "api", text: "Ruta Flask [text:ruta] metodo [text:metodo] funcion [text:nombre]", block_type: "function", action: "@app.route('&ruta&', methods=['&metodo&'])\ndef {{nombre}}():", close: "" },
    py_flask_run: { color: TEMPLATE_PALETTE.api, category: "api", text: "Iniciar Flask puerto [expr:puerto]", block_type: "a-b", action: "app.run(host='0.0.0.0', port={{puerto}}, debug=True)" },

    expr_py_get: { color: TEMPLATE_PALETTE.data, category: "data", text: "[expr:objeto].get([expr:clave])", block_type: "expr", action: "{{objeto}}.get({{clave}})" },
    expr_py_index: { color: TEMPLATE_PALETTE.data, category: "data", text: "[expr:objeto][[expr:indice]]", block_type: "expr", action: "{{objeto}}[{{indice}}]" },
    expr_py_fstring: { color: TEMPLATE_PALETTE.text, category: "text", text: "f-string [text:texto]", block_type: "expr", action: "f'&texto&'" }
  });
}

function addJavaScriptPowerBlocks(template) {
  addBlocks(template, {
    js_import_named: topImport("import { [text:nombres] } from [text:modulo]", "import { {{nombres}} } from '&modulo&';"),
    js_import_default: topImport("import [text:nombre] from [text:modulo]", "import {{nombre}} from '&modulo&';"),
    js_require: topImport("require [text:nombre] = [text:modulo]", "const {{nombre}} = require('&modulo&');"),

    js_async_function: { color: TEMPLATE_PALETTE.function, category: "function", text: "async funcion [text:nombre] [args:args]", block_type: "function", action: "async function {{nombre}}({{args}}) {", close: "}", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "arg" } } },
    js_await: { color: TEMPLATE_PALETTE.flow, category: "flow", text: "[text:resultado] = await [expr:promesa]", block_type: "a-b", action: "const {{resultado}} = await {{promesa}};" },
    js_try: { color: TEMPLATE_PALETTE.logic, category: "logic", text: "Intentar", block_type: "condition", action: "try {", elseAction: "} catch (error) {" },

    js_class: { color: TEMPLATE_PALETTE.class, category: "class", text: "Clase [text:nombre]", block_type: "class", action: "class {{nombre}} {", close: "}" },
    js_class_extends: { color: TEMPLATE_PALETTE.class, category: "class", text: "Clase [text:nombre] extends [text:base]", block_type: "class", action: "class {{nombre}} extends {{base}} {", close: "}" },
    js_constructor: { color: TEMPLATE_PALETTE.class, category: "class", text: "constructor [args:args]", block_type: "function", action: "constructor({{args}}) {", close: "}", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "valor" } } },
    js_method: { color: TEMPLATE_PALETTE.class, category: "class", text: "metodo [text:nombre] [args:args]", block_type: "function", action: "{{nombre}}({{args}}) {", close: "}", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "valor" } } },
    js_set_this: { color: TEMPLATE_PALETTE.class, category: "class", text: "this.[text:prop] = [expr:valor]", block_type: "a-b", action: "this.{{prop}} = {{valor}};" },
    js_object_new: { color: TEMPLATE_PALETTE.class, category: "class", text: "[text:resultado] = new [text:clase] [args:args]", block_type: "a-b", action: "const {{resultado}} = new {{clase}}({{args}});", dynamicArgs: { args: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } } },

    js_date_now: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = Date.now()", block_type: "a-b", action: "const {{resultado}} = Date.now();" },
    js_new_date: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = new Date()", block_type: "a-b", action: "const {{resultado}} = new Date();" },
    js_timeout: { color: TEMPLATE_PALETTE.time, category: "time", text: "setTimeout [expr:ms] ms", block_type: "function", action: "setTimeout(() => {", close: "}, {{ms}});" },
    js_interval: { color: TEMPLATE_PALETTE.time, category: "time", text: "setInterval [expr:ms] ms", block_type: "function", action: "setInterval(() => {", close: "}, {{ms}});" },
    js_clear_timer: { color: TEMPLATE_PALETTE.time, category: "time", text: "clear timer [expr:id]", block_type: "a-b", action: "clearTimeout({{id}});" },

    js_fetch_get: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:respuesta] = fetch GET [expr:url]", block_type: "a-b", action: "const {{respuesta}} = await fetch({{url}});" },
    js_fetch_post_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:respuesta] = POST [expr:url] JSON [expr:datos]", block_type: "a-b", action: "const {{respuesta}} = await fetch({{url}}, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({{datos}}) });" },
    js_response_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:resultado] = await [text:respuesta].json()", block_type: "a-b", action: "const {{resultado}} = await {{respuesta}}.json();" },
    js_url_params: { color: TEMPLATE_PALETTE.api, category: "api", text: "[text:url] agregar param [expr:clave] = [expr:valor]", block_type: "a-b", action: "{{url}}.searchParams.set({{clave}}, {{valor}});" },

    js_array_create: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:array] = array [args:items]", block_type: "a-b", action: "const {{array}} = [{{items}}];", dynamicArgs: { items: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } } },
    js_object_create: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:objeto] = objeto [code:props]", block_type: "a-b", action: "const {{objeto}} = {\n&props&\n};" },
    js_for_each: { color: TEMPLATE_PALETTE.flow, category: "flow", text: "Por cada [text:item] en [expr:array]", block_type: "loop", action: "for (const {{item}} of {{array}}) {" },
    js_map: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:resultado] = [expr:array].map([text:item] => [expr:expr])", block_type: "a-b", action: "const {{resultado}} = {{array}}.map({{item}} => {{expr}});" },
    js_filter: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:resultado] = [expr:array].filter([text:item] => [expr:condicion])", block_type: "a-b", action: "const {{resultado}} = {{array}}.filter({{item}} => {{condicion}});" },
    js_reduce: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:resultado] = reduce [expr:array]", block_type: "a-b", action: "const {{resultado}} = {{array}}.reduce((acc, item) => acc + item, 0);" },
    js_set_prop: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:objeto].[text:prop] = [expr:valor]", block_type: "a-b", action: "{{objeto}}.{{prop}} = {{valor}};" },

    js_dom_query: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:el] = querySelector [expr:selector]", block_type: "a-b", action: "const {{el}} = document.querySelector({{selector}});" },
    js_dom_query_all: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:els] = querySelectorAll [expr:selector]", block_type: "a-b", action: "const {{els}} = document.querySelectorAll({{selector}});" },
    js_dom_text: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:el].textContent = [expr:texto]", block_type: "a-b", action: "{{el}}.textContent = {{texto}};" },
    js_dom_html: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:el].innerHTML = [expr:html]", block_type: "a-b", action: "{{el}}.innerHTML = {{html}};" },
    js_dom_style: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:el] style [text:prop] = [expr:valor]", block_type: "a-b", action: "{{el}}.style.{{prop}} = {{valor}};" },
    js_dom_class_add: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:el].classList.add [expr:clase]", block_type: "a-b", action: "{{el}}.classList.add({{clase}});" },
    js_dom_create: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:el] = createElement [expr:tag]", block_type: "a-b", action: "const {{el}} = document.createElement({{tag}});" },
    js_dom_append: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:padre].append([expr:hijo])", block_type: "a-b", action: "{{padre}}.append({{hijo}});" },
    js_event_listener: { color: TEMPLATE_PALETTE.web, category: "web", text: "Evento [text:el] [select:evento]", block_type: "function", action: "{{el}}.addEventListener('&evento&', event => {", close: "});", inputs: { evento: { options: ["click", "input", "change", "submit", "keydown", "keyup", "mousemove", "touchstart"], default: "click", raw: true } } },
    js_local_set: { color: TEMPLATE_PALETTE.web, category: "web", text: "localStorage set [expr:clave] = [expr:valor]", block_type: "a-b", action: "localStorage.setItem({{clave}}, {{valor}});" },
    js_local_get: { color: TEMPLATE_PALETTE.web, category: "web", text: "[text:resultado] = localStorage get [expr:clave]", block_type: "a-b", action: "const {{resultado}} = localStorage.getItem({{clave}});" },

    js_geo_get: { color: TEMPLATE_PALETTE.device, category: "device", text: "Obtener ubicacion", block_type: "function", action: "navigator.geolocation.getCurrentPosition(position => {", close: "});" },
    js_camera_stream: { color: TEMPLATE_PALETTE.device, category: "device", text: "[text:stream] = pedir camara", block_type: "a-b", action: "const {{stream}} = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });" },
    js_video_src: { color: TEMPLATE_PALETTE.device, category: "device", text: "[text:video].srcObject = [expr:stream]", block_type: "a-b", action: "{{video}}.srcObject = {{stream}};" },
    js_clipboard_write: { color: TEMPLATE_PALETTE.device, category: "device", text: "copiar clipboard [expr:texto]", block_type: "a-b", action: "await navigator.clipboard.writeText({{texto}});" },
    js_clipboard_read: { color: TEMPLATE_PALETTE.device, category: "device", text: "[text:resultado] = leer clipboard", block_type: "a-b", action: "const {{resultado}} = await navigator.clipboard.readText();" },
    js_vibrate: { color: TEMPLATE_PALETTE.device, category: "device", text: "vibrar [expr:ms] ms", block_type: "a-b", action: "navigator.vibrate?.({{ms}});" },
    js_notification: { color: TEMPLATE_PALETTE.device, category: "device", text: "notificacion [expr:titulo]", block_type: "a-b", action: "new Notification({{titulo}});" },

    expr_js_get_prop: { color: TEMPLATE_PALETTE.data, category: "data", text: "[expr:objeto].[text:prop]", block_type: "expr", action: "{{objeto}}.{{prop}}" },
    expr_js_template: { color: TEMPLATE_PALETTE.text, category: "text", text: "template `[text:texto]`", block_type: "expr", action: "`&texto&`" },
    expr_js_json_stringify: { color: TEMPLATE_PALETTE.api, category: "api", text: "JSON.stringify([expr:valor])", block_type: "expr", action: "JSON.stringify({{valor}})" },
    expr_js_parse_json: { color: TEMPLATE_PALETTE.api, category: "api", text: "JSON.parse([expr:texto])", block_type: "expr", action: "JSON.parse({{texto}})" }
  });
}

function addCppPowerBlocks(template) {
  addBlocks(template, {
    cpp_include: topImport("#include <[text:libreria]>", "#include <{{libreria}}>"),
    cpp_using_namespace: topImport("using namespace [text:nombre]", "using namespace {{nombre}};"),
    cpp_include_common: topImport("includes C++ comunes", "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <algorithm>"),
    cpp_include_time: topImport("include chrono/thread", "#include <chrono>\n#include <thread>"),
    cpp_include_arduino: topImport("include Arduino/Servo", "#include <Arduino.h>\n#include <Servo.h>"),

    cpp_var_typed: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:tipo] [text:nombre] = [expr:valor]", block_type: "a-b", action: "{{tipo}} {{nombre}} = {{valor}};" },
    cpp_const: { color: TEMPLATE_PALETTE.data, category: "data", text: "const [text:tipo] [text:nombre] = [expr:valor]", block_type: "a-b", action: "const {{tipo}} {{nombre}} = {{valor}};" },
    cpp_vector_create: { color: TEMPLATE_PALETTE.data, category: "data", text: "vector<[text:tipo]> [text:nombre] = [args:items]", block_type: "a-b", action: "std::vector<{{tipo}}> {{nombre}} = { {{items}} };", dynamicArgs: { items: { mode: "expr", join: ", ", min: 0, placeholder: "valor" } } },
    cpp_vector_push: { color: TEMPLATE_PALETTE.data, category: "data", text: "[text:vector].push_back([expr:valor])", block_type: "a-b", action: "{{vector}}.push_back({{valor}});" },
    cpp_for_each: { color: TEMPLATE_PALETTE.flow, category: "flow", text: "Por cada [text:item] en [expr:coleccion]", block_type: "loop", action: "for (auto &{{item}} : {{coleccion}}) {" },
    cpp_for_range: { color: TEMPLATE_PALETTE.flow, category: "flow", text: "Para [text:i] de [expr:inicio] a [expr:fin]", block_type: "loop", action: "for (int {{i}} = {{inicio}}; {{i}} < {{fin}}; {{i}}++) {" },
    cpp_if_else: { color: TEMPLATE_PALETTE.logic, category: "logic", text: "Si [expr:condicion] si no", block_type: "condition", action: "if ({{condicion}}) {" },

    cpp_function_void: { color: TEMPLATE_PALETTE.function, category: "function", text: "void funcion [text:nombre] [args:args]", block_type: "function", action: "void {{nombre}}({{args}}) {", close: "}", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "int valor" } } },
    cpp_function_typed: { color: TEMPLATE_PALETTE.function, category: "function", text: "[text:tipo] funcion [text:nombre] [args:args]", block_type: "function", action: "{{tipo}} {{nombre}}({{args}}) {", close: "}", dynamicArgs: { args: { mode: "raw", join: ", ", min: 0, placeholder: "int valor" } } },
    cpp_cout: { color: TEMPLATE_PALETTE.io, category: "io", text: "cout [expr:valor]", block_type: "a-b", action: "std::cout << {{valor}} << std::endl;" },
    cpp_cin: { color: TEMPLATE_PALETTE.io, category: "io", text: "cin [text:variable]", block_type: "a-b", action: "std::cin >> {{variable}};" },
    cpp_sleep_ms: { color: TEMPLATE_PALETTE.time, category: "time", text: "sleep [expr:ms] ms", block_type: "a-b", action: "std::this_thread::sleep_for(std::chrono::milliseconds({{ms}}));" },
    cpp_now_ms: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = tiempo ms", block_type: "a-b", action: "auto {{resultado}} = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now().time_since_epoch()).count();" },

    arduino_setup: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Arduino setup()", block_type: "function", action: "void setup() {", close: "}" },
    arduino_loop: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Arduino loop()", block_type: "function", action: "void loop() {", close: "}" },
    arduino_pin_mode: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "pinMode pin [expr:pin] modo [select:modo]", block_type: "a-b", action: "pinMode({{pin}}, {{modo}});", inputs: { modo: { options: ["OUTPUT", "INPUT", "INPUT_PULLUP"], default: "OUTPUT", raw: true } } },
    arduino_digital_write: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "digitalWrite pin [expr:pin] valor [select:nivel]", block_type: "a-b", action: "digitalWrite({{pin}}, {{nivel}});", inputs: { nivel: { options: ["HIGH", "LOW"], default: "HIGH", raw: true } } },
    arduino_digital_read: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "[text:resultado] = digitalRead([expr:pin])", block_type: "a-b", action: "int {{resultado}} = digitalRead({{pin}});" },
    arduino_analog_read: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "[text:resultado] = analogRead([expr:pin])", block_type: "a-b", action: "int {{resultado}} = analogRead({{pin}});" },
    arduino_analog_write: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "analogWrite pin [expr:pin] valor [expr:valor]", block_type: "a-b", action: "analogWrite({{pin}}, {{valor}});" },
    arduino_delay: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "delay [expr:ms] ms", block_type: "a-b", action: "delay({{ms}});" },
    arduino_delay_microseconds: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "delayMicroseconds [expr:us]", block_type: "a-b", action: "delayMicroseconds({{us}});" },
    arduino_millis: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = millis()", block_type: "a-b", action: "unsigned long {{resultado}} = millis();" },
    arduino_micros: { color: TEMPLATE_PALETTE.time, category: "time", text: "[text:resultado] = micros()", block_type: "a-b", action: "unsigned long {{resultado}} = micros();" },
    arduino_serial_begin: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Serial.begin([expr:baud])", block_type: "a-b", action: "Serial.begin({{baud}});" },
    arduino_serial_print: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Serial.println([expr:valor])", block_type: "a-b", action: "Serial.println({{valor}});" },
    arduino_servo_declare: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Declarar Servo [text:servo]", block_type: "import", action: "Servo {{servo}};", topLevel: true },
    arduino_servo_attach: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Servo [text:servo] attach pin [expr:pin]", block_type: "a-b", action: "{{servo}}.attach({{pin}});" },
    arduino_servo_write: { color: TEMPLATE_PALETTE.robot, category: "robot", text: "Servo [text:servo] write [expr:angulo]", block_type: "a-b", action: "{{servo}}.write({{angulo}});" },

    expr_cpp_size: { color: TEMPLATE_PALETTE.data, category: "data", text: "[expr:objeto].size()", block_type: "expr", action: "{{objeto}}.size()" },
    expr_cpp_at: { color: TEMPLATE_PALETTE.data, category: "data", text: "[expr:objeto][[expr:indice]]", block_type: "expr", action: "{{objeto}}[{{indice}}]" }
  });
}

function normalizeReturnBlocks(template) {
  if (!template.blocks.return) return;
  template.blocks.return.block_type = "a-b";
  template.blocks.return.text = "Retornar [expr:valor]";
  if ((template.lang || '').toLowerCase() === 'js') {
    template.blocks.return.action = "return {{valor}};";
  }
}

function addVariadicConcatBlocks(template) {
  const lang = (template.lang || 'js').toLowerCase();
  const join = lang === 'php' ? ' . ' : ' + ';
  if (template.blocks.concat) {
    template.blocks.concat.text = "[text:resultado] = unir [args:items]";
    template.blocks.concat.action = lang === 'php'
      ? "${{resultado}} = {{items}};"
      : lang === 'js'
        ? "let {{resultado}} = {{items}};"
        : "{{resultado}} = {{items}}";
    template.blocks.concat.dynamicArgs = { items: { mode: "expr", join, min: 2, placeholder: "valor" } };
  }
  if (template.blocks.expr_concat) {
    template.blocks.expr_concat.text = "unir [args:items]";
    template.blocks.expr_concat.action = "({{items}})";
    template.blocks.expr_concat.dynamicArgs = { items: { mode: "expr", join, min: 2, placeholder: "valor" } };
  }
}

// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var text: any;
declare var expStart: any;
declare var expEnd: any;
declare var hash: any;
declare var slash: any;
declare var arrow: any;
declare var dictStart: any;
declare var dictEnd: any;
declare var colon: any;
declare var star: any;
declare var identifier: any;
declare var value: any;

import lexer from '../lexer/index';

interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["Text"]},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["Expression"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "main", "symbols": ["main$ebnf$1"]},
    {"name": "Text", "symbols": [(lexer.has("text") ? {type: "text"} : text)]},
    {"name": "Expression", "symbols": ["IdentExpr"]},
    {"name": "Expression", "symbols": ["HandlebarsExpr"]},
    {"name": "Expression", "symbols": ["FunctionExpr"]},
    {"name": "Expression", "symbols": ["BlockEndExpr"]},
    {"name": "IdentExpr$macrocall$2", "symbols": ["Ident"]},
    {"name": "IdentExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "IdentExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "IdentExpr", "symbols": ["IdentExpr$macrocall$1"]},
    {"name": "HandlebarsExpr$macrocall$2", "symbols": [(lexer.has("hash") ? {type: "hash"} : hash), "Ident"]},
    {"name": "HandlebarsExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "HandlebarsExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "HandlebarsExpr", "symbols": ["HandlebarsExpr$macrocall$1"]},
    {"name": "FunctionExpr$macrocall$2", "symbols": ["Function"]},
    {"name": "FunctionExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "FunctionExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "FunctionExpr", "symbols": ["FunctionExpr$macrocall$1"]},
    {"name": "BlockEndExpr$macrocall$2", "symbols": [(lexer.has("slash") ? {type: "slash"} : slash), "Ident"]},
    {"name": "BlockEndExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "BlockEndExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "BlockEndExpr", "symbols": ["BlockEndExpr$macrocall$1"]},
    {"name": "Function$ebnf$1$subexpression$1", "symbols": ["Dictionary"]},
    {"name": "Function$ebnf$1$subexpression$1", "symbols": ["Value"]},
    {"name": "Function$ebnf$1", "symbols": ["Function$ebnf$1$subexpression$1"]},
    {"name": "Function$ebnf$1$subexpression$2", "symbols": ["Dictionary"]},
    {"name": "Function$ebnf$1$subexpression$2", "symbols": ["Value"]},
    {"name": "Function$ebnf$1", "symbols": ["Function$ebnf$1", "Function$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Function", "symbols": ["Ident", (lexer.has("arrow") ? {type: "arrow"} : arrow), "Function$ebnf$1"]},
    {"name": "Dictionary$ebnf$1", "symbols": []},
    {"name": "Dictionary$ebnf$1$subexpression$1", "symbols": ["NamedField"]},
    {"name": "Dictionary$ebnf$1$subexpression$1", "symbols": ["Field"]},
    {"name": "Dictionary$ebnf$1", "symbols": ["Dictionary$ebnf$1", "Dictionary$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Dictionary", "symbols": [(lexer.has("dictStart") ? {type: "dictStart"} : dictStart), "Dictionary$ebnf$1", (lexer.has("dictEnd") ? {type: "dictEnd"} : dictEnd)]},
    {"name": "NamedField", "symbols": ["Field", (lexer.has("colon") ? {type: "colon"} : colon), "Value"]},
    {"name": "Field", "symbols": ["Value"]},
    {"name": "Field", "symbols": [(lexer.has("star") ? {type: "star"} : star), "Value"]},
    {"name": "Ident", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "Value", "symbols": [(lexer.has("value") ? {type: "value"} : value)]}
  ],
  ParserStart: "main",
};

export default grammar;

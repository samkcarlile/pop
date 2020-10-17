// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var text: any;
declare var blockStart: any;
declare var expStart: any;
declare var expEnd: any;
declare var blockEnd: any;
declare var arrow: any;

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
    {"name": "template$ebnf$1", "symbols": []},
    {"name": "template$ebnf$1$subexpression$1", "symbols": ["text"]},
    {"name": "template$ebnf$1$subexpression$1", "symbols": ["expression"]},
    {"name": "template$ebnf$1", "symbols": ["template$ebnf$1", "template$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "template", "symbols": ["template$ebnf$1"]},
    {"name": "text", "symbols": [(lexer.has("text") ? {type: "text"} : text)]},
    {"name": "expression$macrocall$2", "symbols": [(lexer.has("blockStart") ? {type: "blockStart"} : blockStart)]},
    {"name": "expression$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "expression$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "expression", "symbols": ["expression$macrocall$1"]},
    {"name": "expression$macrocall$4", "symbols": [(lexer.has("blockEnd") ? {type: "blockEnd"} : blockEnd)]},
    {"name": "expression$macrocall$3", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "expression$macrocall$4", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "expression", "symbols": ["expression$macrocall$3"]},
    {"name": "expression$macrocall$6", "symbols": ["function"]},
    {"name": "expression$macrocall$5", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "expression$macrocall$6", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)]},
    {"name": "expression", "symbols": ["expression$macrocall$5"]},
    {"name": "function", "symbols": [(lexer.has("blockStart") ? {type: "blockStart"} : blockStart), (lexer.has("arrow") ? {type: "arrow"} : arrow)]}
  ],
  ParserStart: "template",
};

export default grammar;

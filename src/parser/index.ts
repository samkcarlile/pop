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
import * as post from './post';

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
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["PromptBlock"]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "main", "symbols": ["main$ebnf$1"], "postprocess": post.main},
    {"name": "Text", "symbols": [(lexer.has("text") ? {type: "text"} : text)], "postprocess": post.text},
    {"name": "PromptBlock", "symbols": ["PromptExpr", "BlockBody", "EndExpr"], "postprocess": post.promptBlock},
    {"name": "BlockBody$ebnf$1$subexpression$1", "symbols": ["Text"]},
    {"name": "BlockBody$ebnf$1$subexpression$1", "symbols": ["IdentExpr"]},
    {"name": "BlockBody$ebnf$1$subexpression$1", "symbols": ["HelperExpr"]},
    {"name": "BlockBody$ebnf$1", "symbols": ["BlockBody$ebnf$1$subexpression$1"]},
    {"name": "BlockBody$ebnf$1$subexpression$2", "symbols": ["Text"]},
    {"name": "BlockBody$ebnf$1$subexpression$2", "symbols": ["IdentExpr"]},
    {"name": "BlockBody$ebnf$1$subexpression$2", "symbols": ["HelperExpr"]},
    {"name": "BlockBody$ebnf$1", "symbols": ["BlockBody$ebnf$1", "BlockBody$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "BlockBody", "symbols": ["BlockBody$ebnf$1"], "postprocess": post.blockBody},
    {"name": "PromptExpr$macrocall$2", "symbols": ["Prompt"]},
    {"name": "PromptExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "PromptExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)], "postprocess": post._expression},
    {"name": "PromptExpr", "symbols": ["PromptExpr$macrocall$1"], "postprocess": post.promptExpression},
    {"name": "IdentExpr$macrocall$2", "symbols": ["Ident"]},
    {"name": "IdentExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "IdentExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)], "postprocess": post._expression},
    {"name": "IdentExpr", "symbols": ["IdentExpr$macrocall$1"], "postprocess": post.identExpression},
    {"name": "HelperExpr$macrocall$2", "symbols": [(lexer.has("hash") ? {type: "hash"} : hash), "Ident"]},
    {"name": "HelperExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "HelperExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)], "postprocess": post._expression},
    {"name": "HelperExpr", "symbols": ["HelperExpr$macrocall$1"], "postprocess": post.helperExpression},
    {"name": "EndExpr$macrocall$2", "symbols": [(lexer.has("slash") ? {type: "slash"} : slash), "Ident"]},
    {"name": "EndExpr$macrocall$1", "symbols": [(lexer.has("expStart") ? {type: "expStart"} : expStart), "EndExpr$macrocall$2", (lexer.has("expEnd") ? {type: "expEnd"} : expEnd)], "postprocess": post._expression},
    {"name": "EndExpr", "symbols": ["EndExpr$macrocall$1"], "postprocess": post.endExpression},
    {"name": "Prompt$ebnf$1$subexpression$1", "symbols": ["Dictionary"]},
    {"name": "Prompt$ebnf$1$subexpression$1", "symbols": ["Value"]},
    {"name": "Prompt$ebnf$1", "symbols": ["Prompt$ebnf$1$subexpression$1"]},
    {"name": "Prompt$ebnf$1$subexpression$2", "symbols": ["Dictionary"]},
    {"name": "Prompt$ebnf$1$subexpression$2", "symbols": ["Value"]},
    {"name": "Prompt$ebnf$1", "symbols": ["Prompt$ebnf$1", "Prompt$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Prompt", "symbols": ["Ident", (lexer.has("arrow") ? {type: "arrow"} : arrow), "Prompt$ebnf$1"], "postprocess": post.prompt},
    {"name": "Dictionary$ebnf$1", "symbols": []},
    {"name": "Dictionary$ebnf$1$subexpression$1", "symbols": ["NamedField"]},
    {"name": "Dictionary$ebnf$1$subexpression$1", "symbols": ["Field"]},
    {"name": "Dictionary$ebnf$1", "symbols": ["Dictionary$ebnf$1", "Dictionary$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Dictionary", "symbols": [(lexer.has("dictStart") ? {type: "dictStart"} : dictStart), "Dictionary$ebnf$1", (lexer.has("dictEnd") ? {type: "dictEnd"} : dictEnd)], "postprocess": post.dictionary},
    {"name": "NamedField", "symbols": ["Field", (lexer.has("colon") ? {type: "colon"} : colon), "Value"], "postprocess": post.namedField},
    {"name": "Field", "symbols": ["Value"], "postprocess": post.field},
    {"name": "Field", "symbols": [(lexer.has("star") ? {type: "star"} : star), "Value"], "postprocess": post.defaultField},
    {"name": "Ident", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": post.identifier},
    {"name": "Value", "symbols": [(lexer.has("value") ? {type: "value"} : value)], "postprocess": post.value}
  ],
  ParserStart: "main",
};

export default grammar;

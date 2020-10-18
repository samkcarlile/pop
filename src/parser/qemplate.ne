@preprocessor typescript

@{%
import lexer from '../lexer/index';
%}

@lexer lexer

main -> (Text | Expression):*

Text -> %text

# an expression is always wrapped like this: {{ expression }}
inExp[X] -> %expStart $X %expEnd
Expression -> IdentExpr
            | HandlebarsExpr
            | FunctionExpr
            | BlockEndExpr

IdentExpr -> inExp[Ident]

# handlerbars expressions look like this: {{#helper}}
# oddly enough, whitespace is important here! (we don't check for it though 😳)
HandlebarsExpr -> inExp[%hash Ident]

FunctionExpr -> inExp[Function]

# Block end expressions look like this: {{ /block }}
BlockEndExpr -> inExp[%slash Ident]

Function -> Ident %arrow (Dictionary | Value):+

Dictionary -> %dictStart (NamedField | Field):* %dictEnd

NamedField -> Field %colon Value

Field -> Value
       | %star Value

Ident -> %identifier

Value -> %value
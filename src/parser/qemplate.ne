@preprocessor typescript

@{%
import lexer from '../lexer/index';
%}

@lexer lexer

template -> (text | expression):*

text -> %text

inExpression[EXP] -> %expStart $EXP %expEnd
expression -> 
    inExpression[%blockStart]
  | inExpression[%blockEnd]
  | inExpression[function]

function -> %blockStart %arrow

# NOTE: this is very incomplete
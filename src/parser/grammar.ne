@preprocessor typescript

@{%
import lexer from '../lexer/index';
import * as post from './post';
%}

@lexer lexer

main -> (Text | PromptBlock):*
  {% post.main %}

Text -> %text {% post.text %}

PromptBlock 
  -> PromptExpr BlockBody EndExpr
    {% post.promptBlock %}

BlockBody 
  -> (Text | IdentExpr | HelperExpr ):+
    {% post.blockBody %}

# TODO: helper blocks...this may require a minor restructure
# HelperBlock
#   -> HelperExpr BlockBody EndExpr

# an expression is always wrapped like this: {{ expression }}
inExp[X] 
  -> %expStart $X %expEnd
    {% post._expression %}

PromptExpr 
  -> inExp[Prompt]
    {% post.promptExpression %}

IdentExpr 
  -> inExp[Ident]
    {% post.identExpression %}

# helper expressions look like this: {{ #helper }}
HelperExpr 
  -> inExp[%hash Ident]
    {% post.helperExpression %}

# End expressions look like this: {{ /block }}
EndExpr 
  -> inExp[%slash Ident]
    {% post.endExpression %}

Prompt 
  -> Ident %arrow (Dictionary | Value):+
    {% post.prompt %}

# dictionaries consist of named and unnamed fields
Dictionary 
  -> %dictStart (NamedField | Field):* %dictEnd
    {% post.dictionary %}

# a named field looks like this: 
NamedField 
  -> Field %colon Value {% post.namedField %}

# a field can be indicated as default like this: *fieldName
# or not default like this: fieldName
Field 
  -> Value {% post.field %}
   | %star Value {% post.defaultField %}

Ident 
  -> %identifier {% post.identifier %}

Value 
  -> %value {% post.value %}
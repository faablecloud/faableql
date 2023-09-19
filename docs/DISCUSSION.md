# FaableQL

Create a DSL language to query a MongoDB Database like Shopify Search grammar

- https://shopify.dev/docs/api/usage/search-syntax

Por el momento el mejor candidato para desarrollar el DSL es OHM JS.

## Some resources

- https://stackoverflow.com/questions/10959489/building-a-dsl-query-language
- https://reinout.vanrees.org/weblog/2012/06/04/domain-specific-languages.html
- https://github.com/lys-lang/node-ebnf
- https://www.matthieuamiguet.ch/media/misc/djangocon2012/djangocon2012.html
- https://github.com/zaach/jison

## OHM JS

- https://github.com/ohmjs/ohm
- https://www.youtube.com/watch?v=4t_zwHA68Xo
- https://ohmjs.org/editor/#

Tutorial:

- https://nextjournal.com/dubroy/ohm-parsing-made-easy

## Examples

FaableQL:
`internal_id:1235 label:1234 label:abc`

Output query:

```json
{"$and":[
    {"internal_id":1235},
    {"label":1234},
    {"label":abc}
]}
```

FaableQL:
`Jason Bourne label:abc`

Output query:

```json
{"$and":[
    ...all_text_fields...
    {"internal_id":1235},
    {"label":1234},
    {"label":abc}
]}
```

import * as ohm from "ohm-js";
import { Field } from "./Field";
import { FaableQLError } from "./errors";

const source = String.raw`
FaableQL {
  Exp = FieldExpr* TextExpr?
  TextExpr = simpletext+ | QuotedText
  simpletext = alnum+
  QuotedText = ("\"" alnum+ "\"")
  FieldExpr = field operator value
  operator = (eq | noteq)
  eq = ":"
  noteq = "!:"
  field = (alnum|"_"|"-")+
  value = (alnum|"_"|"-"|"@"|".")+
}
`;

const grammar = ohm.grammar(source);

export interface SemanticOptions {
  searchLang: string;
}

export const create_semantics = (
  valid_fields: Field[],
  options: SemanticOptions
) => {
  const s = grammar.createSemantics();
  s.addAttribute("asMongo", {
    FieldExpr(name, operator, value) {
      const ops = {
        ":": "$eq",
        "!:": "$ne",
      };
      const op = ops[operator.asMongo];
      let val;
      if (op == "$eq") {
        val = value.asMongo;
      } else {
        val = { [op]: value.asMongo };
      }

      // Valid field
      const token = name.asMongo;
      const field_def = valid_fields.find((f) => f.name == token);
      if (!field_def) {
        throw new FaableQLError(`${token} is not a valid field to query`);
      }
      const fieldname = field_def.db;
      return { [fieldname]: val };
    },
    TextExpr(text) {
      return {
        $text: {
          $search: text.isIteration() ? text.asMongo.join(" ") : text.asMongo,
          $language: options.searchLang,
        },
      };
    },
    Exp(fields, text) {
      const merged = fields.children.map((e) => e?.asMongo);
      return {
        ...text.child(0)?.asMongo,
        ...(merged.length > 0 && { $and: merged }),
      };
    },
    QuotedText(_, text, __) {
      return text.sourceString;
    },
    simpletext(_) {
      return this.sourceString;
    },
    field(_) {
      return this.sourceString;
    },
    value(_) {
      return this.sourceString;
    },
    _iter(...child) {
      return child.map((e) => e.asMongo);
    },
    _terminal() {
      return this.sourceString;
    },
  } as any);
  return { semantics: s, grammar };
};

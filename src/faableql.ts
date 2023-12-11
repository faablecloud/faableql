import { SemanticOptions, create_semantics } from "./grammar";
import { Field } from "./Field";
import { FaableQLError } from "./errors";

export const create_faableql =
  (valid_fields: Field[], options: SemanticOptions = { searchLang: "es" }) =>
  (query: string) => {
    const { semantics, grammar } = create_semantics(valid_fields, options);

    // Match grammar
    const match = grammar.match(query);

    if (!match.succeeded()) {
      throw new FaableQLError("❌ Invalid query");
    }
    //console.log("✅ Valid match");
    const ops_dict = semantics(match);
    return ops_dict.asMongo;
  };

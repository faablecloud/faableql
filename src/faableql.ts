import { create_semantics } from "./grammar";
import { Field } from "./Field";

export const create_faableql = (valid_fields: Field[]) => (query: string) => {
  const { semantics, grammar } = create_semantics(valid_fields);

  // Match grammar
  const match = grammar.match(query);

  if (!match.succeeded()) {
    throw new Error("❌ Invalid query");
  }
  //console.log("✅ Valid match");
  const ops_dict = semantics(match);
  return ops_dict.asMongo;
};

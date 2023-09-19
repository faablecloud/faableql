import * as ohm from "ohm-js";

const source = String.raw`
FaableQL {
  Expr = FieldExpr+
  FieldExpr = field operator value
  operator = (eq | noteq)
  eq = ":"
  noteq = "!:"
  field = letter+
  value = letter+
}
`;

const faableQL = ohm.grammar(source);

console.log(faableQL);

const valid_fields = [{ name: "label", db: "labels" }];

const s = faableQL.createSemantics();
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
      throw new Error(`${token} is not a valid field to query`);
    }
    const fieldname = field_def.db;
    return { [fieldname]: val };
  },
  field(_) {
    return this.sourceString;
  },
  value(_) {
    return this.sourceString;
  },
  _iter(...child) {
    return { $and: child.map((e) => e.asMongo) };
  },
  _terminal() {
    return this.sourceString;
  },
} as any);

const query =
  "label:babies label:vegetarian label:vegan label:freeze label!:egg label:glucose";

const match = faableQL.match(query);
console.log(match);
if (match.succeeded()) {
  console.log("✅ Valid match");

  const ops_dict = s(match);
  console.log(ops_dict.asMongo);
  console.log(JSON.stringify(ops_dict.asMongo, null, 2));
} else {
  console.log("❌ Invalid match");
}

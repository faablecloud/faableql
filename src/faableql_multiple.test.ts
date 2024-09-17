import test from "ava";
import { create_faableql } from "./faableql.js";

const faableQL = create_faableql([
  { name: "label", db: "labels" },
  { name: "category", db: "category" },
]);

// test("one field", (t) => {
//   const query = faableQL("category:babies");
//   t.deepEqual(query, {
//     $and: [{ category: "babies" }],
//   });
// });

test("one field as prefixed_id", (t) => {
  const query = faableQL("category:tag_659d55daa7f446622dc4e1c3");
  t.deepEqual(query, {
    $and: [{ category: "tag_659d55daa7f446622dc4e1c3" }],
  });
});

test("two different fields", (t) => {
  const query = faableQL("category:tag_659d55daa7f446622dc4e1c3 label:hola");
  t.deepEqual(query, {
    $and: [{ category: "tag_659d55daa7f446622dc4e1c3" }, { labels: "hola" }],
  });
});

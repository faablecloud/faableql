import test from "ava";
import { create_faableql } from "./faableql";

const faableQL = create_faableql([{ name: "label", db: "labels" }]);

test("one field", (t) => {
  const query = faableQL("label:babies");
  t.deepEqual(query, {
    $and: [{ labels: "babies" }],
  });
});

test("multiple fields", (t) => {
  const query = faableQL(
    "label:babies label:vegetarian label:vegan label:freeze label!:egg label:glucose"
  );
  t.deepEqual(query, {
    $and: [
      { labels: "babies" },
      { labels: "vegetarian" },
      { labels: "vegan" },
      { labels: "freeze" },
      {
        labels: {
          $ne: "egg",
        },
      },
      { labels: "glucose" },
    ],
  });
});

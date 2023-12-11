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

test("text", (t) => {
  const query = faableQL("this is me");
  t.deepEqual(query, {
    $text: { $search: "this is me", $language: "es" },
  });
});

test("text quoted", (t) => {
  const query = faableQL('"this is me"');
  t.deepEqual(query, {
    $text: { $search: "this is me", $language: "es" },
  });
});

test("text and labels", (t) => {
  const query = faableQL("label:babies label:yes this is me");
  // console.log(JSON.stringify(query, null, 2));

  t.deepEqual(query, {
    $and: [{ labels: "babies" }, { labels: "yes" }],
    $text: { $search: "this is me", $language: "es" },
  });
});

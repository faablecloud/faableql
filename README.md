<p align="center">
  <a href="https://faable.com">
    <h1 align="center">FaableQL</h1>
  </a>
  <p align="center">A small domain specific language to create simple MongoDB queries</p>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@faable/faableql">
    <img alt="" src="https://img.shields.io/npm/v/@faable/faableql.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

Syntax:

```
<field1>:<value> <field2>:<value>
```

## Install

With NPM:

```bash
 npm install @faable/faableql
```

With Yarn:

```bash
 yarn add @faable/faableql
```

## Getting Started

Configure fields that can be queried in MongoDB:

```js
const fields = [{ name: "label", db: "labels" }];
```

| param | description                   |
| ----- | ----------------------------- |
| name  | field name in FaableQL string |
| db    | MongoDB field name            |

Create `fql` instance configured with defined fields.

```js
import { create_faableql } from "@faable/faableql";

const fql = create_faableql(fields);
```

Convert a `FaableQL` query to `MongoDB`:

```js
const query = "label:optimus label:prime";

// Process FaableQL query
const mongodb_query = fql(query);
```

`mongodb_query` will be converted to:

```json
{
  "$and": [{ "labels": { "$eq": "optimus" } }, { "labels": { "$eq": "prime" } }]
}
```

use `mongoose` to launch query and get results

```js
const docs = await Model.find(mongodb_query);
```

## Operators

Avaliable operators

| Operator | Description | MongoDB                     |
| -------- | ----------- | --------------------------- |
| `:`      | Equal       | `{<db_field>:{$eq:<value>}` |
| `!:`     | Not equal   | `{<db_field>:{$ne:<value>}` |

# Queries

1. Listar recetas que contengan las etiquetas `babies` y `vegetarian` pero no `vegan` y `freeze`

DSL:

```faableql
label:babies label:vegetarian -label:vegan -label:freeze -label:egg -label:glucose
```

Mongodb:

```json
{
  "$and": [
    { "labels": "babies" },
    { "labels": "vegetarian" },
    { "labels": { "$ne": "vegan" } },
    { "labels": { "$ne": "freeze" } },
    { "labels": { "$ne": "glucose" } },
    { "labels": { "$ne": "egg" } }
  ]
}
```

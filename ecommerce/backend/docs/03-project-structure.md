# 03 — Project structure (folder haru kina yesto?)

Backend ko folder kholda yesto cha:

```
backend/
├── controllers/      ← logic (database query, business rules)
├── models/           ← Mongoose schemas (data ko shape)
├── routes/           ← URL → controller mapping
├── utils/            ← reusable helpers (DB connect)
├── docs/             ← yei haru
├── index.js          ← app start hune file
├── package.json      ← dependencies list
└── .env              ← secrets (DB URL, JWT key)
```

---

## Kina yo folder structure?

Sab eutai file ma lekhna milcha — tara 100 endpoint bhayepachi 5000 line ko file. Find garna gahro, debug garna gahro.

Tehi le **separation of concerns** — har layer ko aafno kaam:

| Folder | Responsibility | Real life analogy |
|--------|----------------|-------------------|
| `routes/` | URL receive garcha | Restaurant ko **waiter** — order liyera kitchen ma puryaucha |
| `controllers/` | Logic chalaucha | **Chef** — order banauchha |
| `models/` | Data ko shape define garcha | **Recipe book** — kun dish ma k cha |
| `utils/` | Reusable helpers | **Spice rack** — sab le chahiney common cheez |

---

## Eutai request ko full journey

`GET /products` request aayo. Step by step:

1. **`index.js`** — server chaleko cha, request liyo
2. **`routes/product.routes.js`** — "ho yo URL malai thaha cha, `getAllProducts` controller ma pathau"
3. **`controllers/product.controllers.js`** — `getAllProducts` function chalyo
4. **`models/product.model.js`** — Mongoose schema use garera DB query (`Product.find()`)
5. **MongoDB** — data return garyo
6. **Controller** — data lai response ma halyo (`res.status(200).json(products)`)
7. **Browser** — products list dekhayo

Yo flow har endpoint ma same chalcha. Auth, products, categories, orders — sab.

---

## Naya feature add garda kahaa change garney?

Sochnau **`POST /admin/products`** banauna paryo (admin le product create garne). Yo 3 thau ma changes:

1. **`models/product.model.js`** — schema already cha, edit nagarey pani huncha
2. **`controllers/product.controllers.js`** — naya function `createProduct` add gar
3. **`routes/product.routes.js`** — `Productrouter.post("/admin/products", ProductController.createProduct)`

Bas. Yei pattern le sab CRUD (Create, Read, Update, Delete) banaaune.

---

## TL;DR

- `routes/` = URL → controller mapping (waiter)
- `controllers/` = actual logic (chef)
- `models/` = data shape (recipe)
- `utils/` = reusable helpers
- `index.js` = entry point, server start hune
- Naya endpoint = model (chahincha bhane) + controller + route

Next: `04-models-explained.md`

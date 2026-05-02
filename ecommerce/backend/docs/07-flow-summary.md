# 07 — Full flow summary (sab kura jodne)

Yo file ma har piece kasari jodincha herna.

---

## Big picture diagram

```
┌──────────┐                          ┌──────────────────────────┐
│ Browser  │                          │  Backend (Node + Express)│
│ (Postman)│                          │                          │
│          │ ── HTTP request ───────► │  index.js (entry)        │
│          │                          │     ↓                    │
│          │                          │  routes/ (URL match)     │
│          │                          │     ↓                    │
│          │                          │  controllers/ (logic)    │
│          │                          │     ↓                    │
│          │                          │  models/ (Mongoose)      │
│          │                          │     ↓                    │
│          │                          │  ┌────────────┐          │
│          │                          │  │  MongoDB   │          │
│          │                          │  └────────────┘          │
│          │                          │     ↑                    │
│          │ ◄── HTTP response ─────── │  controller responds    │
└──────────┘                          └──────────────────────────┘
```

---

## Eutai endpoint ko life — `GET /products/:id`

**1. Browser**

```
GET /products/67abc123 HTTP/1.1
Host: localhost:3000
```

**2. Express receives** (`index.js` chaleko cha):

```js
app.use(Productrouter);  // sab product routes registered
```

**3. Route matches** (`routes/product.routes.js`):

```js
Productrouter.get("/products/:id", ProductController.getProductById);
```

`:id` matched, `req.params.id = "67abc123"`.

**4. Controller runs** (`controllers/product.controllers.js`):

```js
getProductById: async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: "Product not found" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
}
```

**5. Mongoose runs** (`models/product.model.js` ko schema use garera):

```js
await Product.findById(id);
```

Mongoose le MongoDB ma `db.products.findOne({_id: ObjectId("67abc123")})` chalauchha.

**6. MongoDB returns**:

```json
{
  "_id": "67abc123",
  "name": "iPhone 15",
  "Saleprice": 120000,
  ...
}
```

**7. Controller responds**:

```
HTTP/1.1 200 OK
Content-Type: application/json

{"_id":"67abc123","name":"iPhone 15",...}
```

**8. Browser shows** — Done.

---

## Another flow — `POST /register`

**1. Frontend** form fill garera POST:

```
POST /register HTTP/1.1
Content-Type: application/json

{"name":"Sita","email":"sita@test.com","password":"hello123"}
```

**2. `index.js`** ma `app.use(express.json())` le body parse garcha → `req.body = {name, email, password}`

**3. Route** (`routes/auth.routes.js`):

```js
authRouter.post("/register", AuthController.Register);
```

**4. Controller** (`controllers/auth.controllers.js`):

- Validation: sab field aayo?
- DB check: yo email pahile cha?
- bcrypt: password hash
- Mongoose: `User.create({...})`
- Response: 201 sanga sanitized user

**5. Frontend** ma success message + redirect to login.

---

## File tree ma sab connect

```
index.js
   │
   ├── connectDB()  ← utils/dbconnect.js  → MongoDB connect
   │
   ├── express.json()  ← body parse middleware
   │
   ├── app.use(authRouter)        ← routes/auth.routes.js
   │      │                              │
   │      │                              └── controllers/auth.controllers.js
   │      │                                      │
   │      │                                      └── models/user.model.js
   │      │                                              │
   │      │                                              └── MongoDB
   │      │
   │      └── /register, /login
   │
   ├── app.use(Productrouter)     ← routes/product.routes.js
   │      │                              │
   │      │                              └── controllers/product.controllers.js
   │      │                                      │
   │      │                                      └── models/product.model.js
   │      │
   │      └── /products, /products/:id, /products/featured, ...
   │
   └── app.use(Categoryrouter)    ← routes/category.routes.js
          │
          └── /categories
```

---

## Naya endpoint banauney recipe

Sochnau `POST /admin/categories` add garna paryo (admin le naya category banauney).

**Step 1:** Model already cha (`models/category.model.js`). Skip.

**Step 2:** Controller ma function add garne:

```js
// controllers/category.controllers.js
createCategory: async (req, res) => {
    try {
        const { name, description, imagePath, color } = req.body;
        if (!name || !description || !imagePath || !color) {
            return res.status(400).json({ message: "All fields required" });
        }
        const category = await Category.create({ name, description, imagePath, color });
        res.status(201).json({ message: "Category created", data: category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}
```

**Step 3:** Route add garne — **middleware sanga** kina ki yo admin-only ho:

```js
// routes/category.routes.js
import { authMiddleware, adminOnly } from "../utils/auth.middleware.js";

Categoryrouter.post(
    "/admin/categories",
    authMiddleware,    // pahile token verify
    adminOnly,         // tespachhi role check
    CategoryController.createCategory
);
```

**Step 4:** Postman ma test garne. Login bata admin ko token liyera `Authorization: Bearer <token>` header sanga POST. Done.

---

## TL;DR

- Har request: `index.js` → `routes/` → `controllers/` → `models/` → MongoDB → response
- Routes file = URL matching
- Controllers = logic + DB query
- Models = data shape
- `index.js` = sab tie up garne entry point
- Naya endpoint = controller function add + route line add

---

## Padhne order

1. `00-internet-kasari-kaam-garcha.md` — internet basics
2. `01-backend-vs-frontend.md` — MERN ko 2 part
3. `02-node-express-mongoose.md` — yo project ka 4 main tools
4. `03-project-structure.md` — folder kina yesto
5. `04-models-explained.md` — schemas
6. `05-routes-controllers.md` — request handle kasari
7. `06-authentication.md` — JWT, bcrypt
8. `07-flow-summary.md` — yei

Aba code file haru kholda — har file ko upar **timi le yo doc bata sikya kura** ko comments cha. Code padhne, commits dekhne, modify garne. Yo hi backend sikney best way ho.

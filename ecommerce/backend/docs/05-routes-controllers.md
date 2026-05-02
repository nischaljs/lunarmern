# 05 — Routes ra Controllers

Routes ra controllers backend ko **majh** ma cha. Sab request yei dui le handle garcha.

---

## Routes — URL ko traffic police

User le `GET /products` request pathayo. Express le kasari thaha pauchha "yo `getAllProducts` function chalauna parcha"?

**Routes file le mapping garcha.**

`routes/product.routes.js`:

```js
const Productrouter = express.Router();

Productrouter.get("/products", ProductController.getAllProducts);
Productrouter.get("/products/:id", ProductController.getProductById);

export default Productrouter;
```

Translate:

- `Productrouter.get("/products", ...)` — kohi le `GET /products` pathayo bhane second argument ko function chalau
- `:id` — yo **dynamic parameter** ho. `/products/123` le `id = "123"` huncha
- `ProductController.getAllProducts` — yo controller ma function ko reference

### `index.js` ma kasari connect?

```js
import Productrouter from "./routes/product.routes.js";
app.use(Productrouter);
```

`app.use(Productrouter)` le Express lai bhanchha "yo router ko sabai routes register gar".

---

## Controllers — actual logic

Controller = function jaha **actual kaam huncha**. DB query, validation, response — sab yetai.

`controllers/product.controllers.js`:

```js
const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            console.log("Error fetching products:", error);
            res.status(500).json({ message: "Error fetching products" });
        }
    }
};
```

Line by line:

- `async (req, res) =>` — async function. `req` = request object, `res` = response object
- `Product.find()` — Mongoose le DB ma sab products khojcha. `await` chahincha kina ki DB query **time lagne** kura ho
- `res.status(200).json(products)` — 200 (success) sanga products array JSON ma pathau
- `try/catch` — DB down bhayo, network galyo bhane crash navai 500 response pathau

---

## `req` ra `res` — saara backend ko 2 stars

Har controller function ma yo dui huncha. Yei dui ma sab data cha.

### `req` (Request) ma k cha?

User le pathaeko data sab:

| Field | K cha | Example |
|-------|-------|---------|
| `req.body` | POST/PUT request ma pathaeko JSON | `{name, email, password}` |
| `req.params` | URL ma `:id` jasto | `/products/123` → `req.params.id = "123"` |
| `req.query` | URL ko `?` paachi | `/search?q=phone` → `req.query.q = "phone"` |
| `req.headers` | Headers (Authorization etc.) | `req.headers.authorization` |

### `res` (Response) ma k garna milcha?

Response banauney methods:

| Method | K garcha |
|--------|----------|
| `res.status(200)` | Status code set garcha |
| `res.json({...})` | JSON response pathauchha |
| `res.send("hello")` | Plain text/HTML pathauchha |
| `res.redirect("/login")` | Aru URL ma redirect |

Chain garna milcha: `res.status(200).json({...})`

---

## Real flow — `GET /products/123` aayo:

1. **`index.js`** Express le receive
2. **`routes/product.routes.js`** match: `Productrouter.get("/products/:id", getProductById)`
3. Express le `req.params.id = "123"` set garcha
4. **`controllers/product.controllers.js`** `getProductById` chalyo:
   ```js
   const { id } = req.params;
   const product = await Product.findById(id);
   res.status(200).json(product);
   ```
5. Browser ma JSON response

Sab eutai pattern. Auth ho, category ho, order ho — sab yei flow.

---

## `try/catch` kina jaruri?

Database call **fail huna sakcha**:
- MongoDB down chha
- Network problem
- Malformed query

`try/catch` bina yo error throw bhayo bhane **server crash** huncha. `try/catch` sanga 500 response pathauchau, server zinda rahancha.

```js
try {
    // DB query — fail huna sakcha
} catch (error) {
    console.log("Error:", error);   // log so we can debug
    res.status(500).json({ message: "Server error" });
}
```

**Rule:** har controller ma `try/catch`. Bhulnu hudaina.

---

## TL;DR

- **Routes** = URL → controller function ko mapping
- `:id` = URL ma dynamic parameter (cha bhane `req.params.id` ma aaucha)
- **Controllers** = actual logic, DB query, response banauney
- `req` = user le pathaeko data (body, params, query, headers)
- `res` = response banauney (status, json, etc.)
- Sab controller ma `try/catch` chahincha

Next: `06-authentication.md`

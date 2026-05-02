# 08 — Middleware (Express ko bich-bich ko bouncer)

Middleware = function jun **request aaye paachi tara controller chalna agi** chalcha.

Bouncer jasto sochne. Club ma dhokaa bhitra paathaune agi bouncer le check garcha — ID cha? umer pugya cha? VIP list ma cha? Pass bhayo bhane bhitra jana paaucha. Pass bhaena? Outside.

Express ma tehi nai middleware ko kaam ho.

---

## Visual flow

```
Request aayo
    │
    ▼
┌─────────────────┐
│  Middleware 1   │ ── fail bhayo? ───► Response (401, 403, etc.) — END
└─────────────────┘
    │ pass (next() called)
    ▼
┌─────────────────┐
│  Middleware 2   │ ── fail bhayo? ───► Response — END
└─────────────────┘
    │ pass
    ▼
┌─────────────────┐
│   Controller    │ ── final response
└─────────────────┘
```

Sab middleware le `next()` call garyo bhane matra controller samma pugcha.

---

## Middleware ko shape

Har middleware yo signature ko function ho:

```js
(req, res, next) => {
    // logic
    next();   // pass — next chalauna deu
    // OR
    return res.status(401).json({ message: "..." });   // fail — yetai stop
}
```

3 parameter:
- `req` — request (read garna milcha, modify pani garna milcha — `req.user = {...}`)
- `res` — response (fail bhaye matra use)
- `next` — function. Call garyo bhane next middleware chalcha. Call gardaina bhane request **atkihalcha**

---

## Yo project ma 3 type ka middleware

### 1. Built-in — `express.json()`

`index.js` ma cha:

```js
app.use(express.json());
```

Yo middleware le **incoming request body** lai JSON parse garcha.

Bina yesko, frontend le `{"name":"Sita"}` pathayo bhane `req.body` **undefined** huncha. Express le raw bytes ma matra dincha. `express.json()` le tyo bytes lai parse garera JavaScript object banaaucha → `req.body = {name: "Sita"}`.

Tehi le sab POST/PUT controller ma `req.body` use garna milcha.

### 2. Custom — `authMiddleware`

`utils/auth.middleware.js`:

```js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // ↑ signature check automatic. Tampered/expired bhayo bhane error throw.
        req.user = decoded;   // {id, role} — controller ma access milcha
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
```

K garcha:
1. Header ma `Authorization: Bearer <token>` cha?
2. Token nikalcha
3. `jwt.verify` le secret le check — signature match bhayo bhane decode, navai bhane throw
4. `req.user = decoded` — controller ma `req.user.id`, `req.user.role` available
5. `next()` — controller chalna deu

Fail bhayeko har case ma 401 return → controller chalney mauka chhaina.

### 3. Custom — `adminOnly` (admin routes ko lagi)

```js
export const adminOnly = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
};
```

Yo `authMiddleware` **paachi** chalauchau — kina ki `req.user` chai authMiddleware ma set huncha. Order matters.

---

## Use kasari?

**Public route** — middleware chahidaina:

```js
Productrouter.get("/products", ProductController.getAllProducts);
```

**Login required (customer)** — `authMiddleware` matra:

```js
router.get("/me", authMiddleware, UserController.getProfile);
router.get("/cart", authMiddleware, CartController.getCart);
router.post("/orders", authMiddleware, OrderController.placeOrder);
```

**Admin only** — `authMiddleware` + `adminOnly`:

```js
router.post("/admin/products", authMiddleware, adminOnly, ProductController.create);
router.delete("/admin/products/:id", authMiddleware, adminOnly, ProductController.delete);
router.put("/admin/orders/:id/status", authMiddleware, adminOnly, OrderController.updateStatus);
```

Order important — pahile auth, tespachhi role.

---

## Multiple middleware — chain

Express ma jati middleware chahiyo line garna milcha:

```js
router.post(
    "/admin/products",
    authMiddleware,    // 1. token verify
    adminOnly,         // 2. role check
    validateProduct,   // 3. body validate (suppose)
    rateLimiter,       // 4. spam check
    ProductController.create   // 5. actual controller
);
```

Pahilo bata last samma — eutai fail bhayo bhane controller chaldaina.

---

## Global vs route-specific

**Global** — `app.use()` le sab route ma apply:

```js
app.use(express.json());   // sab routes ma body parse
```

**Route-specific** — single route ma matra:

```js
router.get("/me", authMiddleware, getProfile);   // yo route ma matra
```

Auth middleware **route-specific** rakhne kina ki public routes (products list) ma chai chaidaina.

---

## Ekdam common mistake — `next()` bhulnu

```js
const myMiddleware = (req, res, next) => {
    console.log("yo chalyo");
    // ❌ next() call gareko chhaina
};
```

Yo middleware chalcha tara `next()` chhaina → request **atkihalcha forever**. Frontend ma timeout error aaucha. Postman ma loading rotate garirahancha.

**Rule:** middleware ma **eitherways** `next()` call garne YA `res.status().json()` return garne. Dubai hudaina ekai chhuti hudaina.

---

## Real flow example — `GET /me` request aayo

1. Express le route match: `router.get("/me", authMiddleware, getProfile)`
2. **`express.json()`** chalcha (global) — body parse (yo route ma body chhaina, but middleware run huncha)
3. **`authMiddleware`** chalcha:
   - Header check ✅
   - `jwt.verify` ✅
   - `req.user = {id: "67abc", role: "CUSTOMER"}`
   - `next()`
4. **`getProfile` controller** chalcha:
   - `User.findById(req.user.id)`
   - `res.json(user)`
5. Response browser ma

Eutai step ma fail = saaro chain stop, error response.

---

## Middleware ko 3 super-power

1. **Reuse** — auth logic 20 controllers ma copy paste garnu pardaina, ek thau ma
2. **Separation** — controller le matra business logic dekhcha, auth/validation alag
3. **Composability** — chain garera complex flow simple banauney

---

## TL;DR

- **Middleware** = request paachi controller agi chalne function
- Signature: `(req, res, next) => {...}`
- `next()` call = pass, controller samma jana deu
- `res.status().json()` return = fail, yetai stop
- `express.json()` = built-in body parser
- `authMiddleware` = JWT verify garera `req.user` set garcha
- `adminOnly` = role check garcha (auth pachhi)
- Order matters: pahile auth, tespachhi role
- `next()` bhulnu hudaina — request atkihalcha
- Multiple middleware chain milcha

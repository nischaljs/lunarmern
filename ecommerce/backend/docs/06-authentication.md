# 06 — Authentication (Register, Login, JWT, bcrypt, Middleware)

Authentication = "kasari thaha pauney yo user kun ho?"

Yo project ma:
- `POST /register` — naya account
- `POST /login` — existing account ma login, JWT token return
- **Auth middleware** — protected routes (cart, orders, admin) ma token verify garcha
- **Role middleware** — admin-only routes ma `role: "ADMIN"` check garcha

---

## Problem 1 — Password kasari save garney?

Database ma password **plain text** ma save garyo bhane:

- DB hack bhayo bhane sabai password leak
- Admin (developer) le pani user ko password padhna sakcha — privacy gaye sakkyo

Solution: **bcrypt** library le password **hash** garne.

### Hash ko meaning

Hash = one-way function. "Hello123" lai mathematics le scramble garera yesto banauchha:

```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

Properties:

1. **One-way** — hash bata original password nikalna **mathematically asambhav**
2. **Same input = same hash**
3. **Salt** — bcrypt le random data add garcha so eutai password ko different users ma different hash huncha (rainbow table attack bata bachauchha)

### Code ma kasari?

`controllers/auth.controllers.js`:

```js
const hashedPassword = await bcrypt.hash(password, 10);
//                                       ^^^^^^^^ ^^
//                                       original  10 = "salt rounds" = strength
```

`10` standard cha. Higher = slower but more secure.

DB ma `hashedPassword` matra save huncha — original `password` kaile naai.

### Login ma verify kasari?

User le password type garyo. DB ma chai hash cha. Compare:

```js
const isMatch = await bcrypt.compare(password, existingUser.password);
//                            ^^^^^^^ ^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^
//                            method  user input DB ko hash
```

`bcrypt.compare` le internally tehi salt use garera input lai hash garcha, ani compare. Match bhayo bhane `true`, navai bhane `false`.

---

## Problem 2 — Login pachhi user lai kasari yaad rakhne?

User le login garyo. Aba 100 request pathauchha (homepage, profile, cart). Har request ma email-password halna padyo bhane bekar — UX kharab.

Solution: **JWT token**.

### JWT bhaneko k ho?

JWT = **JSON Web Token**. Login successful pachhi server le user lai eutai **special string** dincha. Tyo string ma user ko info encode bhako cha.

Token yesto dekhincha:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWJjMTIzIiwicm9sZSI6IkNVU1RPTUVSIn0.kP3hT8R...
   ────── HEADER ──────                ────── PAYLOAD ──────                          ── SIGNATURE ──
```

3 part `.` le separated:

1. **Header** — algorithm + token type
2. **Payload** — actual data (user ID, role, expiry)
3. **Signature** — server le secret key le sign gareko

> **Important:** Header ra Payload **encrypted haina** — base64 encoded matra. Online JWT decoder ma halera **anyone le** read garna sakcha. Tehi le **password** ya sensitive data JWT ma rakhne haina — matra user ID jasta non-secret data.

### Code ma kasari banauney?

```js
const token = jwt.sign(
    { id: existingUser._id, role: existingUser.role },  // payload
    process.env.JWT_SECRET,                              // secret key
    { expiresIn: "7d" }                                  // 7 din pachhi expire
);
```

Token user lai pathauchau. User le aafno phone/browser localStorage ma save garcha.

### Aglo request ma kasari use?

Frontend le har request ma token Header ma pathauchha:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Backend ma **auth middleware** le yo token verify garcha. Valid bhayo bhane `req.user` ma data set garcha, navai bhane 401 pathauchha.

---

## Sabai bhanda important question — User le JWT mimic garna sakdaina?

Ramro question. Sochnau hacker le aafnu lagi yesto fake token banauna khojyo:

```json
{ "id": "kunai-admin-id", "role": "ADMIN" }
```

base64 encode garera token banayo. Send garyo. **K hunchha?**

**401 Unauthorized**. Server le immediately reject garcha. Kasari?

### Signature ko jaadu

JWT ko third part — **signature** — yesto banincha:

```
signature = HMAC_SHA256(
    base64(header) + "." + base64(payload),
    JWT_SECRET                                ← yo server ma matra cha
)
```

Bhanya:
- Header + Payload lai milayera
- **Server ko secret key** sanga mathematics garera
- Eutai unique fingerprint banincha

### Verify garda k hunchha?

User le token pathayo:

```
[header].[payload].[signature]
```

Server le:

1. Header + Payload liyera **fheri signature compute garcha** (aafno secret le)
2. User le pathaeko signature sanga compare
3. Match? **Real token**, accept
4. Mismatch? **Forged token**, reject (401)

### Hacker le kina sakdaina banauna?

Hacker sanga **`JWT_SECRET` chhaina** (server ma matra cha, `.env` ma).

Hacker le:
- Header banauna sakcha ✅ (public info)
- Payload banauna sakcha ✅ (`{"id":"abc","role":"ADMIN"}` lekhna milcha)
- **Signature banauna sakdaina** ❌ — secret bina HMAC compute hudaina

Hacker le random signature lekhera pathayo bhane server le compute gardaa **different** aaucha → reject.

Hacker le secret guess garna khojyo bhane? `JWT_SECRET` 64+ random characters cha bhane brute force ma **billions of years** lagcha. Mathematically infeasible.

### Tehi le 2 cheez critical:

1. **`JWT_SECRET` long ra random huna parcha** (`abc123` rakhyo bhane gone — guess hunchha)
2. **`.env` Git ma kahile push garnu hudaina** (`.gitignore` ma rakhne) — push bhayo bhane secret leak, koi pani admin token banauna sakcha

### Token tampering example

Hacker le real user token liyo (`role: "CUSTOMER"`):

```
[header].[payload: id+CUSTOMER].[signature_for_CUSTOMER]
```

Aafno role badalna khojyo:

```
[header].[payload: id+ADMIN].[signature_for_CUSTOMER]  ← old signature
```

Server le re-compute garcha:
- Naya payload (ADMIN) sanga signature compute → completely different value
- User le pathaeko signature sanga match hudaina
- ❌ Reject

**Conclusion:** payload ko kunai 1 character pani change garyo bhane signature break huncha. Tehi le JWT lai "tamper-proof" bhanchhan.

---

## Auth middleware

Token verify garne kaam **har controller ma repeat garna parchaa** — repetitive. Tehi le **middleware** ma ek thau ma lekhincha, sab protected route ma reuse.

`utils/auth.middleware.js` (ya jasle banaeko cha):

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
        // ↑ yei le signature check garcha automatically. Fail bhayo bhane error throw.
        req.user = decoded;  // {id, role} aba next controller ma access milcha
        next();              // controller chalna deu
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
```

### `next()` ko meaning

Express ma middleware **chain** ma chalcha. `next()` call garyo bhane **next middleware/controller** chalna deu bhanya. Call gardaina bhane request **atkihalcha** — response pani jaadaina.

### Use kasari?

Routes ma:

```js
import { authMiddleware } from "../utils/auth.middleware.js";

router.get("/me", authMiddleware, UserController.getProfile);
//                ^^^^^^^^^^^^^^ pahile yo chalcha
//                                pass bhayo bhane matra controller chalcha
```

Token nadekhayo, ya tampered cha, ya expired — `authMiddleware` le 401 pathauchha. `getProfile` chalney **mauka pani naai**.

---

## Role middleware (admin-only routes)

Admin routes ma role pani check garna parcha. Tehi pattern:

```js
export const adminOnly = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
};
```

Use:

```js
router.post("/admin/products", authMiddleware, adminOnly, ProductController.createProduct);
//                              ^^^^^^^^^^^^^^ ^^^^^^^^^
//                              token verify   role check
```

Order matters — pahile auth (token decode), tespachhi role check (kina ki `req.user` chai authMiddleware ma set huncha).

---

## Status code ko meaning yo flow ma

| Code | Kahile |
|------|--------|
| 200 | Login success |
| 201 | Register success (naya user create bhayo) |
| 400 | Field missing (e.g., email diyena) |
| 401 | Token chhaina, ya invalid, ya expired (Unauthorized) |
| 403 | Token cha tara permission chhaina (Forbidden — e.g., customer le admin route hit garyo) |
| 409 | Conflict (email already exists) |
| 500 | Server error |

**401 vs 403** common confusion:
- 401 = "kun ho timi? prove gar" (token nadekhako ya invalid)
- 403 = "thaha cha kun ho timi tara timilai access chhaina" (token valid tara role chaidaina)

---

## Full register flow

1. Frontend bata POST: `{name, email, password}`
2. Backend check: sab field aayo?
3. DB ma email pahile cha? (`User.findOne({email})`)
4. Cha bhane 409 Conflict
5. Naai bhane password hash garcha
6. `User.create({name, email, password: hashedPassword})`
7. 201 sanga sanitized user (password chhaina) return

## Full login flow

1. POST: `{email, password}`
2. `User.findOne({email})`
3. Naai bhane 401 — message **generic**: "Invalid credentials" (kasailai "user not found" specific bhanya bhane hacker lai signal — yo email exists bhanera)
4. `bcrypt.compare(password, user.password)`
5. Match navai 401 (same generic message)
6. JWT token banaaune
7. 200 sanga `{token, user}` return

## Protected route flow (e.g., `GET /me`)

1. Frontend le request pathauchha header sanga: `Authorization: Bearer <token>`
2. Express le route match → middleware chain start
3. `authMiddleware`:
   - Header bata token nikalcha
   - `jwt.verify(token, JWT_SECRET)` chalauchha
   - Pass bhayo: `req.user = {id, role}`, `next()` call
   - Fail bhayo: 401 return
4. Controller chalcha — `req.user.id` use garera DB query
5. Response

## Admin route flow

1. Same as above
2. `authMiddleware` pass
3. `adminOnly` middleware: `req.user.role === "ADMIN"` check
4. Pass: `next()` → controller
5. Fail: 403 return

---

## Sanitize user kina?

`auth.controllers.js` ma:

```js
const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
});
```

User object ma password hash pani cha. Frontend lai pathauda **hash pani pathauney haina** (extra paranoid). `sanitizeUser` le matra safe field filter garcha.

---

## TL;DR

- **bcrypt** = password hash (one-way), DB ma plain password kaile naai
- **JWT** = login pachhi token jasle "ma yo user hoon" prove garcha
- JWT 3 part: header.payload.signature
- Header + payload = base64, anyone read garna sakcha (sensitive data nararakhne)
- **Signature = secret le banako fingerprint** — yo le tampering rokchha
- Hacker le payload badalna sakcha tara signature compute garna **secret chahincha** jun server ma matra cha
- **`JWT_SECRET` long random rakhne, `.env` Git ma push naagarne**
- Token Header ma pathauney: `Authorization: Bearer <token>`
- **authMiddleware** = token verify garera `req.user` set garcha
- **adminOnly middleware** = role check garcha (admin route ma)
- 401 = "prove gar kun ho", 403 = "thaha cha kun ho tara access chhaina"
- Login error message generic rakhne — "Invalid credentials"

Next: `07-flow-summary.md`

# 01 — Backend vs Frontend

Daraz kholda dekhincha:

- Products ko grid
- Search bar
- Add to cart button
- Login form

Yo sab ko **2 part** chha — frontend ra backend.

---

## Frontend = jun timi dekhchau

Browser ma jun cha — buttons, colors, images, animations. Sab frontend.

Tools: HTML, CSS, JavaScript. Framework chai React (yo MERN ko **R**).

Frontend ko kaam:
- Data dekhaune
- User input liyera button click handle garne
- Backend lai request pathaune
- Backend ko response dekhaune

Frontend **dumb** chha — yesko aafno data store chhaina. Sab data backend bata aaucha.

---

## Backend = jun timi dekhdaina

Server ma chalcha. User le dekhdaina, tara sab kaam yetai garcha:

- Database ma data save garne
- Password check garne (login)
- Order place garne
- Admin le products add garda save garne

Tools: Node.js (yo MERN ko **N**), Express.js (yo MERN ko **E**), MongoDB (yo MERN ko **M**).

---

## Real example — Daraz ma login garda

1. **Frontend** — login form dekhayo, email + password type garchau, "Login" click
2. **Frontend** → **Backend** — request pathayo: "yo email yo password ho, check gar"
3. **Backend** — database ma yo email khojyo, password match garyo
4. **Backend** → **Frontend** — response: "thik cha, yo token le"
5. **Frontend** — token save garyo, homepage ma redirect

Frontend matra hunthyo bhane password kaha save hunthyo? Aru users le timro password kasari herthe? Backend bina **multi-user app** banaaunai sakidaina.

---

## Tehi le bhanchhan "MERN stack"

| Letter | Tool | K ho |
|--------|------|------|
| **M** | MongoDB | Database (data store hune thau) |
| **E** | Express | Backend framework (Node ko upar) |
| **R** | React | Frontend framework |
| **N** | Node.js | Backend ma JavaScript chalauney runtime |

Yo project ma timi **M, E, N** banauchau. React (frontend) alag folder ma huncha.

---

## Yo backend le k garcha?

E-commerce app ho. Sochnau Daraz ko mini version. Yo backend le yo handle garcha:

- Users register/login (email + password)
- Products list garne, single product herna milne
- Categories
- (Future) Cart, orders, admin panel

Frontend chai yo backend ko response use garera UI banauchha.

---

## TL;DR

- **Frontend** = browser ma dekhne (React, HTML, CSS)
- **Backend** = server ma chalne, data ra logic handle garne (Node + Express)
- **Database** = data store hune thau (MongoDB)
- Frontend le backend lai HTTP request pathauchha, backend le response dincha
- Yo project = MERN ko **MEN** part (backend)

Next: `02-node-express-mongoose.md`

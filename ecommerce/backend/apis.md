# Ecommerce APIs

Simple ecommerce backend — public storefront + customer accounts + admin panel.

Auth: JWT in `Authorization: Bearer <token>` header.
Roles: `CUSTOMER` (default), `ADMIN`.

Legend: 🌐 public · 👤 customer (logged in) · 🛡️ admin only
Status: ✅ done · ❌ not implemented

---

## Public — Storefront

| Status | Method | Path                              | Auth | Purpose                                  |
| ------ | ------ | --------------------------------- | ---- | ---------------------------------------- |
| ✅     | GET    | `/products`                       | 🌐   | All products (pagination ❌ not yet)     |
|      | GET    | `/products/featured`              | 🌐   | Featured products for landing page       |
| ❌     | GET    | `/categories`                     | 🌐   | All categories (landing + nav)           |
| ✅     | GET    | `/products`                       | 🌐   | All products (pagination ❌ not yet)     |
| ❌     | GET    | `/products/search?q=`             | 🌐   | Search by name/description               |
| ❌     | GET    | `/products?category=:categoryId`  | 🌐   | Filter products by category              |
| ✅     | GET    | `/products/:id`                   | 🌐   | Single product detail                    |

---

## Auth

| Status | Method | Path        | Auth | Purpose                          |
| ------ | ------ | ----------- | ---- | -------------------------------- |
| ✅     | POST   | `/register` | 🌐   | Create customer account          |
| ✅     | POST   | `/login`    | 🌐   | Login, returns JWT + user info   |

---

## Customer — Profile, Cart, Orders

| Status | Method | Path              | Auth | Purpose                                        |
| ------ | ------ | ----------------- | ---- | ---------------------------------------------- |
| ❌     | GET    | `/me`             | 👤   | Get logged-in user profile                     |
| ❌     | PUT    | `/me`             | 👤   | Update profile (name, etc.)                    |
| ❌     | GET    | `/cart`           | 👤   | Get current cart                               |
| ❌     | POST   | `/cart`           | 👤   | Add item to cart (`productId`, `qty`)          |
| ❌     | PUT    | `/cart/:itemId`   | 👤   | Update item quantity                           |
| ❌     | DELETE | `/cart/:itemId`   | 👤   | Remove item from cart                          |
| ❌     | POST   | `/orders`         | 👤   | Place order from current cart                  |
| ❌     | GET    | `/orders`         | 👤   | List own order history                         |
| ❌     | GET    | `/orders/:id`     | 👤   | Single order detail (own orders only)          |

---

## Admin

Admin user is seeded by default (e.g. via env-driven script on first boot).
All admin routes require a valid JWT with `role: "ADMIN"`.

### Categories

| Status | Method | Path                    | Auth | Purpose             |
| ------ | ------ | ----------------------- | ---- | ------------------- |
| ❌     | POST   | `/admin/categories`     | 🛡️   | Create category     |
| ❌     | PUT    | `/admin/categories/:id` | 🛡️   | Update category     |
| ❌     | DELETE | `/admin/categories/:id` | 🛡️   | Delete category     |

### Products

| Status | Method | Path                    | Auth | Purpose                                  |
| ------ | ------ | ----------------------- | ---- | ---------------------------------------- |
| ❌     | POST   | `/admin/products`       | 🛡️   | Create product (with featured + images)  |
| ❌     | PUT    | `/admin/products/:id`   | 🛡️   | Update product                           |
| ❌     | DELETE | `/admin/products/:id`   | 🛡️   | Delete product                           |

### Orders

| Status | Method | Path                        | Auth | Purpose                                                     |
| ------ | ------ | --------------------------- | ---- | ----------------------------------------------------------- |
| ❌     | GET    | `/admin/orders`             | 🛡️   | List all orders (filterable by status)                      |
| ❌     | GET    | `/admin/orders/:id`         | 🛡️   | Single order detail                                         |
| ❌     | PUT    | `/admin/orders/:id/status`  | 🛡️   | Update order status (pending → shipped → delivered, etc.)   |

---

## Order status values

`pending` · `paid` · `shipped` · `delivered` · `cancelled`

---

## Standard response shapes

Success:
```json
{ "message": "...", "data": { ... } }
```

Error:
```json
{ "message": "Human-readable error" }
```

Paginated list:
```json
{ "data": [ ... ], "page": 1, "limit": 20, "total": 134 }
```

---

## Progress

- **Done:** 4 / 24 endpoints (`POST /register`, `POST /login`, `GET /products`, `GET /products/:id`)
- **Remaining:** 20 endpoints — most of customer + admin surface, plus storefront filters/search/featured.

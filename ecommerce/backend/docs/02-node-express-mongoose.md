# 02 — Node.js, Express, MongoDB, Mongoose

Yo char shabda yo project ko har file ma aaucha. Bujhna jaruri chha.

---

## Node.js

JavaScript browser ma chalcha — yo timilai thaha cha. Tara JavaScript le **server** ma pani chalna sakcha — Node.js ko karan le.

**Node.js = JavaScript ko runtime, browser bahira.**

Pahile (2009 agi):
- JavaScript = browser matra
- Server = PHP, Java, Python use garnu parthyo

Aile:
- Frontend = JavaScript (React)
- Backend = JavaScript (Node)
- Eutai bhasha dubai side ma. Easy.

### Real check
Terminal ma yo run gar:

```bash
node -v
```

Version dekhayo bhane Node installed cha. Yei le `index.js` chalauchha.

---

## Express.js

Plain Node ma server banauna ekdam verbose chha — har kura aafai handle garnu parcha (routing, parsing, headers).

**Express = Node mathi ko framework jasle yo sab easy banauchha.**

Express bina:
```js
// 30+ lines of raw Node code just to handle one route
```

Express sanga:
```js
app.get("/products", (req, res) => {
  res.json(products);
});
```

Eutai line. Yei le saara backend developers Express use garchhan.

`package.json` ma cha:
```json
"express": "^5.2.1"
```

---

## MongoDB

Database. Tara SQL bhanda farak — **NoSQL** bhanchhan.

### SQL vs NoSQL — choto ma

**SQL (MySQL, Postgres):**
- Data tables ma rows-columns ma raakhincha (Excel jasto)
- Schema strict — column define garnu parcha pahile

**NoSQL (MongoDB):**
- Data **JSON-like documents** ma raakhincha
- Schema flexible

MongoDB ma eutai product yesto dekhincha:

```json
{
  "_id": "67abc123...",
  "name": "iPhone 15",
  "Saleprice": 120000,
  "category": "67xyz...",
  "isfeaturedProduct": true
}
```

Bilkul JavaScript object jasto. Tehi le Node sanga match. Eutai data structure dubai side ma.

### Vocab

- **Database** — pura store (`ecommerce_db`)
- **Collection** — table jasto (`products`, `users`, `categories`)
- **Document** — eutai row jasto (eutai product)

---

## Mongoose

MongoDB sanga directly kura garna ekdam manual chha. **Mongoose** = MongoDB sanga kura garne JavaScript library.

Mongoose le 2 thik kaam garcha:

1. **Schema** — define garna milcha "product ma yo yo field huna parcha"
2. **Validation** — galat data save huna dindaina

Mongoose bina:
```js
db.collection("products").insertOne({ nm: "phone" }); // typo "nm" — DB ma garbage
```

Mongoose sanga:
```js
const Product = mongoose.model("Product", schema);
await Product.create({ nm: "phone" }); // ❌ error — "nm" schema ma chhaina
```

Yei le schema enforce hunchha. Yo project ko `models/` folder ma sab Mongoose schemas chha.

---

## Yo 4 ko relation

```
[Browser/Postman]
      ↓ HTTP request
[Express] ← Node.js ma chalcha
      ↓ Mongoose query
[MongoDB] ← data yei ma cha
      ↓ data return
[Express] ← response banauchha
      ↓ HTTP response
[Browser/Postman]
```

Yo flow yaad rakhnu — backend ko har request yei ma chalcha.

---

## TL;DR

- **Node.js** = JavaScript server ma chalauney runtime
- **Express** = Node mathi ko framework, route/server easy banauchha
- **MongoDB** = NoSQL database, JSON-like documents store garcha
- **Mongoose** = MongoDB sanga kura garne JS library, schema validation dincha

Next: `03-project-structure.md`

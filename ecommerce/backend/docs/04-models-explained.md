# 04 — Models (data ko shape)

Models = Mongoose ma schema define garne file. "Yesto data matra save garna milcha" bhanne rule.

Yo project ma 4 models chha:

- `user.model.js` — register/login huney users
- `product.model.js` — products ko detail
- `category.model.js` — product categories
- `order.models.js` — user le order place gareko

---

## Schema bhaneko k ho?

Real life — Form fill garda each field ko rule huncha:

- Name = required, text matra
- Email = required, unique (sabai ko different)
- Phone = 10 digit number

Yei rule lai code ma lekheko = **schema**.

Eutai example — `user.model.js`:

```js
const userSchema = new mongoose.Schema({
    name:    { type: String, required: true },
    email:   { type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role:    { type: String, enum: ["ADMIN","CUSTOMER"], default: "CUSTOMER" }
}, { timestamps: true });
```

Translate:

- `name` — string huna parcha, **must** dinu parcha
- `email` — string, must, **unique** (eutai email le 2 account banauna paidaina)
- `password` — string, must
- `role` — `"ADMIN"` ya `"CUSTOMER"` matra (`enum` = limited choices), default `"CUSTOMER"`
- `timestamps: true` — `createdAt` ra `updatedAt` field auto add huncha

---

## Schema field options

| Option | K garcha | Example |
|--------|----------|---------|
| `type` | Data type | `String`, `Number`, `Boolean`, `Date` |
| `required` | Diyena bhane error | `required: true` |
| `unique` | Duplicate huna paidaina | `unique: true` |
| `default` | Diyena bhane yo value | `default: "CUSTOMER"` |
| `enum` | Yei list bata matra | `enum: ["A", "B"]` |
| `ref` | Aru collection sanga link | `ref: "User"` |

---

## Relationships — `ref` ko kaam

E-commerce ma:

- Eutai product **eutai category** ma parcha
- Eutai order ma **user** ra **products** dubai cha

Yo relationships kasari handle? **ObjectId reference**.

`product.model.js` ma:

```js
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
}
```

Translate:

- `category` field ma full category data save hudaina
- Matra **category ko `_id`** save huncha (MongoDB le auto generate garney unique ID)
- `ref: "Category"` = "yo ID `Category` collection ko ho"

Bhayo k bhane data **duplicate hudaina**. Category ko name change garyo bhane sab products ma propagate huncha kina ki ID matra cha — actual data ek thau ma matra.

### Pachhi data nikalda?

```js
const product = await Product.findById(id).populate("category");
```

`.populate("category")` le ID lai actual category object ma badalcha.

---

## Yo project ka models — choto ma

### 1. User
- Register/login ma use
- Role: ADMIN ya CUSTOMER
- Password hash garera save huncha (raw password kaile pani naai)

### 2. Product
- Name, description, price, discount, images
- Category sanga linked
- `isfeaturedProduct` boolean — homepage ma dekhauney

### 3. Category
- Name, description, image, color
- Product le yei lai reference garcha

### 4. Order
- Kun user le ko order garyo (`user` ref)
- Kun-kun products, kati-kati quantity (`products` array)
- Total amount, status (pending/paid/shipped/delivered/cancelled), location

---

## Mongoose model banayepachi k garna milcha?

```js
const User = mongoose.model("User", userSchema);
```

Yo `User` le yo methods dincha:

| Method | K garcha |
|--------|----------|
| `User.create({...})` | Naya user banauchha |
| `User.find()` | Sab users return garcha |
| `User.findOne({email})` | Eutai matra return |
| `User.findById(id)` | ID le khojcha |
| `User.findByIdAndUpdate(id, {...})` | Update |
| `User.findByIdAndDelete(id)` | Delete |

Yei methods controller ma use bhako cha.

---

## TL;DR

- Model = data ko shape define garne file
- Schema = field haru ra unko rules
- `required`, `unique`, `default`, `enum` — common options
- `ref` = aru collection sanga link (ID matra save)
- `.populate()` = ID lai actual data ma badalcha
- Model banayepachi `.create()`, `.find()`, `.findById()` etc methods milcha

Next: `05-routes-controllers.md`

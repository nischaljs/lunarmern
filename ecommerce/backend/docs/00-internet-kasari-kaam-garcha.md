# 00 — Internet kasari kaam garcha?

Yo file ma code chhaina. Tara backend ko **foundation** yei ho. Yo skip garyo bhane pachhi sab confusion hunchha.

---

## Part 1 — YouTube kholda actually k hunchha?

Tyo `youtube.com` type garera enter dabauda — backstage ma yo bhayo:

1. Timro computer le YouTube ko computer lai **request** pathayo: "bhai homepage de"
2. YouTube ko computer le **response** pathayo: HTML, CSS, JS, thumbnails — sab
3. Browser le tyo content screen ma render garyo

Bas. Internet eyei ho. 4 shabda yaad rakh:

- **Client** = request pathaune (timro computer)
- **Server** = response dine (YouTube ko computer)
- **Request** = "yo de" bhanera magna
- **Response** = "le" bhanera dine

Yo char shabda backend ko sara bhasha ho.

---

## Part 2 — Server bhaneko k ho?

Server bhaneko **special computer** haina. Timro laptop jasto computer nai ho. Farak matra:

- Timro laptop **off hunchha** rati
- Server **24/7 on** hunchha — tehi le rati 3 baje pani Insta scroll garna milcha

Server haru AC vala godam (data center) ma huncha — Amazon, Google, Microsoft jasta company ko.

**"Hosting"** bhaneko: kasai ko 24/7 chalne computer ma timro app rakhne. Aphnai laptop ma backend chalauda laptop band garyo bhane app pani band — tehi le AWS, Vercel, Render jasta service use garchau.

---

## Part 3 — Address kasari thaha hunchha? (IP + DNS)

Saathi lai chitthi pathauda address chahincha — "Baneshwor, ghar no 14". Computer ko address = **IP address**.

```
142.250.182.46
```

Yo Google ko ho.

### Tara `youtube.com` ramro lagcha hoina, numbers haina?

Sahi. Manchhe le numbers yaad rakhna gahro. Tehi le **DNS** chha — internet ko phonebook.

Process:

1. `youtube.com` type garis
2. Browser le DNS lai sodhyo: "yesko IP k?"
3. DNS le `142.250.182.46` diyo
4. Browser le tyo IP ma request pathayo
5. Response aayo

Sab ek second bhitra. Computer fast cha.

---

## Part 4 — HTTP — chitthi ko bhasha

Saathi lai chitthi pathauda dui jana le **eutai bhasha** bujhnu paryo. Computer haru ko common bhasha = **HTTP** (HyperText Transfer Protocol).

Protocol = **rules ko set**. Chitthi ma "Pyaro saathi" lekher start, "Tyahi bhayera" lekher end — eutai format. Computer haru pani format follow garchhan.

### Eutai HTTP request yesto cha:

```
GET /watch?v=abc123 HTTP/1.1
Host: youtube.com
```

Translate: "youtube.com, malai `/watch?v=abc123` page de."

Response:

```
HTTP/1.1 200 OK
Content-Type: text/html

<html>...</html>
```

Translate: "le, 200 (success), HTML cha."

### HTTP methods — request ko type

| Method | K garcha | Real example |
|--------|----------|--------------|
| **GET** | data magcha | video herda |
| **POST** | naya data pathauchha | comment garda |
| **PUT** | purano lai puurai badalcha | profile photo change |
| **PATCH** | thorai update | username matra change |
| **DELETE** | hatauchha | video delete |

Yo project ma `getAllProducts` = GET, `Register` = POST. Yei ho.

### Status codes — server le k bhanyo

3 digit number jun response sanga aaucha:

- **2xx** — sab theek (200 OK, 201 Created)
- **3xx** — aru thau ma jaa (301 Moved)
- **4xx** — **timle** galti garyo (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx** — **server le** galti garyo (500 Internal Server Error)

"404 Not Found" dekheko cha hola — tyo URL server ma chhaina bhanya.

---

## Part 5 — TCP vs UDP

HTTP upar ko layer ma cha. Tala **TCP** chha jas le actually packets pathauchha. UDP pani cha. Farak:

### TCP — reliable

Registered post jasto. Pugyo ki pugena check garcha. Pugena bhane fheri pathauchha. Order maintain garcha (1, 2, 3, 4 — random haina).

- Slightly slow tara reliable
- HTTP, email, file download — sab TCP
- Bank app ma "5000 pathayo" bhanya **pakka** "5000 pugyo" huna paryo — tyo TCP nai chahincha

### UDP — fast

Video call jasto. Frame haraye chhad — agi badi 31st frame de chhito. Speed > reliability.

- Fast tara unreliable
- Zoom, PUBG, live stream — sab UDP

### Yo project ma?

TCP. HTTP TCP mathi chalcha. UDP yo project ma chhaina — future ma video calling banauchau bhane tehi bela hernu.

---

## Part 6 — Port

Timro ghar ma 4 jana basne tara address ek matra. Kun jana ko lagi chitthi? Naam lekhincha.

Computer ma tehi cha. Eutai computer ma:

- Database chalcha
- Web server chalcha
- Email server chalcha

IP ek nai cha. Kun service ko lagi request? **Port** number le batauchha.

```
youtube.com:443
```

`443` = port. HTTPS ko default. Browser le hide garcha matrai.

### Yo project ma

`index.js` ma cha:

```js
const PORT = process.env.PORT;
app.listen(PORT, () => {...});
```

`.env` ma `PORT=3000` cha. Browser ma `http://localhost:3000/products` halyo bhane Express server le response dincha.

**`localhost`** = aphnai computer. "Bahira nakhojra mero own computer ko port 3000 ma jaa" bhaneko.

Common ports:

- `80` — HTTP
- `443` — HTTPS
- `3000` — Node dev
- `27017` — MongoDB
- `5432` — PostgreSQL

---

## Part 7 — HTTPS — `S` ko meaning

URL agi padlock 🔒 dekhya cha hola. Tyo **HTTPS**. `S` = Secure.

- **HTTP** ma chitthi **plain text** ma jancha. Wifi admin, hacker le padhna sakcha. Password halera login garda HTTP use garyo bhane gaye sakkyo.
- **HTTPS** ma chitthi **encrypted** huncha. Beech ma kasai le padhna sakdaina.

Local dev ma HTTP chalcha (aphnai laptop ma matra cha). Production ma HTTPS auto — hosting service le handle garcha.

---

## TL;DR

- Internet = client le server lai request, server le response
- IP = computer ko address (numbers)
- DNS = naam lai IP ma convert garne phonebook
- HTTP = computer haru ko common bhasha
- Methods: GET, POST, PUT, PATCH, DELETE
- Status: 2xx good, 4xx timro galti, 5xx server galti
- TCP = reliable (HTTP, files), UDP = fast (video, games)
- Port = eutai IP ma kun service
- HTTPS = encrypted HTTP

Next: `01-backend-vs-frontend.md`

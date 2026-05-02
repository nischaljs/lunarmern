# 09 — TCP, UDP, HTTP, Sockets — basics

Yo file ma **k use bhako cha kahile** bhanne bujhne. No code, pure concept.

---

## Layer ko picture

Internet ma data pathauda **layers** chha. Pizza jasto — top ma cheese (HTTP), tala dough (TCP/UDP), saaro bottom plate (IP).

```
┌─────────────────────────────────┐
│  HTTP / WebSocket               │  ← Application layer (k pathauney)
├─────────────────────────────────┤
│  TCP / UDP                      │  ← Transport layer (kasari pathauney)
├─────────────────────────────────┤
│  IP                             │  ← Network layer (kun address ma)
└─────────────────────────────────┘
```

Aau ekek garera.

---

## TCP — reliable delivery

**Full form:** Transmission Control Protocol.

Registered post jasto. Postman le receipt magcha — pugyo ki nai check garcha. Pugena bhane fheri pathauchha.

### Properties

- **Connection-based** — pahile "handshake" hunchha (3-way) — "ma cha?", "cha", "thik cha shuru garaau"
- **Reliable** — pathaeko packet pugyo ki nai server le confirm dincha. Pugena bhane re-send
- **Ordered** — packet 1, 2, 3, 4 same order ma deliver. 4 pahile aayo bhane wait garcha 1, 2, 3 ko
- **Error checked** — corrupt bhayo bhane re-send

### Cost

- Slightly slow (handshake + acknowledgments)
- Bandwidth thorai bedi use (extra control packets)

### Kahile use?

- Web (HTTP, HTTPS)
- File download
- Email
- Banking — transaction lost garna paidaina
- Database connection

**Yo backend project: TCP nai use cha** (HTTP TCP mathi chalcha).

---

## UDP — fast delivery, no checks

**Full form:** User Datagram Protocol.

Letter drop box ma chitthi haaleko jasto. Bas drop garyo. Pugyo ki nai postman thaha pauney mauka chhaina. Receipt chhaina.

### Properties

- **Connectionless** — handshake chhaina, direct pathaucha
- **Unreliable** — packet pugyo ki nai check chhaina. Lost bhayo bhane lost
- **Unordered** — 4 pahile, 2 pacchi aauna sakcha
- **No error recovery** — corrupt bhayo bhane fheri pathauney mechanism chhaina

### Benefit

- **Tej** — overhead chhaina
- **Light** — bandwidth kam

### Kahile use?

- Video calls (Zoom, Meet, WhatsApp call) — frame haraye chad, agi badhau
- Live streaming (Twitch, YouTube Live)
- Online games (PUBG, Fortnite, Free Fire) — position update tej chahincha
- DNS lookups — single small request

**Yo backend project ma UDP chhaina.** E-commerce reliable chahincha — order pugena bhane gone.

---

## TCP vs UDP — yek table ma

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Yes (handshake) | No |
| Reliability | Guaranteed delivery | Best effort |
| Order | Maintained | Not guaranteed |
| Speed | Slower | Faster |
| Use case | Web, files, banking | Video, games, voice |
| Project ma? | ✅ (HTTP via TCP) | ❌ |

---

## HTTP — application layer ko king

**Full form:** HyperText Transfer Protocol.

Web ko bhasha. **TCP mathi** chalcha (mostly).

### Request-response model

Strict pattern:

1. Client le request pathauchha
2. Server le response dincha
3. Connection close

Eitehre kaam **client le shuru garna paryo**. Server **aafai bata** client lai message pathauna sakdaina (notification jasto).

### Stateless

Har request **alag** ho. Server le pahile ko request **yaad rakhdaina**. Tehi le **JWT token** har request ma pathauna parcha — kun user ho thaha pauna.

### HTTP versions choto ma

- **HTTP/1.0** (1996) — har request ma naya TCP connection. Slow
- **HTTP/1.1** (1997) — connection reuse (keep-alive)
- **HTTP/2** (2015) — eutai connection ma multiple parallel requests, binary
- **HTTP/3** (2022) — TCP haina, **QUIC** (UDP based) le chalauchha. Faster on bad networks

Yo project ma Express le HTTP/1.1 default ma chalauchha. Production reverse proxy (Nginx) le HTTP/2 add garcha.

### Use case

- REST APIs (yo project!)
- Webpages
- File serving
- 95% of regular web traffic

---

## WebSocket — real-time 2-way

HTTP ko problem: **server le client lai aafai notify garna sakdaina**. Chat app banauna paryo bhane?

**Solution: WebSockets.**

### K cha?

- TCP mathi chalne **persistent connection**
- Eutai pole open garera **2-way** message pathauney milcha
- Server le client lai jaile pani message pathauna sakcha
- Client le pani server lai

### Real-life kahile?

- Chat apps (WhatsApp web, Discord)
- Live notifications (Facebook bell icon)
- Multiplayer games (real-time moves)
- Stock prices, crypto prices live update
- Collaborative tools (Google Docs — 2 jana le ekai sath edit)
- Live sports score

### HTTP vs WebSocket

| HTTP | WebSocket |
|------|-----------|
| Request → response → close | Connection open, dubai side message pathau |
| Client le matra start garna sakcha | Dubai le anytime message pathauna sakcha |
| Stateless | Stateful (connection live) |
| REST API | Real-time apps |

### Yo project ma cha?

**Chhaina.** E-commerce ma real-time critical haina. Tara future ma:
- Order tracking live update — WebSocket use garna sakincha
- Admin notification "naya order aayo" — WebSocket
- Live chat support — WebSocket

Library: **Socket.IO** popular cha (yo `ws` ko upar built, easy use).

---

## Socket bhanne shabda ko 2 meaning

Confusion hunchha — alag rakhne:

### 1. Network socket (low-level)

Operating system ma **endpoint** — IP + Port ko combination. Kunai pani network connection (TCP ya UDP) ko lagi chahincha.

```
192.168.1.10:3000 ← yo eutai socket
```

Backend developer le directly handle gardaina — Node/Express le wrap garcha.

### 2. WebSocket (high-level)

Application protocol — browser ra server bich ma persistent 2-way connection. Mathi explain gareko.

Bhanne thau ma "socket" matra bhanyo bhane usually **WebSocket** ko meaning ho aaijhakal.

---

## Yo project sanga relation — k k use bhayo cha

```
[Browser]
   │
   │  HTTP/1.1 request
   │  (TCP mathi)
   │
   │  Authorization: Bearer <JWT>
   │
   ▼
[Express server — Node.js]
   │
   │  TCP (Mongoose driver)
   │
   ▼
[MongoDB]
```

**Used:** TCP, HTTP
**Not used:** UDP, WebSocket

---

## Kahile k chahincha — quick decision

| Need | Use |
|------|-----|
| REST API banauna (CRUD) | **HTTP** |
| File upload/download | HTTP (TCP) |
| Live chat, notifications | **WebSocket** |
| Video/voice call | **UDP** (WebRTC le manage) |
| Online game (real-time positions) | **UDP** + WebSocket sometimes |
| DNS lookup | UDP |
| Stock price feed | WebSocket |

---

## TL;DR

- **TCP** = reliable, slow, ordered (web, files, banking) — yo project use cha
- **UDP** = fast, unreliable, unordered (video, games, voice)
- **HTTP** = TCP mathi, request/response, stateless, web ko king (yo project use cha)
- **WebSocket** = persistent 2-way connection, real-time apps (chat, live updates)
- **Socket** = OS level endpoint (low) ya WebSocket (high) — context le bujhne
- E-commerce backend = HTTP + TCP enough. Future ma live notifications add garda WebSocket

Next: code files herna shuru gar — har file ko upar yo doc se kura comment ma cha.

# 10 — Deployment (laptop bata internet samma)

Ahile timro app **localhost** ma chalcha. Postman ma `http://localhost:3000/products` halnu bhayo bhane data aaucha. Tara saathi lai link share garyo bhane chaldaina — kina ki **timro laptop** ma matra cha, ra timro laptop **internet ma exposed chhaina**.

Aba kasari sabai le use garna milne banauney? Tehi **deployment** ho.

---

## Sabai bhanda pahile — server bhaneko k ho?

Server eutai **special magical computer** haina. **Tyo pani timro laptop jastai computer ho**. Inside ma:

- CPU (processor)
- RAM
- Storage (SSD)
- Operating System (mostly Linux — Ubuntu)
- Network card (internet ma jodaako)

Farak matra:
- **24/7 on** (off hudaina kahile pani)
- **Public IP address** cha (internet bata anyone le pugna sakcha)
- **Big company ko data center** ma cha (AWS, Google, Microsoft)
- Powerful — tara essence ma **same hardware** components

Tehi le sochnau timro laptop lai 24/7 chalauney hisaab ko banayo, public IP diyo bhane **tyo nai server ho**. Bas.

---

## SSH — server lai control kasari?

Server kahai ta cha — Amazon ko data center ma. Timi Kathmandu ma. Server ma **command kasari run garney**?

**SSH** = Secure Shell. Internet bata server ko terminal ma access dincha.

Sochnau ekdam basic example: phone ma TeamViewer use garera saathi ko computer control garyo — tehi nai. SSH yei ko **terminal version** ho. UI chhaina, terminal matra.

### Kasari kaam garcha?

1. Server banauda hosting service le timilai eutai **key file** dincha (`.pem` ya `.ssh` key)
2. Aphno terminal ma command:
   ```
   ssh -i my-key.pem ubuntu@13.234.56.78
   ```
   - `ssh` = command
   - `-i my-key.pem` = key file (password jasto)
   - `ubuntu` = username server ma
   - `13.234.56.78` = server ko IP
3. Connect bhayo. Aba timro terminal **server ko terminal jasto** chha. Jun command type garyo, tyo **server ma chalcha**, timro laptop ma haina.

Server ma `ls` garyo? Server ko files. `node index.js` chalayo? Server ma backend chalcha.

### Kina secure?

Key file le authenticate garcha. Key bina anyone le SSH garna saakdaina. Password bata pani SSH milcha tara key way bedi safe (password guess huncha, key file 4096 random characters).

---

## Aba — actual deployment ko 3 part

E-commerce app ko 3 piece chha:

1. **Database** (MongoDB)
2. **Backend** (Node + Express — yo project)
3. **Frontend** (React)

Teen ko **alag-alag** deploy hunchha. Aau ekek garera.

---

## Part 1 — Database deploy (MongoDB Atlas)

Database aphnai server ma install garna milcha tara — backup, security, scaling sab aafai handle garna parcha. Headache.

**Solution: MongoDB Atlas** — MongoDB company ko cloud database service. Free tier cha (512 MB storage — small project ko lagi enough).

### Process (overview):

1. atlas.mongodb.com ma account banaune
2. **Cluster** create garne (free tier) — region select (Singapore close to Nepal)
3. Database user banaune (username + password)
4. **Network access** ma "anywhere" allow (production ma specific IP matra)
5. **Connection string** copy:
   ```
   mongodb+srv://user:pass@cluster0.abc.mongodb.net/ecommerce
   ```
6. Yo string `.env` ma `MONGODB_URI` ma haalne
7. Backend deploy garda yo `.env` value set garne

Bas. Code ma kunai change chahidaina — `dbconnect.js` ma jun URI cha tyei use huncha. Local ma localhost MongoDB, production ma Atlas.

---

## Part 2 — Backend deploy

Backend deploy ko **dui main approach** cha:

### Approach A — Traditional (EC2 jasto VPS)

**EC2** = Amazon ko **virtual server**. Full form: Elastic Compute Cloud.

"Virtual server" bhaneko k? Amazon ko thulo data center ma physical computer cha — tyo computer ko portion **slice** garera timilai dincha. Software le partition garcha. Dekhna ma tyo timro full computer jasto chha tara actually thulo computer ko slice.

**Process:**

1. AWS account banaune
2. EC2 dashboard ma "Launch Instance"
3. Configure:
   - **AMI** (Operating System) — Ubuntu 22.04 select
   - **Instance type** — `t2.micro` (free tier)
   - **Key pair** create — `.pem` file download (yei sanga SSH garchau)
   - **Security group** — port 22 (SSH), 80 (HTTP), 443 (HTTPS) open
4. Launch — server ready 1 minute ma. Public IP milcha
5. SSH garera connect:
   ```
   ssh -i my-key.pem ubuntu@<public-ip>
   ```
6. Server ma:
   - Node.js install
   - Git clone garera code download
   - `npm install`
   - `.env` file banaune (MongoDB URI, JWT secret)
   - `node index.js` ya better — **PM2** use garera 24/7 chalauney
7. Browser ma `http://<public-ip>:3000/products` — works!

### PM2 ko meaning

`node index.js` direct chalauda — terminal close garyo bhane process band. SSH bata logout garyo bhane app band.

**PM2** = Node process manager. Background ma chalauchha, crash bhayo bhane auto restart, server reboot ma auto start. Production ma must.

```
pm2 start index.js --name backend
pm2 save
pm2 startup
```

### Cost

EC2 free tier 12 mahina free (`t2.micro`), tespachhi paisa lagcha (small project ko lagi $5-10/month).

### Approach B — PaaS (Render, Railway, Fly.io)

EC2 ma sab kura aafai setup garna parcha — Linux command, PM2, security. Beginners ko lagi headache.

**Solution: Platform-as-a-Service** like:
- **Render** — free tier cha, easy
- **Railway** — easy, charge after free
- **Fly.io** — global edge

Process:

1. GitHub ma code push
2. Render ma account banaune
3. "New Web Service" → GitHub repo connect
4. Build command (`npm install`), start command (`node index.js`)
5. Environment variables (MongoDB URI, JWT secret) UI bata add
6. Deploy click
7. Render le auto build, deploy, public URL dincha (`https://your-app.onrender.com`)

**Code change** garera Git push garyo bhane Render le auto re-deploy garcha. Magic.

Beginner ko lagi **Render best**. EC2 sikh future ma when serious project.

---

## Part 3 — Frontend deploy (Vercel — free, easy)

React app build garda **static files** banchhan — HTML, CSS, JS. Yo files lai serve garne special server chahidaina, kunai pani simple file server le pugcha.

**Vercel** = static frontend host garne best tool. **Free**. Beginner-friendly.

### Process:

1. GitHub ma React code push
2. vercel.com ma account banaune (GitHub login)
3. "Import Project" → repo select
4. Vercel le auto detect garcha React/Next.js, build settings
5. Environment variables add (e.g., `VITE_API_URL=https://your-backend.onrender.com`)
6. Deploy click
7. 1 minute pachhi public URL (`https://your-app.vercel.app`)

Code push garyo Git ma → auto re-deploy. Yo nai magic.

### Vercel kasari free dincha?

Vercel **CDN** (Content Delivery Network) use garcha — static files duniya bhar ka servers ma cache garcha. User Nepal bata aayo bhane Singapore server bata serve, US bata aayo bhane US server bata. Bandwidth low, cost low, free dina milcha.

### Alternatives

- **Netlify** — Vercel jastai
- **Cloudflare Pages** — fastest CDN
- **GitHub Pages** — basic, free, static matra

---

## Serverless architecture — k ho yo?

Naam confusing — "serverless" bhanyo bhane server **chhaina** jasto lagcha. **Cha**, tara timi le manage garna pardaina.

### Traditional way (EC2):
- Server 24/7 chalcha
- Request aaye pani naai pani — paisa lagcha
- CPU/RAM 5% use, paisa 100% — wasteful

### Serverless way:
- Server **always on chhaina**
- Request aaye matra **function spin up** hunchha, run hunchha, sakkincha, sleep
- Pay per request — request chhaina, paisa chhaina
- Auto-scale — 1 request ya 10 lakh request, same handle

### Real example

**AWS Lambda**: function lekhera upload garchau. Request aayo bhane Lambda le 100ms ma chalauchha, response dincha, sleep. Ek mahina ma 1 million requests free.

**Vercel Functions** / **Netlify Functions** — same concept, easier UI.

### Pros

- Cheap for low traffic
- Auto-scale (no config)
- No server management

### Cons

- **Cold start** — function sleep ma cha bhane wake up huna 1-2 second lagcha (first request slow)
- Long-running task (5+ minute) ma fit hudaina
- Vendor lock-in

### Yo project ma fit?

Express app full serverless ma run garna **Vercel/Netlify Functions** ma deploy garna milcha tara database connection (MongoDB) cold start ma slow huncha. Beginner ko lagi **Render** (traditional always-on) better, future ma serverless explore garne.

---

## Nginx — k ho ra kina chahincha?

**Nginx** (read: "engine-x") = **reverse proxy** + **web server**.

### Reverse proxy — restaurant ko receptionist

Sochnau restaurant ma timi ja heche food order garna. Receptionist le order list garcha, kitchen ma kun cook free cha hercha, tehi ma forward garcha. Kitchen ma 10 cook chhan, tara timi lai ek matra receptionist le interact garcha.

Tehi nai Nginx:

```
[Browser]
   │
   ▼ port 80/443
[Nginx (reverse proxy)]
   │
   ├──► Node app on port 3000
   ├──► Node app on port 3001  (load balancing)
   └──► Static files (images)
```

### Kina chahincha?

1. **Port 80/443 listen** — Browser default ma port 80 (HTTP) ya 443 (HTTPS) ma jacha. Node Express directly tyahaa listen garna sakcha tara root permission chahincha. Nginx tyo handle garcha
2. **HTTPS / SSL** — Nginx le SSL certificate handle garcha (Let's Encrypt sanga free)
3. **Static files** — images, CSS Nginx le serve garcha (Node bhanda fast)
4. **Load balancing** — multiple Node instances ma request distribute
5. **Caching** — same response repeatedly request bhayo bhane Nginx le cache, Node lai bachayo
6. **Security** — rate limiting, malicious request filter

### EC2 ma typical setup

```
Internet
   │
   ▼
[Port 443 - Nginx with SSL]
   │
   ▼ proxy_pass
[Port 3000 - Node Express (PM2 le chalako)]
   │
   ▼
[MongoDB Atlas (cloud)]
```

Render, Vercel jasto PaaS use garyo bhane Nginx aafai handle garcha — tapaai le chinta linu pardaina. EC2 manual setup matra Nginx config garna parcha.

---

## Domain name kasari?

`https://13.234.56.78` brand jasto dekhincha? Naai. **Domain** chahincha — `myshop.com`.

Process:

1. **Namecheap, GoDaddy, Cloudflare** bata domain kinney (~$10/year)
2. **DNS settings** ma A record add — `myshop.com → 13.234.56.78` (server IP)
3. 5-30 minute paachi globally propagate
4. Browser ma `myshop.com` halda timro server ma jaa lagcha

Vercel/Render le pani custom domain support — UI bata add garna milcha.

---

## SSL / HTTPS kasari?

`http://myshop.com` ma padlock chhaina, `https://myshop.com` ma cha. HTTPS ko lagi **SSL certificate** chahincha.

**Let's Encrypt** = free SSL certificate provider. **Certbot** tool le auto generate, auto renew.

Vercel/Render le HTTPS auto handle garcha. EC2 ma:

```
sudo certbot --nginx -d myshop.com
```

Tyei matra. Certbot le Nginx config update garcha, certificate install garcha.

---

## Full production stack — final picture

```
[User Browser]
       │
       │  https://myshop.com
       │
       ▼
[Cloudflare DNS] → resolve to IP
       │
       ▼
[Vercel / Frontend]                [Render or EC2 / Backend]
   • React static                      • Node + Express
   • CDN cached                        • Nginx reverse proxy
   • Free                              • PM2 process manager
       │                                       │
       │  API call                             │
       │  fetch(api.myshop.com/products)       │
       └───────────────────────────────────────┤
                                               │
                                               ▼
                                  [MongoDB Atlas / Database]
                                       • Free tier 512 MB
                                       • Auto backup
                                       • Global cluster
```

---

## Beginner ko lagi recommended path

Sabai bhanda easy stack — **dependent ma 0 cost setup**:

1. **Database** → MongoDB Atlas (free tier)
2. **Backend** → Render (free tier — sleep after 15 min idle, paid $7/month always-on)
3. **Frontend** → Vercel (free, fast)
4. **Domain** (optional) → `.app.vercel.app` ya `.onrender.com` free, ya $10/year ko aafno

**0 cost ma full e-commerce app live**. Yei le start gar, real users aaye paachi paid plan ma upgrade.

EC2, Nginx, PM2, SSL — yo sab **next level**, sikh tara ahile project deploy garna jaruri haina.

---

## TL;DR

- **Server** = aphno laptop jasto computer, tara 24/7 on + public IP
- **SSH** = internet bata server ko terminal access (key file le secure)
- **EC2** = Amazon ko virtual server (slice of bigger machine)
- **PM2** = Node app 24/7 chalauney process manager
- **MongoDB Atlas** = MongoDB ko cloud version (free tier)
- **Vercel** = frontend deploy (free, fast, auto from GitHub)
- **Render** = backend deploy (Render-jasto-PaaS, beginner friendly)
- **Serverless** = function only when request, pay per request, auto-scale
- **Nginx** = reverse proxy + web server (restaurant receptionist for backend)
- **Let's Encrypt** = free SSL/HTTPS
- **Domain** = `myshop.com` lai server IP ma point garne (DNS A record)
- **Beginner stack**: MongoDB Atlas + Render + Vercel = full app live, 0 cost

---

## Padhne order (final)

1. `00-internet-kasari-kaam-garcha.md`
2. `01-backend-vs-frontend.md`
3. `02-node-express-mongoose.md`
4. `03-project-structure.md`
5. `04-models-explained.md`
6. `05-routes-controllers.md`
7. `06-authentication.md`
8. `07-flow-summary.md`
9. `08-middleware.md`
10. `09-tcp-udp-http-sockets.md`
11. **`10-deployment.md`** ← yei

Aba code file ma jaa — har file ko upar yo doc ka concept comment ma cha.

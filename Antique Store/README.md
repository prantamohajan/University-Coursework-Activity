# Relic & Rule — Antique Store (Node.js + React)

একটা antique/vintage product বিক্রির ওয়েবসাইট। Backend Node.js (Express) দিয়ে বানানো, পুরো CRUD (Create, Read/Get, Update, Delete) সাপোর্ট করে। Frontend React (Vite) দিয়ে বানানো, দুইটা view আছে — Catalog (কাস্টমার দেখবে) আর Manage Collection (তুমি প্রোডাক্ট add/edit/remove করবে)।

## Structure

```
antique-store/
  backend/     -> Express API (products.json কে database হিসেবে ব্যবহার করে)
  frontend/    -> React app (Vite)
```

## চালানোর নিয়ম (How to run)

### 1) Backend চালাও

```bash
cd backend
npm install
npm start
```

এটা চলবে `http://localhost:5000` এ। API endpoints:

- `GET    /api/products`        — সব প্রোডাক্ট (আর ?search= ও ?category= দিয়ে ফিল্টার করা যায়)
- `GET    /api/products/:id`    — একটা প্রোডাক্ট
- `POST   /api/products`        — নতুন প্রোডাক্ট তৈরি
- `PUT    /api/products/:id`    — প্রোডাক্ট আপডেট (পুরোটা)
- `PATCH  /api/products/:id`    — প্রোডাক্ট আপডেট (আংশিক)
- `DELETE /api/products/:id`    — প্রোডাক্ট মুছে ফেলা

### 2) Frontend চালাও (নতুন টার্মিনালে)

```bash
cd frontend
npm install
npm run dev
```

এটা চলবে `http://localhost:5173` এ। Browser এ ঐ লিংকে গেলে সাইটটা দেখা যাবে। Frontend থেকে `/api/...` কলগুলো automatically backend এ (5000 পোর্টে) পাঠানো হয় (vite.config.js এ proxy সেট করা আছে)।

## যা যা আছে

- **Catalog view**: প্রোডাক্ট গ্রিড, সার্চ বক্স, ক্যাটাগরি ফিল্টার চিপস।
- **Manage Collection view**: টেবিল আকারে সব প্রোডাক্ট, "Add a piece" বাটনে নতুন প্রোডাক্ট যোগ, প্রতিটা রো তে Edit/Remove।
- ডেটা `backend/data/products.json` ফাইলে সেভ থাকে, তাই সার্ভার রিস্টার্ট করলেও ডেটা হারায় না।
- ৬টা sample antique প্রোডাক্ট দিয়ে শুরু করা আছে (compass, pocket watch, desk, tea set, trunk, mirror) — চাইলে মুছে নিজেরটা যোগ করতে পারবে।

## পরের ধাপে যা করতে পারো

- Real database (MongoDB/PostgreSQL) দিয়ে JSON ফাইলের বদলে সেভ করা।
- Login/authentication যোগ করে Manage view শুধু admin এর জন্য রাখা।
- Cart ও checkout flow যোগ করা।
- Product image আপলোড ফিচার (এখন শুধু image URL দেওয়া যায়)।

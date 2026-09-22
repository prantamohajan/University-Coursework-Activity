# Coca-Cola Store — HTML/CSS/Bootstrap + Node/Express

## চালানোর নিয়ম

### 1) Backend
```
cd backend
npm install
npm start
```
চলবে http://localhost:5000 এ। CRUD: GET, POST, PUT, PATCH, DELETE — `/api/products`

### 2) Frontend
`frontend/index.html` ফাইলটা সরাসরি ব্রাউজারে খোলো (ডাবল ক্লিক), অথবা VS Code এর Live Server দিয়ে চালাও।
Backend আগে চালু থাকতে হবে, কারণ frontend সরাসরি `http://localhost:5000/api/products` কল করে।

## ফাইল কোথায়
- CRUD API: `backend/server.js`
- Product ডেটা: `backend/data/products.json`
- পেজের HTML: `frontend/index.html`
- ডিজাইন/রং: `frontend/css/style.css`
- JS লজিক (fetch, add/edit/delete): `frontend/js/app.js`

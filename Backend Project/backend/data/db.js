const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'products.json');

function readProducts() {
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeProducts(products) {
  fs.writeFileSync(DB_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

module.exports = { readProducts, writeProducts };

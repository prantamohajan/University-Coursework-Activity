const { readProducts, writeProducts } = require('../data/db');

// POST /api/products
function createProduct(req, res) {
  const { name, category, price, qty } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'পণ্যের নাম আবশ্যক' });
  }

  const products = readProducts();

  const newProduct = {
    id: 'p' + Date.now(),
    name: name.trim(),
    category: (category || '').trim(),
    price: Number(price) || 0,
    qty: Number(qty) || 0
  };

  products.unshift(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
}

module.exports = createProduct;

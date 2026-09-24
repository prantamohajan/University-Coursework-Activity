const { readProducts, writeProducts } = require('../data/db');

// PUT /api/products/:id
function updateProduct(req, res) {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
  }

  const { name, category, price, qty } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'পণ্যের নাম আবশ্যক' });
  }

  products[index] = {
    ...products[index],
    name: name.trim(),
    category: (category || '').trim(),
    price: Number(price) || 0,
    qty: Number(qty) || 0
  };

  writeProducts(products);
  res.json(products[index]);
}

module.exports = updateProduct;

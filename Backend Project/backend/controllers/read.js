const { readProducts } = require('../data/db');

// GET /api/products
function getAllProducts(req, res) {
  const products = readProducts();
  res.json(products);
}

// GET /api/products/:id
function getProductById(req, res) {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
  }

  res.json(product);
}

module.exports = { getAllProducts, getProductById };

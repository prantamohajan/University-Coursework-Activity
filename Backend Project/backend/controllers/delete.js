const { readProducts, writeProducts } = require('../data/db');

// DELETE /api/products/:id
function deleteProduct(req, res) {
  const products = readProducts();
  const exists = products.some(p => p.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ error: 'পণ্য পাওয়া যায়নি' });
  }

  const remaining = products.filter(p => p.id !== req.params.id);
  writeProducts(remaining);

  res.json({ message: 'পণ্য মুছে ফেলা হয়েছে', id: req.params.id });
}

module.exports = deleteProduct;

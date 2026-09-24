const express = require('express');
const router = express.Router();

const createProduct = require('../controllers/create');
const { getAllProducts, getProductById } = require('../controllers/read');
const updateProduct = require('../controllers/update');
const deleteProduct = require('../controllers/delete');

// CREATE
router.post('/products', createProduct);

// READ
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// UPDATE
router.put('/products/:id', updateProduct);

// DELETE
router.delete('/products/:id', deleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();

const createOrder = require('../controllers/create');
const { getAllOrders, getOrderById } = require('../controllers/read');
const updateOrder = require('../controllers/update');
const deleteOrder = require('../controllers/delete');

// CREATE
router.post('/orders', createOrder);

// READ
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);

// UPDATE
router.put('/orders/:id', updateOrder);

// DELETE
router.delete('/orders/:id', deleteOrder);

module.exports = router;

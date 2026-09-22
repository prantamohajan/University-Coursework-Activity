const express = require('express');
const router = express.Router();

const registerAdmin = require('../controllers/admin/register');
const loginAdmin = require('../controllers/admin/login');
const listAdmins = require('../controllers/admin/list');
const removeAdmin = require('../controllers/admin/delete');

// CREATE — নতুন এডমিন যোগ করা
router.post('/register', registerAdmin);

// LOGIN — যাচাই করে ঢুকতে দেওয়া
router.post('/login', loginAdmin);

// READ — এডমিনদের তালিকা
router.get('/', listAdmins);

// DELETE — এডমিন সরিয়ে ফেলা
router.delete('/:id', removeAdmin);

module.exports = router;

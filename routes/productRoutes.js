// routes/productRoutes.js
const express = require('express');
const { createProduct, readAll, readOne, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Todos protegidos por auth 
router.post('/create', auth, createProduct);
router.get('/readall', auth, readAll);
router.get('/readone/:id', auth, readOne);
router.put('/update/:id', auth, updateProduct);
router.delete('/delete/:id', auth, deleteProduct);

module.exports = router;

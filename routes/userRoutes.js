// routes/userRoutes.js
const express = require('express');
const { register, login, verifyToken, updateProfile } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verifytoken', auth, verifyToken);
router.put('/update', auth, updateProfile);

module.exports = router;

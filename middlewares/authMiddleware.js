const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async function auth(req, res, next) {
    try {
    const authHeader = req.headers.authorization || '';
    // Esperamos: Authorization: Bearer <token>
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: 'No autorizado. Falta token.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adjuntamos el usuario al request para usarlo en controladores
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
        return res.status(401).json({ message: 'Token inválido (usuario no existe)' });
    }
    next();
    } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado', error: err.message });
    }
};

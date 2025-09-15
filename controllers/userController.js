// controllers/userController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Helper para crear token
function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// POST /api/user/register
exports.register = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // Validaciones simples
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Evitar duplicados
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'El correo ya está registrado' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return res.status(201).json({
        message: 'Usuario registrado con éxito',
        user: { id: user._id, name: user.name, email: user.email },
        token
    });
    } catch (err) {
    return res.status(500).json({ message: 'Error en registro', error: err.message });
    }
};

// POST /api/user/login
exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;
    // Validar
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id);
    return res.json({
        message: 'Login exitoso',
        user: { id: user._id, name: user.name, email: user.email },
        token
    });
    } catch (err) {
    return res.status(500).json({ message: 'Error en login', error: err.message });
    }
};

// GET /api/user/verifytoken
exports.verifyToken = async (req, res) => {
  // Si pasó por el middleware y no falló, req.user existe
    return res.json({ message: 'Token válido', user: req.user });
};

// PUT /api/user/update
exports.updateProfile = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // Encontrar usuario autenticado
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // se hashea en pre('save')

    await user.save();
    return res.json({
        message: 'Perfil actualizado',
        user: { id: user._id, name: user.name, email: user.email }
    });
    } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
    }
};

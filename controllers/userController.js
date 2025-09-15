const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Helper para crear token
function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Helper para formatear usuario en las respuestas (incluye timestamps)
function formatUser(u) {
    if (!u) return null;
    return {
    id: u._id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    };
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
        user: formatUser(user),
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
        user: formatUser(user),
        token
    });
    } catch (err) {
    return res.status(500).json({ message: 'Error en login', error: err.message });
    }
};

// GET /api/user/verifytoken
exports.verifyToken = async (req, res) => {
  // Si pasó por el middleware y no falló, req.user existe (sin password)
    return res.json({ message: 'Token válido', user: formatUser(req.user) });
};

// PUT /api/user/update
exports.updateProfile = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // Encontrar usuario autenticado
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Si se quiere cambiar el email, validar duplicado
    if (email && email !== user.email) {
        const exists = await User.findOne({ email });
        if (exists) {
        return res.status(409).json({ message: 'El correo ya está registrado' });
        }
        user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = password; // se hashea en pre('save')

    await user.save();
    return res.json({
        message: 'Perfil actualizado',
        user: formatUser(user)
    });
    } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar perfil', error: err.message });
    }
};

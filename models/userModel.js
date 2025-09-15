// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
    },
    email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Formato de correo inválido']
    },
    password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
    }
}, { timestamps: true });

// Middleware para encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para comparar contraseñas en login
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

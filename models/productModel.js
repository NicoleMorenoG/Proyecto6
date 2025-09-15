// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true
    },
    description: {
    type: String,
    default: ''
    },
    price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
    },
  // Relación con el usuario propietario/creador
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El producto debe pertenecer a un usuario']
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

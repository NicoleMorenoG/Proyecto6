// controllers/productController.js
const Product = require('../models/productModel');

// POST /api/product/create
exports.createProduct = async (req, res) => {
    try {
    const { name, description, price } = req.body;

    if (!name || price == null) {
        return res.status(400).json({ message: 'name y price son obligatorios' });
    }

    const product = await Product.create({
        name,
        description: description || '',
        price,
      user: req.user.id   // dueño = usuario autenticado
    });

    return res.status(201).json({ message: 'Producto creado', product });
    } catch (err) {
    return res.status(500).json({ message: 'Error al crear producto', error: err.message });
    }
};

// GET /api/product/readall
exports.readAll = async (req, res) => {
    try {
    // Opcional: filtros simples por query (?minPrice=...&maxPrice=...)
    const { minPrice, maxPrice } = req.query;
    const filter = {};
    if (minPrice != null) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice != null) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const products = await Product.find(filter).populate('user', 'name email');
    return res.json({ products });
    } catch (err) {
    return res.status(500).json({ message: 'Error al listar productos', error: err.message });
    }
};

// GET /api/product/readone/:id
exports.readOne = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id).populate('user', 'name email');
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    return res.json({ product });
    } catch (err) {
    return res.status(500).json({ message: 'Error al obtener producto', error: err.message });
    }
};

// PUT /api/product/update/:id
exports.updateProduct = async (req, res) => {
    try {
    const { name, description, price } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    // (opcional) asegurar que solo el dueño lo actualiza
    if (product.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'No tienes permiso para actualizar este producto' });
    }

    if (name != null) product.name = name;
    if (description != null) product.description = description;
    if (price != null) product.price = price;

    await product.save();
    return res.json({ message: 'Producto actualizado', product });
    } catch (err) {
    return res.status(500).json({ message: 'Error al actualizar producto', error: err.message });
    }
};

// DELETE /api/product/delete/:id
exports.deleteProduct = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    // (opcional) asegurar que solo el dueño lo borra
    if (product.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
    }

    await product.deleteOne();
    return res.json({ message: 'Producto eliminado' });
    } catch (err) {
    return res.status(500).json({ message: 'Error al eliminar producto', error: err.message });
    }
};

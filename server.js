// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Configurar variables de entorno
dotenv.config();

// Crear app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Hello World desde mi Proyecto 6 🚀');
});

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Usar rutas base 
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
    })
    .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err);
    });

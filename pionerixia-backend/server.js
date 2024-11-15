const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware'); // Middleware de autenticación
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación

dotenv.config(); // Configura las variables de entorno

const app = express();

// Configuración de seguridad
app.use(helmet());

// Middlewares generales
app.use(cors());
app.use(express.json());

// Ruta de bienvenida en la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de PionerixIA');
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ejemplo de ruta protegida que usa el middleware de autenticación
app.use('/api/private', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso a ruta privada concedido' });
});

// Conectar a MongoDB (sin opciones obsoletas)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error de conexión:', error));

// Middleware de manejo de errores (asegúrate de que esté al final)
app.use((err, req, res, next) => {
    console.error(err.stack); // Muestra el error en la consola
    res.status(500).send('Something broke!'); // Mensaje de error genérico para el cliente
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

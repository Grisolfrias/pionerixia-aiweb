const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware'); // Middleware de autenticación
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const setupSwagger = require('./swaggerConfig'); // Configuración de Swagger

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();

// Configuración de seguridad
app.use(helmet());

// Configuración de CORS con orígenes permitidos desde ALLOWED_ORIGINS
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []; // Manejo de ausencia de ALLOWED_ORIGINS

app.use(cors({
    origin: (origin, callback) => {
        // Si el origen está permitido o es vacío (Swagger puede no tener origen)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS no permitido para este origen'));
        }
    },
    methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras permitidas
    credentials: true, // Permitir cookies
}));

// Middlewares generales
app.use(express.json());

// Configurar Swagger para la documentación
setupSwagger(app);

// Ruta de bienvenida en la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de PionerixIA');
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta protegida de ejemplo que usa el middleware de autenticación
app.get('/api/private', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso a ruta privada concedido', user: req.user });
});

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Conectado a la base de datos'))
    .catch((error) => console.error('❌ Error de conexión a la base de datos:', error.message));

// Middleware de manejo de errores (ubicado al final de las rutas)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
    console.log(`📄 Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
});

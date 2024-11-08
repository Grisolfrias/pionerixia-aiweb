// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida, solo accesible con un token válido
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso a ruta protegida concedido', user: req.user });
});

module.exports = router;

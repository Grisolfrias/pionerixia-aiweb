const User = require('../models/User');
const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 example: contraseña123
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Error en la solicitud.
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario autenticarse con correo y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales incorrectas.
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     summary: Acceso a ruta protegida
 *     description: Ruta protegida que requiere un token JWT válido.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso concedido.
 *       401:
 *         description: Token inválido o no proporcionado.
 */
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso a ruta protegida concedido', user: req.user });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión del usuario.
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente.
 */
router.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Sesión cerrada exitosamente' });
});

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicitar enlace de restablecimiento de contraseña
 *     description: Permite al usuario solicitar un enlace para restablecer su contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: Enlace de restablecimiento enviado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        console.log(`Enlace de restablecimiento: http://localhost:5000/api/auth/reset-password/${resetToken}`);
        res.json({ message: 'Enlace de restablecimiento enviado al correo electrónico' });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Restablecer contraseña
 *     description: Permite restablecer la contraseña del usuario usando un token de recuperación.
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de restablecimiento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: nuevaContraseña123
 *     responses:
 *       200:
 *         description: Contraseña restablecida correctamente.
 *       400:
 *         description: Token inválido o expirado.
 */
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Contraseña restablecida correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Token inválido o expirado' });
    }
});

/**
 * @swagger
 * /api/auth/verify-email/{token}:
 *   get:
 *     summary: Verificar correo electrónico
 *     description: Verifica la dirección de correo electrónico del usuario mediante un token.
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de verificación.
 *     responses:
 *       200:
 *         description: Correo verificado correctamente.
 *       400:
 *         description: Token inválido o expirado.
 */
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        user.isVerified = true;
        await user.save();
        res.json({ message: 'Correo verificado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Token inválido o expirado' });
    }
});

module.exports = router;

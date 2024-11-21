const Joi = require('joi');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Esquema de validación de Joi para los datos del usuario
const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(), // Validación para correo electrónico
    password: Joi.string().min(8).required() // Contraseña mínima de 8 caracteres
});

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        // Validar los datos de entrada con Joi
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, email, password } = req.body;

        // Verificar si el correo ya existe
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Función para el inicio de sesión
exports.login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Buscar al usuario en la base de datos (por username o email)
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // (Opcional) Verificar si el correo está confirmado
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Por favor, verifica tu correo electrónico' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

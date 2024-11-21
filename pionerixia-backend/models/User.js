// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Campo de correo electrónico
    password: { type: String, required: true }, // Contraseña hasheada
    isVerified: { type: Boolean, default: false } // Estado de verificación del correo
});

module.exports = mongoose.model('User', userSchema);

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar los datos decodificados en la solicitud
        next(); // Pasar al siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de configuración para Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de PionerixIA',
            version: '1.0.0',
            description: 'Documentación de la API de PionerixIA',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Servidor local
                description: 'Servidor local de desarrollo',
            },
            {
                url: 'https://pionerixia-backend.onrender.com', // Servidor de producción
                description: 'Servidor de producción en Render',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Formato estándar de JSON Web Tokens
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Indica que las rutas protegidas requieren un token
            },
        ],
    },
    apis: ['./routes/*.js'], // Ruta a los archivos donde están definidas las rutas de la API
};

// Generar la especificación Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Función para configurar Swagger en la aplicación
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Exponer la documentación en /api-docs
    console.log('📄 Documentación de la API disponible en /api-docs');
};

module.exports = setupSwagger;

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ComediAPI',
      version: '1.0.0',
      description: 'API para gestionar chistes',
    },
    servers: [
      {
        url: `http://localhost:${3000}/comediAPI`, // URL base para el entorno de desarrollo
      },
    ],
  },
  apis: ['./routes/*.js'], // Archivo donde se encuentran las anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
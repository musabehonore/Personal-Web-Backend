import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyBrand API',
      version: '1.0.0',
      description: 'MyBrand API information',
      contact: {
        email: '@gmail.com',
      },
      // servers: ["http://localhost:3000"],
    },
    components: {
      securitySchemes: {
        BearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
      },
    },
    // security: [{ BearerAuth: [] }], 
  },
  apis: ['./src/routes/routes.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const swaggerUiMiddleware = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    security: [{ BearerAuth: [] }], 
  },
});
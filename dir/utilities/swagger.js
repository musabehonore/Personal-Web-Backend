"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiSetup = exports.swaggerUiMiddleware = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerUiMiddleware = swagger_ui_express_1.default.serve;
exports.swaggerUiSetup = swagger_ui_express_1.default.setup(swaggerDocs, {
    swaggerOptions: {
        security: [{ BearerAuth: [] }],
    },
});

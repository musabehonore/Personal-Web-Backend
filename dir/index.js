"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   const allowedOrigins = ['http://localhost:3000', 'http://gamebrag.onrender.com', 'https://gamebrag.onrender.com'];
//   const origin: any = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//   next();
// }); 
const upload = (0, multer_1.default)();
// app.use(upload.any());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/api/*', (req, res) => {
    res.status(404).json({ message: 'API Not Found' });
});
// mongoose.connect('mongodb://localhost:27017/myBlogsDatabase')
//   .then(() => {
//     console.log('Connected to MongoDB !! ');
//     app.listen(7000, () => {
//       console.log(`Server is running on port 7000`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error in connecting to MongoDB:', error);
//   });
exports.default = app;

import express from 'express';
import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import Router from './routes/routes';
import swaggerUi from "swagger-ui-express"
import swaggerDocuments from "../swagger.json"
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); 
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

const upload = multer();
// app.use(upload.any());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocuments));

app.use(express.json());
app.use('/api', Router);


app.get('/api/*', (req: Request, res: Response) => {
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

export default app;
  
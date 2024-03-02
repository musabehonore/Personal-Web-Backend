import express from 'express';
import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import Router from './routes/routes';
import swaggerUi from "swagger-ui-express"
import swaggerDocuments from "../swagger.json"
import bodyParser from 'body-parser';
import multer from 'multer';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

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
  
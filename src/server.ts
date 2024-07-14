import app from './index';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
mongoose.connect(`${process.env.DATABASE_URL}`)
  .then(() => {
    console.log('Connected to MongoDB !! ');
    
    app.listen(7000, () => {
      console.log(`Server is running on port 7000`);
    });
  })
  .catch((error) => {
    console.error('Error in connecting to MongoDB:', error);
  });

  export default app;
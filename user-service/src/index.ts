import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './utils/logger';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/error.handler.middleware';
import mongoose from 'mongoose';


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());


app.use('/api/users', userRoutes);

app.use(errorHandler);

if (!process.env.PORT) {
    logger.fatal('Error: PORT environment variable is not set.');
    process.exit(1);
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`User service is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('Error connecting to MongoDB', err));


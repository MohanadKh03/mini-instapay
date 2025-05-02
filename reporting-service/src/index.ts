import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './utils/logger';
import reportingRoutes from './routes/reporting.routes';
import { errorHandler } from './middlewares/error.handler.middleware';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());


app.use('/api/reporting', reportingRoutes);

app.use(errorHandler);

if (!process.env.PORT) {
    logger.fatal('Error: PORT environment variable is not set.');
    process.exit(1);
}

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  logger.info(`Transaction service is running on port ${PORT}`);
});


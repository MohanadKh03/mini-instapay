import express from 'express';
import { generateUserTransactionsSummary } from '../controllers/reporting.controller';

const router = express.Router();

router.get('/generate-transaction-summary/:userId', generateUserTransactionsSummary)

export default router;

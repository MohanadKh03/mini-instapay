import { TransactionSummaryReport } from "../models/transaction.summary.model";
import { logger } from "../utils/logger";
import axios from 'axios';


export async function makeTransactionSummary(userId: string): Promise<TransactionSummaryReport> {
    logger.info(`Generating transaction summary for userId=${userId}`);
    try {
        const transactions = (await axios.get(`http://${process.env.TRANSACTION_SVC_NAME}/api/transactions/user/${userId}`)).data.data;
        const totalTransactions = transactions.length;
        const totalAmount = transactions.reduce((acc: number, transaction: any) => acc + transaction.amount, 0);
        const averageAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

        const totalFromTransactions = transactions.filter((transaction: any) => transaction.senderId === userId).length;
        const totalToTransactions = totalTransactions - totalFromTransactions;

        const totalFromAmount = transactions
            .filter((transaction: any) => transaction.senderId === userId)
            .reduce((acc: number, transaction: any) => acc + transaction.amount, 0);
        const totalToAmount = transactions
            .filter((transaction: any) => transaction.senderId !== userId)
            .reduce((acc: number, transaction: any) => acc + transaction.amount, 0);

        const averageFromAmount = totalFromTransactions > 0 ? totalFromAmount / totalFromTransactions : 0;
        const averageToAmount = totalToTransactions > 0 ? totalToAmount / totalToTransactions : 0;
        const transactionCount = transactions.length;

        const report: TransactionSummaryReport = {
            userId,
            totalFromTransactions,
            totalToTransactions,
            totalFromAmount,
            totalToAmount,
            averageFromAmount,
            averageToAmount,
            totalTransactions,
            totalAmount,
            averageAmount,
            transactionCount,
        };

        logger.info(`Transaction summary report generated successfully for userId=${userId}`);
        return report;
    } catch (error: any) {
        logger.error(`Failed to generate transaction summary: ${error.message}`);
        throw error;
    }
}

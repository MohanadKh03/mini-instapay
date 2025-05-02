export interface TransactionSummaryReport {
    userId: string;
    totalFromTransactions: number;
    totalToTransactions: number;
    totalFromAmount: number;
    totalToAmount: number;
    averageFromAmount: number;
    averageToAmount: number;
    totalTransactions: number;
    totalAmount: number;
    averageAmount: number;
    transactionCount: number;
}

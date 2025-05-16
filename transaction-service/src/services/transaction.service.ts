import { Transaction } from "../models/transaction.model";
import { logger } from "../utils/logger";
import axios from 'axios';

async function createTransaction(senderId: string, receiverId: string, amount: number): Promise<Transaction> {
    logger.info(`Creating transaction: senderId=${senderId}, receiverId=${receiverId}, amount=${amount}`);
    try {
        const newTransaction = new Transaction({
            from_id: senderId,
            to_id: receiverId,
            status: 'success', // This should be set based on the transaction result
            amount: amount,
        });

        await newTransaction.save();
        logger.info(`Transaction created successfully: id=${newTransaction.id}`);
        return newTransaction;
    } catch (error: any) {
        logger.error(`Failed to create transaction: ${error.message}`);
        throw error;
    }
}

export async function makeTransaction(
  senderId: string,
  receiverId: string,
  amount: number,
) {
    logger.info(`Initiating transaction: senderId=${senderId}, receiverId=${receiverId}, amount=${amount}`);

    if (senderId === receiverId) {
        logger.warn(`Sender and receiver are the same: senderId=${senderId}`);
        throw new Error('Sender and receiver cannot be the same');
    }

    try {
        logger.warn(`PROCESS: ${process.env.USER_SVC_NAME}`)
        const fromUser = (await axios.get(`http://${process.env.USER_SVC_NAME}/api/users/profile/${senderId}`)).data.data;
        const toUser = (await axios.get(`http://${process.env.USER_SVC_NAME}/api/users/profile/${receiverId}`)).data.data;

        logger.warn("FROM USER: ", fromUser)
        if (!fromUser) {
            logger.warn(`User not found: senderId=${senderId}`);
            throw new Error('User not found');
        }
        if (!toUser) {
            logger.warn(`User not found: senderId=${receiverId}`);
            throw new Error('User not found');
        }

        if (amount <= 0) {
            logger.warn(`Invalid amount: senderId=${senderId}, amount=${amount}`);
            throw new Error('Invalid amount');
        }

        if (fromUser.balance < amount) {
            logger.warn(`Insufficient balance: senderId=${senderId}, balance=${fromUser.balance}, amount=${amount}`);
            throw new Error('Insufficient balance');
        }

        await axios.put(`http://${process.env.USER_SVC_NAME}/api/users/update/${senderId}`, { balance: fromUser.balance - amount as number });
        await axios.put(`http://${process.env.USER_SVC_NAME}/api/users/update/${receiverId}`, { balance: toUser.balance + amount as number });
        logger.info(`Balances updated successfully for senderId=${senderId} and receiverId=${receiverId}`);

        const transaction = await createTransaction(senderId, receiverId, amount);
        logger.info(`Transaction completed successfully: id=${transaction.id}`);
        return transaction;
    } catch (error: any) {
        logger.error(`Transaction failed: ${error.message}`);
        throw new Error('Transaction failed: ' + error.message);
    }
}

export async function getTransactionsByUserId(userId: string) {
    logger.info(`Fetching transactions for userId=${userId}`);
    try {
        let transactions = await Transaction.find({
            $or: [{ from_id: userId }, { to_id: userId }],
        });

        if (!transactions || transactions.length === 0) {
            logger.warn(`No transactions found for userId=${userId}`);
            throw new Error('No transactions found for this user');
        }

        logger.info(`Transactions fetched successfully for userId=${userId}`);
        return transactions.map((transaction) => ({
            id: transaction.id,
            senderId: transaction.from_id,
            receiverId: transaction.to_id,
            amount: transaction.amount,
        }));
    } catch (error: any) {
        logger.error(`Failed to fetch transactions for userId=${userId}: ${error.message}`);
        throw error;
    }
}

export async function getAllTransactions() {
    logger.info(`Fetching all transactions`);
    try {
        let transactions = await Transaction.find({});
        if (!transactions || transactions.length === 0) {
            logger.warn(`No transactions found`);
            throw new Error('No transactions found');
        }

        logger.info(`All transactions fetched successfully`);
        return transactions.map((transaction) => ({
            id: transaction.id,
            senderId: transaction.from_id,
            receiverId: transaction.to_id,
            amount: transaction.amount,
        }));
    } catch (error: any) {
        logger.error(`Failed to fetch all transactions: ${error.message}`);
        throw error;
    }
}

export async function getTransactionById(transactionId: string) {
    logger.info(`Fetching transaction by id=${transactionId}`);
    try {
        let transaction = await Transaction.findOne({ id: transactionId });
        if (!transaction) {
            logger.warn(`Transaction not found: id=${transactionId}`);
            throw new Error('Transaction not found');
        }

        logger.info(`Transaction fetched successfully: id=${transactionId}`);
        return {
            id: transaction.id,
            senderId: transaction.from_id,
            receiverId: transaction.to_id,
            amount: transaction.amount,
        };
    } catch (error: any) {
        logger.error(`Failed to fetch transaction by id=${transactionId}: ${error.message}`);
        throw error;
    }
}

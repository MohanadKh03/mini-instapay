import React, { useEffect, useState } from 'react';
import {
  Container, Typography, List, ListItem, ListItemText,
  Button, Table, TableBody, TableCell, TableContainer,
  TableRow, Paper, CircularProgress, Stack
} from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import { apiBase } from '../api';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const userId = localStorage.getItem('userId');

  const getTransactions = async () => {
    try {
      const res = await fetch(`${apiBase.transaction}/user/${userId}`);
      const json = await res.json();
      setTransactions(json.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const getSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch(`${apiBase.reporting}/generate-transaction-summary/${userId}`);
      const json = await res.json();
      setSummary(json.data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const summaryRows = summary ? [
    ['User ID', summary.userId],
    ['Total Sent Transactions', summary.totalFromTransactions],
    ['Total Received Transactions', summary.totalToTransactions],
    ['Total Sent Amount', summary.totalFromAmount],
    ['Total Received Amount', summary.totalToAmount],
    ['Average Sent Amount', summary.averageFromAmount],
    ['Average Received Amount', summary.averageToAmount],
    ['Total Transactions', summary.totalTransactions],
    ['Total Amount', summary.totalAmount],
    ['Average Transaction Amount', summary.averageAmount]
  ] : [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>

      <TransactionForm onTransfer={getTransactions} />

      <Typography variant="h6" sx={{ mt: 4 }}>Transaction History</Typography>
      <List>
        {transactions.map((tx, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={`From: ${tx.senderId}, To: ${tx.receiverId}, Amount: $${tx.amount}`}
            />
          </ListItem>
        ))}
      </List>

      <Stack direction="row" alignItems="center" spacing={2} mt={4}>
        <Typography variant="h6">Transaction Summary</Typography>
        <Button variant="contained" onClick={getSummary} disabled={loadingSummary}>
          {loadingSummary ? <CircularProgress size={20} /> : 'Get Summary'}
        </Button>
      </Stack>

      {summary && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableBody>
              {summaryRows.map(([label, value], index) => (
                <TableRow key={index}>
                  <TableCell><strong>{label}</strong></TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default DashboardPage;

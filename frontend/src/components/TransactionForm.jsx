import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { apiBase } from '../api';

function TransactionForm({ onTransfer }) {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const sendMoney = async () => {
    const from_id = localStorage.getItem('userId');
    const body = JSON.stringify({ to_id: receiver, from_id, amount: parseFloat(amount) });
    await fetch(`${apiBase.transaction}/send-money`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    alert('Money sent');
    onTransfer();
  };

  return (
    <>
      <Typography variant="h6">Send Money</Typography>
      <TextField label="Receiver ID" fullWidth margin="normal" onChange={e => setReceiver(e.target.value)} />
      <TextField label="Amount" type="number" fullWidth margin="normal" onChange={e => setAmount(e.target.value)} />
      <Button variant="contained" onClick={sendMoney}>Send</Button>
    </>
  );
}

export default TransactionForm;

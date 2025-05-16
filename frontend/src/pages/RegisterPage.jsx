import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Stack } from '@mui/material'; // ← Added Stack here
import { useNavigate } from 'react-router-dom'; // ← Added for navigation
import { apiBase } from '../api';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ← Hook for navigation

  const handleRegister = async () => {
    const body = JSON.stringify({ username, email, password });
    const res = await fetch(`${apiBase.user}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const data = await res.json();
    alert('Registered successfully. Now login.');
    navigate('/login'); // Optional: auto-redirect after register
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField fullWidth label="Username" margin="normal" onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" onClick={handleRegister}>Register</Button>
        <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
      </Stack>
    </Container>
  );
}

export default RegisterPage;

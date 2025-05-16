import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Stack } from '@mui/material'; // ← Added Stack here
import { useNavigate } from 'react-router-dom';
import { apiBase } from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${apiBase.user}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    localStorage.setItem('userId', data.data.id);
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField fullWidth label="Email" margin="normal" onChange={e => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setPassword(e.target.value)} />
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" onClick={handleLogin}>Login</Button>
        <Button variant="outlined" onClick={() => navigate('/register')}>Register</Button>
      </Stack>
    </Container>
  );
}

export default LoginPage;

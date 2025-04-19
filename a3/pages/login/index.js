import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Box, Button, TextField, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailExists, setEmailExists] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setEmailExists(data.exists);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      login(email, password);
      router.push('/');
    } else {
      const errorData = await res.json();
      alert(`Login failed: ${errorData.message}`);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      login(email, password);
      router.push('/');
    } else {
      const errorData = await res.json();
      alert(`Signup failed: ${errorData.message}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleEmailCheck} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {emailExists === null ? 'Enter Email' : emailExists ? 'Login' : 'Sign Up'}
        </Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          disabled={emailExists !== null}
        />
        {emailExists === null && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Next
          </Button>
        )}
      </Box>
      {emailExists === true && (
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      )}
      {emailExists === false && (
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LoginPage;
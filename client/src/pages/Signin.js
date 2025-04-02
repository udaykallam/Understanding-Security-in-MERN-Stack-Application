import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const URL = "http://localhost:5000/api/auth/login";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      if (!response.ok) {
        // toast.error('Invalid Crediantials');
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.error(`Login failed with status ${response.status}: ${res_data.message}`);
        return;
      }

      storeTokenInLS(res_data.token);
      console.log("Login form", response);

      toast.success('Login Successful!');
      setUser({ email: "", password: "" });
      navigate('/');
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <br />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" color="#fff">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              autoFocus
              sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '5px',
                '& label': {
                  color: '#0b0b0b',
                },
                '&:hover label': {
                  color: '#efa500',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '5px',
                '& label': {
                  color: '#0b0b0b',
                },
                '&:hover label': {
                  color: '#4caf50',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#4caf50',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: 'black',
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/otpmail" variant="body2" color="#0b0b0b" style={{ color: 'white' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" color="#0b0b0b" style={{ color: 'white' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;

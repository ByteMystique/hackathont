import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  AppBar, 
  Toolbar,
  Alert,
  Fade
} from '@mui/material';
import { Person, Lock, ArrowBack } from '@mui/icons-material';
import axios from "axios";

const LoginDelivery = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        phone,
        password,
        role: "middleman",
      });

      if (response.data) {
        localStorage.clear(); 
        localStorage.setItem("middlemanId", response.data.middleman._id);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/partner-dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Button 
            component={Link} 
            to="/" 
            startIcon={<ArrowBack />} 
            color="inherit" 
            sx={{ fontWeight: 600 }}
          >
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="inherit">
            Don't have an account? <Link to="/delivery-signup" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 3, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="white">
                Partner Login
              </Typography>
              <Typography variant="body1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
                Welcome back! Sign in to access delivery opportunities
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    py: 1.5, 
                    fontSize: 16, 
                    fontWeight: 600,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default LoginDelivery;
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
  Fade,
  Grid
} from '@mui/material';
import { Person, Email, Lock, Phone, AccountBalanceWallet, ArrowBack } from '@mui/icons-material';
import axios from "axios";

const SignUpDelivery = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    walletAddress: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        phone: formData.phoneNumber,
        name: formData.fullName,
        password: formData.password,
        role: "middleman",
        walletAddress: formData.walletAddress
      });

      if (response.data) {
        // Store partner data in localStorage
        localStorage.setItem("userId", response.data.newMiddleman._id);
        localStorage.setItem("role", "middleman");
        localStorage.setItem("partnerData", JSON.stringify(response.data.newMiddleman));
        navigate('/partner-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
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
            Already have an account? <Link to="/delivery-login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Login here</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 3, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="white">
                Partner Sign Up
              </Typography>
              <Typography variant="body1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
                Join our delivery network and help build a sustainable future
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      value={formData.fullName}
                      onChange={handleChange('fullName')}
                      required
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange('email')}
                      required
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange('password')}
                      required
                      InputProps={{
                        startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      value={formData.phoneNumber}
                      onChange={handleChange('phoneNumber')}
                      required
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Wallet Address"
                      variant="outlined"
                      value={formData.walletAddress}
                      onChange={handleChange('walletAddress')}
                      required
                      placeholder="0x..."
                      InputProps={{
                        startAdornment: <AccountBalanceWallet sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 4,
                    py: 1.5, 
                    fontSize: 16, 
                    fontWeight: 600,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default SignUpDelivery;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
import { Business, AccountBalanceWallet, ArrowBack } from '@mui/icons-material';

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleConnectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setFormData({ ...formData, walletAddress: accounts[0] });
      } catch (error) {
        setError("MetaMask connection failed");
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/company/login", formData);
      if (response.data.company) {
        localStorage.clear();
        localStorage.setItem("companyId", response.data.company.id);
        localStorage.setItem("role", "company");
        navigate("/company-dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
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
            Don't have an account? <Link to="/company-signup" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 3, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="white">
                Company Login
              </Typography>
              <Typography variant="body1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
                Access your recycling company dashboard
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
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleConnectMetaMask}
                      startIcon={<AccountBalanceWallet />}
                      sx={{ mb: 2, py: 1.5, fontWeight: 600 }}
                    >
                      Connect MetaMask
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Wallet Address"
                      variant="outlined"
                      value={formData.walletAddress}
                      onChange={handleChange('walletAddress')}
                      placeholder="0x..."
                      InputProps={{
                        startAdornment: <AccountBalanceWallet sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange('password')}
                      required
                      InputProps={{
                        startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
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
                  {loading ? 'Logging In...' : 'Login'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default CompanyLogin;
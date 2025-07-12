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
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Business, AccountBalanceWallet, ArrowBack, LocationOn, Email, Phone } from '@mui/icons-material';

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    companyType: "Recycling Plant",
    address: "",
    city: "",
    country: "",
    lat: "",
    long: "",
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
      const response = await axios.post("http://localhost:3000/api/company/register", {
        ...formData,
        location: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          lat: parseFloat(formData.lat),
          long: parseFloat(formData.long),
        },
      });
      setError(response.data.message);
      setTimeout(() => navigate("/company-login"), 2000);
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
            Already have an account? <Link to="/company-login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{ bgcolor: 'primary.main', p: 3, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="white">
                Company Registration
              </Typography>
              <Typography variant="body1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
                Join our network of verified recycling companies
              </Typography>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert severity={error.includes('successfully') ? 'success' : 'error'} sx={{ mb: 3 }}>
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
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange('name')}
                      required
                      InputProps={{
                        startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
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
                      label="Phone"
                      variant="outlined"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      required
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
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
                        startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Company Type</InputLabel>
                      <Select
                        value={formData.companyType}
                        label="Company Type"
                        onChange={handleChange('companyType')}
                      >
                        <MenuItem value="Recycling Plant">Recycling Plant</MenuItem>
                        <MenuItem value="Waste Management">Waste Management</MenuItem>
                        <MenuItem value="Climate Investor">Climate Investor</MenuItem>
                        <MenuItem value="Carbon Credit Company">Carbon Credit Company</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      variant="outlined"
                      value={formData.address}
                      onChange={handleChange('address')}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      variant="outlined"
                      value={formData.city}
                      onChange={handleChange('city')}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      variant="outlined"
                      value={formData.country}
                      onChange={handleChange('country')}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      type="number"
                      variant="outlined"
                      value={formData.lat}
                      onChange={handleChange('lat')}
                      placeholder="0.000000"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Longitude"
                      type="number"
                      variant="outlined"
                      value={formData.long}
                      onChange={handleChange('long')}
                      placeholder="0.000000"
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
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

export default CompanySignup;
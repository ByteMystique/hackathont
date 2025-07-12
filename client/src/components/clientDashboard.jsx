import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  AppBar, 
  Toolbar,
  Alert,
  Chip,
  Paper,
  Divider,
  Fade,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Add, 
  LocationOn, 
  CalendarToday, 
  Scale, 
  AttachMoney,
  Recycling,
  CheckCircle,
  Schedule
} from '@mui/icons-material';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ClientDashboard = () => {
  const userId = localStorage.getItem("userId") || "67bc5817afb8c019a8581a73";

  const [itemType, setItemType] = useState({ type: "paper", price: 0.5 });
  const [quantity, setQuantity] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [status, setStatus] = useState("");
  const [lat, setLat] = useState(9.9312);
  const [long, setLong] = useState(76.2673);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const imageMapping = {
    paper: "/images/paper.png",
    electronics: "/images/electronics.png",
    glass: "/images/glass.png",
    furniture: "/images/furniture.png",
    plastic: "/images/plastic.png",
  };

  const getItemPrice = (itemType) => {
    const prices = {
      paper: 0.5,
      electronics: 5.0,
      glass: 0.3,
      furniture: 2.0,
      plastic: 0.8
    };
    return prices[itemType] || 0;
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/items/${userId}`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      setStatus("Error fetching items: " + error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Auto-clear success messages after 3 seconds with smooth fade
  useEffect(() => {
    if (status) {
      setShowStatus(true);
      if (!status.includes('Error')) {
        const timer = setTimeout(() => {
          setShowStatus(false);
          // Clear the status message after fade animation completes
          setTimeout(() => setStatus(""), 300);
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [status]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post("http://localhost:3000/api/user/add-item", {
        userId,
        type: itemType.type,
        quantity: parseFloat(quantity),
        scheduledDate,
        lat,
        long,
      });

      setStatus(response.data.message);
      setQuantity("");
      setScheduledDate("");
      fetchItems();
    } catch (error) {
      setStatus("Error adding item: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "Assigned": return "info";
      case "Verified": return "success";
      default: return "default";
    }
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700} color="white">
            Client Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
            Welcome! Manage your recyclable items here.
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Add Item Form */}
          <Grid item xs={12} md={4}>
            <Fade in timeout={800}>
              <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', height: 'fit-content' }}>
                <Box sx={{ bgcolor: 'primary.main', p: 3 }}>
                  <Typography variant="h5" fontWeight={700} color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Add sx={{ mr: 1 }} />
                    Add Recyclable Item
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  {status && (
                    <Fade in={showStatus} timeout={500}>
                      <Alert severity={status.includes('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
                        {status}
                      </Alert>
                    </Fade>
                  )}
                  
                  <Box component="form" onSubmit={handleAddItem}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Item Type</InputLabel>
                      <Select
                        value={itemType.type}
                        label="Item Type"
                        onChange={(e) => {
                          const selectedType = e.target.value;
                          const prices = {
                            paper: 0.5,
                            electronics: 5.0,
                            glass: 0.3,
                            furniture: 2.0,
                            plastic: 0.8
                          };
                          setItemType({
                            type: selectedType,
                            price: prices[selectedType]
                          });
                        }}
                        startAdornment={<Recycling sx={{ mr: 1, color: 'text.secondary' }} />}
                      >
                        <MenuItem value="paper">Paper - $0.5/kg</MenuItem>
                        <MenuItem value="electronics">Electronics - $5.0/kg</MenuItem>
                        <MenuItem value="glass">Glass - $0.3/kg</MenuItem>
                        <MenuItem value="furniture">Furniture - $2.0/kg</MenuItem>
                        <MenuItem value="plastic">Plastic - $0.8/kg</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <TextField
                      fullWidth
                      label="Quantity (kg)"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: <Scale sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Scheduled Date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
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
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Item'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Map - Made Wider */}
          <Grid item xs={12} md={8}>
            <Fade in timeout={1000}>
              <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden', height: 500 }}>
                <Box sx={{ bgcolor: 'primary.main', p: 2 }}>
                  <Typography variant="h6" fontWeight={600} color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1 }} />
                    Pickup Location
                  </Typography>
                </Box>
                <Box sx={{ height: 420 }}>
                  <MapContainer
                    center={[lat, long]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[lat, long]} />
                  </MapContainer>
                </Box>
              </Card>
            </Fade>
          </Grid>

          {/* Items List */}
          <Grid item xs={12}>
            <Fade in timeout={1200}>
              <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', p: 3 }}>
                  <Typography variant="h5" fontWeight={700} color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Recycling sx={{ mr: 1 }} />
                    Your Recyclable Items
                  </Typography>
                </Box>
                <CardContent sx={{ p: 0 }}>
                  {items.length === 0 ? (
                    <Box sx={{ p: 6, textAlign: 'center' }}>
                      <Recycling sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No items added yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start by adding your first recyclable item above
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={3} sx={{ p: 4 }}>
                      {items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                          <Paper 
                            elevation={3} 
                            sx={{ 
                              p: 3, 
                              borderRadius: 3, 
                              border: '1px solid',
                              borderColor: 'divider',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6,
                                borderColor: 'primary.main'
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                              <Typography variant="h6" fontWeight={700} color="primary.main">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </Typography>
                              <Chip 
                                label={item.status} 
                                color={getStatusColor(item.status)}
                                size="small"
                                sx={{ fontWeight: 600 }}
                              />
                            </Box>
                            
                            <Box sx={{ space: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Scale sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
                                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                                  {item.quantity} kg
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AttachMoney sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
                                <Typography variant="body1" color="text.secondary">
                                  ${getItemPrice(item.type).toFixed(2)}/kg
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AttachMoney sx={{ fontSize: 18, mr: 1.5, color: 'success.main' }} />
                                <Typography variant="body1" color="success.main" fontWeight={700}>
                                  Total: ${(item.quantity * getItemPrice(item.type)).toFixed(2)}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Schedule sx={{ fontSize: 18, mr: 1.5, color: 'text.secondary' }} />
                                <Typography variant="body1" color="text.secondary">
                                  {new Date(item.scheduledDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientDashboard;
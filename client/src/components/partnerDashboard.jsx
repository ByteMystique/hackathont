import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  AppBar, 
  Toolbar,
  Alert,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  CircularProgress
} from '@mui/material';
import { 
  LocalShipping, 
  LocationOn, 
  AttachMoney, 
  Scale, 
  Schedule,
  CheckCircle,
  Assignment,
  TrendingUp
} from '@mui/icons-material';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PartnerDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const middlemanId = localStorage.getItem("middlemanId");
  // Fetch available jobs
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/middleman/available-items")
      .then((response) => {
        setAvailableJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setStatus("Error fetching available jobs");
      });
  }, []);

  // Assign item to middleman
  const assignItem = async (middlemanId, itemId) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/middleman/assign-item", {
        middlemanId,
        itemId,
      });
      setStatus(response.data.message);
      setAvailableJobs(availableJobs.filter((job) => job.items.some((item) => item._id !== itemId)));
      setShowModal(false);
    } catch (error) {
      console.error("Error assigning item:", error);
      setStatus("Error assigning item");
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
            Partner Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button 
            component={Link} 
            to="/job-status" 
            variant="outlined" 
            color="inherit"
            sx={{ fontWeight: 600, mr: 2 }}
          >
            View Assigned Jobs
          </Button>
          <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
            Available recycling opportunities
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {status && (
          <Alert severity={status.includes('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
            {status}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Available Jobs */}
          <Grid item xs={12}>
            <Fade in timeout={800}>
              <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', p: 3 }}>
                  <Typography variant="h5" fontWeight={700} color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Assignment sx={{ mr: 1 }} />
                    Available Jobs
                  </Typography>
                </Box>
                <CardContent sx={{ p: 0 }}>
                  {availableJobs.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                      <Typography color="text.secondary">No available jobs at the moment.</Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={3} sx={{ p: 3 }}>
                      {availableJobs.map((userGroup) => (
                        userGroup.items.map((item) => (
                          <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight={600} color="primary.main">
                                  {userGroup.userName || 'Client'}
                                </Typography>
                                <Chip 
                                  label={item.status} 
                                  color={getStatusColor(item.status)}
                                  size="small"
                                />
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Scale sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {item.quantity} kg {item.type}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <AttachMoney sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    ${(item.quantity * 0.5).toFixed(2)} {/* Fixed price per kg */}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <Schedule sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {item.scheduledDate ? new Date(item.scheduledDate).toLocaleDateString() : 'No date set'}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Button
                                fullWidth
                                variant="contained"
                                size="medium"
                                onClick={() => {
                                  setSelectedItem({...item, userName: userGroup.userName});
                                  setShowModal(true);
                                }}
                                sx={{ 
                                  fontWeight: 600,
                                  bgcolor: 'primary.main',
                                  '&:hover': { bgcolor: 'primary.dark' }
                                }}
                              >
                                Accept Job
                              </Button>
                            </Paper>
                          </Grid>
                        ))
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Map View */}
          <Grid item xs={12}>
            <Fade in timeout={1000}>
              <Card elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ bgcolor: 'primary.main', p: 3 }}>
                  <Typography variant="h5" fontWeight={700} color="white" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1 }} />
                    Job Locations
                  </Typography>
                </Box>
                <Box sx={{ height: 400 }}>
                  <MapContainer
                    center={[9.9312, 76.2673]}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {availableJobs.map((userGroup) => (
                      userGroup.items.map((item) => (
                        <Marker key={item._id} position={[item.location.lat, item.location.long]}>
                          <Popup>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {item.type} - {item.quantity}kg
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                ${(item.quantity * 0.5).toFixed(2)}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Client: {userGroup.userName}
                              </Typography>
                            </Box>
                          </Popup>
                        </Marker>
                      ))
                    ))}
                  </MapContainer>
                </Box>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Assignment Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Accept Job Assignment
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to accept this job?
              </Typography>
              <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                  {selectedItem.type} - {selectedItem.quantity}kg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Client: {selectedItem.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled: {selectedItem.scheduledDate ? new Date(selectedItem.scheduledDate).toLocaleDateString() : 'No date set'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Value: ${(selectedItem.quantity * 0.5).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button
            onClick={() => assignItem(middlemanId, selectedItem?._id)}
            variant="contained"
            disabled={loading}
            sx={{ fontWeight: 600 }}
          >
            {loading ? <CircularProgress size={20} /> : 'Accept Job'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartnerDashboard;
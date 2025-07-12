import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Card, CardContent, Grid, Fade } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <RecyclingIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Eco-Friendly',
    desc: 'Committed to reducing environmental impact with sustainable practices.'
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Fast Delivery',
    desc: 'Efficient service ensuring timely recycling pickups and deliveries.'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Community Focused',
    desc: 'Empowering local communities through innovative recycling solutions.'
  }
];

const Home = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="background.default">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight={800} fontFamily="Montserrat" color="#fff">
            GreenCycle Express
          </Typography>
          <Box>
            <Button component={Link} to="/client-login" color="inherit" sx={{ fontWeight: 600, mx: 1 }}>Client Login</Button>
            <Button component={Link} to="/delivery-login" color="inherit" sx={{ fontWeight: 600, mx: 1 }}>Partner Login</Button>
            <Button component={Link} to="/company-login" color="inherit" sx={{ fontWeight: 600, mx: 1 }}>Company Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ flex: 1, py: 8 }}>
        <Fade in timeout={1200}>
          <Box textAlign="center" mb={8}>
            <Typography variant="h2" fontWeight={800} color="primary.main" gutterBottom>
              Delivering a Sustainable Future
            </Typography>
            <Typography variant="h5" color="text.secondary" mb={4}>
              At GreenCycle Express, we connect communities with reliable recycling services.<br/>
              Experience eco-friendly delivery that transforms waste into opportunity.
            </Typography>
            <Button component={Link} to="/" variant="contained" size="large" color="secondary" sx={{ borderRadius: 25, px: 5, fontWeight: 700, fontSize: 18, boxShadow: 3 }}>
              Discover Our Services
            </Button>
          </Box>
        </Fade>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <Fade in timeout={1000 + idx * 400}>
                <Card elevation={3} sx={{ borderRadius: 4, minHeight: 220, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    {feature.icon}
                    <Typography variant="h6" fontWeight={700} mt={2} mb={1} color="primary.main">
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
        
        {/* Company Section */}
        <Box mt={8}>
          <Typography variant="h3" fontWeight={700} textAlign="center" color="primary.main" gutterBottom>
            For Recycling Companies
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" mb={6}>
            Join our network of verified recycling companies and help us build a sustainable future
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={1400}>
                <Card elevation={3} sx={{ borderRadius: 4, minHeight: 280, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <GroupsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" fontWeight={700} mb={2} color="primary.main">
                      Company Dashboard
                    </Typography>
                    <Typography color="text.secondary" mb={3}>
                      Manage recycling operations, track deliveries, and monitor your company's performance.
                    </Typography>
                    <Button component={Link} to="/company-login" variant="contained" fullWidth sx={{ fontWeight: 600 }}>
                      Access Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={1600}>
                <Card elevation={3} sx={{ borderRadius: 4, minHeight: 280, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <RecyclingIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" fontWeight={700} mb={2} color="primary.main">
                      Verify Deliveries
                    </Typography>
                    <Typography color="text.secondary" mb={3}>
                      Verify and approve recycling deliveries, ensuring quality control and compliance.
                    </Typography>
                    <Button component={Link} to="/company-verify-delivery" variant="contained" fullWidth sx={{ fontWeight: 600 }}>
                      Verify Deliveries
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in timeout={1800}>
                <Card elevation={3} sx={{ borderRadius: 4, minHeight: 280, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" fontWeight={700} mb={2} color="primary.main">
                      Join Our Network
                    </Typography>
                    <Typography color="text.secondary" mb={3}>
                      Register your recycling company and start processing deliveries from our network.
                    </Typography>
                    <Button component={Link} to="/company-signup" variant="contained" fullWidth sx={{ fontWeight: 600 }}>
                      Register Company
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box component="footer" py={3} bgcolor="primary.main" textAlign="center">
        <Typography color="#fff" fontWeight={500}>
          &copy; {new Date().getFullYear()} GreenCycle Express. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
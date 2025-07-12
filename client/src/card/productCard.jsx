import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { AttachMoney, ShoppingCart } from '@mui/icons-material';

const Product = ({ imageurl, title, price, onselect }) => {
  return (
    <Card 
      elevation={4} 
      sx={{ 
        borderRadius: 3, 
        overflow: 'hidden',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
        '&:hover': { 
          transform: 'translateY(-8px)',
          boxShadow: 8
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageurl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} color="primary.main" gutterBottom>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AttachMoney sx={{ color: 'success.main', mr: 0.5 }} />
          <Typography variant="h5" fontWeight={700} color="success.main">
            {price}
          </Typography>
        </Box>
        
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={onselect}
          startIcon={<ShoppingCart />}
          sx={{ 
            fontWeight: 600,
            borderRadius: 2,
            py: 1,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
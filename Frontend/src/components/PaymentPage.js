import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Paper, Card, CardMedia, CardContent } from '@mui/material';

function PaymentPage() {
  const location = useLocation();
  const { productImage, productPrice, productName } = location.state || { productImage: null, productPrice: null, productName: null };
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(paymentInfo);
    alert('Processing payment...');
  };

  return (
    <Paper elevation={3} style={{ padding: '30px', margin: '50px auto', maxWidth: 900, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Payment Details
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:5000/${productImage}`}
              alt="Product Image"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {productName}
              </Typography>
              <Typography variant="h6" component="div">
                Price: ₹{productPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              required
            />
            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Grid item xs={6}>
                <TextField
                  label="Expiry Date"
                  variant="outlined"
                  fullWidth
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <TextField
              label="Card Holder Name"
              variant="outlined"
              fullWidth
              name="cardHolderName"
              value={paymentInfo.cardHolderName}
              onChange={handleChange}
              required
              style={{ marginTop: 16 }}
            />
            <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: 16 }}>
              Pay Now
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PaymentPage;

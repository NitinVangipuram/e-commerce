import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Checkbox, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AdminPage() {
  const [productInfo, setProductInfo] = useState({
    name: '',
    propertyDescription: '',
    price: '',
    inStock: true,
    category: ''
  });
  const [aboutThisItem, setAboutThisItem] = useState(['']);
  const [additionalInformation, setAdditionalInformation] = useState([{
    key: '',
    value: ''
  }]);
  const [images, setImages] = useState([]); // Changed to support multiple images
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files); // Log the FileList object
    setImages(Array.from(e.target.files));
};



  const handleAboutThisItemChange = (index, value) => {
    const updatedItems = aboutThisItem.map((item, i) => i === index ? value : item);
    setAboutThisItem(updatedItems);
  };

  const addAboutThisItem = () => {
    setAboutThisItem([...aboutThisItem, '']);
  };

  const removeAboutThisItem = (index) => {
    setAboutThisItem(aboutThisItem.filter((_, i) => i !== index));
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedInfo = additionalInformation.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setAdditionalInformation(updatedInfo);
  };

  const addAdditionalInfo = () => {
    setAdditionalInformation([...additionalInformation, { key: '', value: '' }]);
  };

  const removeAdditionalInfo = (index) => {
    setAdditionalInformation(additionalInformation.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(images); // Check what is actually in the state at submission
    images.forEach((file) => {
        formData.append('images', file); // Correctly appending each file under the same key 'images'
    });
    formData.append('aboutThisItem', JSON.stringify(aboutThisItem));
    formData.append('additionalInformation', JSON.stringify(
      additionalInformation.reduce((acc, { key, value }) => {
        if (key && value) acc[key.trim()] = value.trim();
        return acc;
      }, {})
    ));
    Object.keys(productInfo).forEach(key => {
        formData.append(key, productInfo[key]);
    });

    try {
        const response = await axios.post('http://localhost:5000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        alert('Product added successfully');
        console.log(response.data); // Check server response
    } catch (error) {
        console.error(error);
        alert('Error adding product');
    }
};

  return (
    <div style={{ padding: 20 }}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h5" gutterBottom>Add New Product</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={productInfo.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Property Description"
            name="propertyDescription"
            value={productInfo.propertyDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Category"
                name="category"
                value={productInfo.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                value={productInfo.price}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          {aboutThisItem.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <TextField
                label="About This Item"
                value={item}
                onChange={(e) => handleAboutThisItemChange(index, e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => removeAboutThisItem(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button onClick={addAboutThisItem} variant="outlined" color="primary" style={{ marginBottom: 16 }}>Add More</Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {additionalInformation.map((info, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={info.key}
                      onChange={(e) => handleAdditionalInfoChange(index, 'key', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={info.value}
                      onChange={(e) => handleAdditionalInfoChange(index, 'value', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeAdditionalInfo(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={addAdditionalInfo} variant="outlined" color="primary" style={{ marginBottom: 16 }}>Add Field</Button>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <Typography>In Stock:</Typography>
            <Checkbox
              checked={productInfo.inStock}
              onChange={() => setProductInfo({ ...productInfo, inStock: !productInfo.inStock })}
            />
          </div>
          <input
            type="file"
            multiple // Allow multiple files
            onChange={handleImageChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>Add Product</Button>
        </form>
      </Paper>
    </div>
  );
}

export default AdminPage;

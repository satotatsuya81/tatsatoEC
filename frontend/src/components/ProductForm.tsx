import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl } from '@mui/material';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    const response = await axios.get<Category[]>('http://10.0.2.2:80/categories');
    setCategories(response.data);
  };

  const fetchProduct = async () => {
    const response = await axios.get(`http://10.0.2.2:80/products/${id}`);
    const product = response.data;
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.category.id,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await axios.patch(`http://10.0.2.2:80/products/${id}`, formData);
    } else {
      await axios.post('http://10.0.2.2:80/products', formData);
    }
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="stock"
        label="Stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleSelectChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update' : 'Create'} Product
      </Button>
    </form>
  );
};

export default ProductForm;

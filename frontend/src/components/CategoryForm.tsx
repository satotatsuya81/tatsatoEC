import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

interface CategoryFormData {
  name: string;
}

const CategoryForm: React.FC = () => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    const response = await axios.get(`http://10.0.2.2:80/categories/${id}`);
    setFormData(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await axios.patch(`http://10.0.2.2:80/categories/${id}`, formData);
    } else {
      await axios.post('http://10.0.2.2:80/categories', formData);
    }
    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Category Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update' : 'Create'} Category
      </Button>
    </form>
  );
};

export default CategoryForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

interface UserFormData {
  username: string;
  email: string;
  password: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost/users/${id}`);
    setFormData(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await axios.patch(`http://localhost/users/${id}`, formData);
    } else {
      await axios.post('http://localhost/users', formData);
    }
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update' : 'Create'} User
      </Button>
    </form>
  );
};

export default UserForm;

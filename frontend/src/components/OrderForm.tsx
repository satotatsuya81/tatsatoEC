import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface OrderFormData {
  userId: number;
  totalAmount: number;
  status: string;
}

interface User {
  id: number;
  username: string;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    userId: 0,
    totalAmount: 0,
    status: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchUsers = async () => {
    const response = await axios.get<User[]>('http://localhost/users');
    setUsers(response.data);
  };

  const fetchOrder = async () => {
    const response = await axios.get(`http://localhost/orders/${id}`);
    setFormData(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await axios.patch(`http://localhost/orders/${id}`, formData);
    } else {
      await axios.post('http://localhost/orders', formData);
    }
    navigate('/orders');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          name="userId"
          value={formData.userId.toString()}
          onChange={handleSelectChange}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="totalAmount"
        label="Total Amount"
        type="number"
        value={formData.totalAmount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          name="status"
          value={formData.status}
          onChange={handleSelectChange}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update' : 'Create'} Order
      </Button>
    </form>
  );
};

export default OrderForm;

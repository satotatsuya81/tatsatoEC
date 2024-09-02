import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  user: {
    id: number;
    username: string;
  };
  totalAmount: number;
  createdAt: string;
  status: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get<Order[]>('http://10.0.2.2:80/orders');
    setOrders(response.data);
  };

  const deleteOrder = async (id: number) => {
    await axios.delete(`http://10.0.2.2:80/orders/${id}`);
    fetchOrders();
  };

  return (
    <div>
      <h2>Orders</h2>
      <Button component={Link} to="/orders/new" variant="contained" color="primary">
        Create New Order
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user.username}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/orders/edit/${order.id}`} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => deleteOrder(order.id)} variant="contained" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderList;

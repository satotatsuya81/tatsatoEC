import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  user: {
    id: number;
    username: string;
  };
  totalAmount: number;
  status: string;
  orderItems: OrderItem[];
}

const OrderItemList: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    const response = await axios.get<Order>(`http://localhost/orders/${id}`);
    setOrder(response.data);
  };

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">Order Details</Typography>
      <Typography>Order ID: {order.id}</Typography>
      <Typography>User: {order.user.username}</Typography>
      <Typography>Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
      <Typography>Status: {order.status}</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderItemList;

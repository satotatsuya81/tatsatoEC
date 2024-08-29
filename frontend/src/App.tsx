import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderItemList from './components/OrderItemList';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-commerce Admin
          </Typography>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/categories">
            Categories
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Orders
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/new" element={<OrderForm />} />
        <Route path="/orders/edit/:id" element={<OrderForm />} />
        <Route path="/order-items" element={<OrderItemList />} />
        <Route path="/orders/:id/items" element={<OrderItemList />} />
      </Routes>
    </Router>
  );
};

export default App;

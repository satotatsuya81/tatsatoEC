import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: {
    id: number;
    name: string;
  };
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get<Product[]>('http://10.0.2.2:80/products');
    setProducts(response.data);
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://10.0.2.2:80/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <Button component={Link} to="/products/new" variant="contained" color="primary">
        Add New Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/products/edit/${product.id}`} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => deleteProduct(product.id)} variant="contained" color="secondary">
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

export default ProductList;

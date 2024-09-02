import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get<Category[]>('http://10.0.2.2:80/categories');
    setCategories(response.data);
  };

  const deleteCategory = async (id: number) => {
    await axios.delete(`http://10.0.2.2:80/categories/${id}`);
    fetchCategories();
  };

  return (
    <div>
      <h2>Categories</h2>
      <Button component={Link} to="/categories/new" variant="contained" color="primary">
        Add New Category
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/categories/edit/${category.id}`} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => deleteCategory(category.id)} variant="contained" color="secondary">
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

export default CategoryList;

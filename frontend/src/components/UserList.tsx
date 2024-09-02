import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get<User[]>('http://10.0.2.2:80/users');
    setUsers(response.data);
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`http://10.0.2.2:80/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h2>Users</h2>
      <Button component={Link} to="/users/new" variant="contained" color="primary">
        Add New User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/users/edit/${user.id}`} variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => deleteUser(user.id)} variant="contained" color="secondary">
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

export default UserList;

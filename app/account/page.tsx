'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios';

export default function AccountPage() {
  const [user, setUser] = useState({ id: '', name: '', email: '' });
  const [formValues, setFormValues] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://127.0.0.1:8000/api/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error: any) {
      console.error('Error fetching account data:', error);
      setError('Failed to fetch account data. Please log in again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setFormValues({ name: user.name, email: user.email });
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${user.id}`,
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUser(response.data.user);

      setSuccessMessage(response.data.message);

      setShowForm(false);

    } catch (error: any) {
      console.error('Error updating account:', error);
      setError('Failed to update account data.');
    }
  };

  const handleCancel = () => {
    setFormValues({ name: user.name, email: user.email });
    setShowForm(false);
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Mon Compte</h2>

        {successMessage && (
          <div style={{ textAlign: 'center', color: 'green', marginBottom: '20px' }}>
            {successMessage}
          </div>
        )}

        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Nom</TableCell>
                <TableCell>{user.name || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell>{user.email || 'N/A'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Modifier les Informations
          </Button>
        </div>

        <Dialog open={showForm} onClose={handleCancel}>
          <DialogTitle>Modifier les Informations</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nom"
              name="name"
              fullWidth
              value={formValues.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={formValues.email}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
}
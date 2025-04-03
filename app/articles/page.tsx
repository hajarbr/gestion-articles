'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Pagination,
} from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  content: string;
  author?: string;
  publishedAt?: string | null;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get(`http://127.0.0.1:8000/api/articles?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setArticles(response.data.data || []);
      setTotalPages(Math.ceil(response.data.totalItems / response.data.itemsPerPage));
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      if (editingArticle) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/articles/${editingArticle.id}`,
          newArticle,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setArticles(articles.map((article) =>
          article.id === editingArticle.id ? response.data : article
        ));
        setEditingArticle(null);
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/articles',
          newArticle,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        setArticles([response.data.article, ...articles]);
      }
  
      setNewArticle({ title: '', content: '', author: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting article:', error);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setNewArticle({ title: article.title, content: article.content, author: article.author || '' });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://127.0.0.1:8000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Liste des Articles</h2>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setShowForm(true);
              setEditingArticle(null);
              setNewArticle({ title: '', content: '', author: '' });
            }}
          >
            Ajouter un Article
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Auteur</TableCell>
                <TableCell>Date de Publication</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.author || 'N/A'}</TableCell>
                  <TableCell>
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(article)}
                      style={{ marginRight: '10px' }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(article.id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>

        <Dialog open={showForm} onClose={() => setShowForm(false)}>
          <DialogTitle>{editingArticle ? 'Modifier l\'Article' : 'Ajouter un Article'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Titre"
              name="title"
              fullWidth
              value={newArticle.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Contenu"
              name="content"
              fullWidth
              multiline
              rows={4}
              value={newArticle.content}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editingArticle ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
}
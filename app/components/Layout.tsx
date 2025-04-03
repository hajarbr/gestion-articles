import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import '../globals.css'; // Ensure the correct path to your global styles

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');

    router.push('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gestion des Articles
          </Typography>
          <Button color="inherit" href="/account">Gestion de compte</Button>
          <Button color="inherit" href="/articles">Gestion des Articles</Button>
          <Button color="inherit" onClick={handleLogout}>Se déconnecter</Button>
        </Toolbar>
      </AppBar>

      <Container style={{ flexGrow: 1, marginTop: '20px', marginBottom: '20px' }}>
        {children}
      </Container>

      <Box
        component="footer"
        style={{
          textAlign: 'center',
          padding: '10px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2025 Gestion des Articles. Tous droits réservés.
        </Typography>
      </Box>
    </div>
  );
}
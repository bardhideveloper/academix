import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import AppRoutes from './routes';
import { AuthProvider } from './features/auth/AuthContext';
import { enableDevMocks } from './lib/devMock';

enableDevMocks();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

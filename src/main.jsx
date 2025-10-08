import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AntdConfigProviders, AuthProvider, CrudModalProvider, NotificationProvider, ThemeProvider } from './providers';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AntdConfigProviders>
        <NotificationProvider>
          <AuthProvider>
            <CrudModalProvider>
              <App />
            </CrudModalProvider>
          </AuthProvider>
        </NotificationProvider>
      </AntdConfigProviders>
    </ThemeProvider>
  </StrictMode>
);

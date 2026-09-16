import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { StudioContentProvider } from './context/StudioContentContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudioContentProvider>
      <App />
    </StudioContentProvider>
  </StrictMode>,
);


import {MotionConfig} from 'motion/react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { StudioContentProvider } from './context/StudioContentContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudioContentProvider>
      <MotionConfig reducedMotion="user"><App /></MotionConfig>
    </StudioContentProvider>
  </StrictMode>,
);


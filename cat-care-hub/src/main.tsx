import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import '@fontsource/noto-sans-sc/500.css';
import '@fontsource/noto-sans-sc/600.css';
import '@fontsource/noto-sans-sc/900.css';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

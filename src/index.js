import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';

// Bug 1: Les données ne sont pas mises en cache correctement
// Le staleTime est défini à 0, ce qui fait que les données sont considérées comme périmées immédiatement
// et sont donc refetchées à chaque fois
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Devrait être plus élevé pour un bon caching
      cacheTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

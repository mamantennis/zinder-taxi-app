import React from 'react';
import { Toaster } from 'sonner';
import { Layout } from './components/Layout';
import { BookingProvider } from './context/BookingContext';
import { AppContent } from './components/AppContent';

function App() {
  return (
    <BookingProvider>
      <Layout>
        <AppContent />
      </Layout>
      <Toaster position="top-center" richColors />
    </BookingProvider>
  );
}

export default App;
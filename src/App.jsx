import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ProductsProvider } from './context/ProductsContext';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <AppRoutes />
      </ProductsProvider>
    </Router>
  );
}

export default App;

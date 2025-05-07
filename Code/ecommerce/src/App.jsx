import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Layout from './components/layout/Layout';
import { CartProvider } from './contexts/CartContext';
import MainRoutes from "./routes.jsx";

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <MainRoutes/>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;
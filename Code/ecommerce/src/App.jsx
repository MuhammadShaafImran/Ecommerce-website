import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Layout from './components/layout/Layout';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import MainRoutes from "./routes.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <MainRoutes/>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
import Home from './pages/home'
import Navbar from './compnents/navbar'
import Footer from './pages/footer'
import ProductDetail from './pages/ProductDetails'
import ProductReviews from './pages/Test'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return(
    <>
      <Navbar/>
      <Home/>
      <ProductDetail />
      <ProductReviews />
      <Login />
      <Register/>
      <Footer/>
    </>
  )
}

export default App

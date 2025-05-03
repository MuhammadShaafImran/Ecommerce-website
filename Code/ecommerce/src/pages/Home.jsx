import ServiceSection from '../components/ServicesSection';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TopItems from '../components/TopProducts';
import NewProduct from '../components/NewProducts';
import About from './About';
import Contact from './Contact';
import Additional_Info from '../components/Additional-Info';


export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <TopItems/>
      <NewProduct/>
      <About/>
      <Contact/>
      <ServiceSection/>
      <Footer/>
    </>
  );
}
;
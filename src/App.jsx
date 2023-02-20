import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "./components/home/HomePage";
import NavBar from "./components/general/NavBar";
import Footer from './components/general/Footer';
import PageNotFound from './components/general/PageNotFound';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import MortgageDeals from './components/mortgage-deals/MortgageDeals';

const App = () => {
  const location = useLocation()
  return (
    <>
      <NavBar />
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/calculator' element={<MortgageDeals />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
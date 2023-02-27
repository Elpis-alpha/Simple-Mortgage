import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from "./components/home/HomePage";
import NavBar from "./components/general/NavBar";
import Footer from './components/general/Footer';
import PageNotFound from './components/general/PageNotFound';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import MortgageCalculator from './components/mortgage-calculator/MortgageCalculator';
import Forms from './components/application/Forms';
import PersonalBridgingLoanApplication from './components/application/PersonalBridgingLoanApplication';
import Agreement from './components/application/Agreement';
import Application from './components/application/Application';
import FetchAppData from './components/general/FetchAppData';
import Signup from './components/auth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import ProtectPage from './components/general/ProtectPage';

const App = () => {
  const location = useLocation()
  return (
    <>
      <FetchAppData />
      <ToastContainer />
      <NavBar light={false} />
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/calculator' element={<MortgageCalculator />} />
        <Route path='/application' element={<ProtectPage><Application /></ProtectPage>} />
        <Route path='/application/forms' element={<ProtectPage><Forms /></ProtectPage>} />
        <Route path='/application/agreement' element={<ProtectPage><Agreement /></ProtectPage>} />
        <Route path='/archive/forms/personal-bridging-loan-application' element={<PersonalBridgingLoanApplication />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
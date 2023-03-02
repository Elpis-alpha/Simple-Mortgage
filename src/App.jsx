import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom';

import { siteName } from './utils';

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
import { useEffect } from 'react';

const App = () => {
  const location = useLocation()
  const action = useNavigationType();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case '/':
        title = siteName;
        metaDescription = "When it comes to first-time mortgages, remortgages, customized rates, and their brand, award-winning, professional mortgage and insurance services provider MASTER YOUR MORTGAGE tells you exactly what to anticipate.";
        break;

      case '/contact':
        title = siteName + " | Contact us";
        metaDescription = "Send MASTER YOUR MORTGAGE a message using the contact form, email them a letter, or give them a call to begin your quest for a mortgage that will save you money.";
        break;

      case '/about':
        title = siteName  + " | About us";
        metaDescription = "When it comes to first-time mortgages, remortgages, customized rates, and their brand, award-winning, professional mortgage and insurance services provider MASTER YOUR MORTGAGE tells you exactly what to anticipate.";
        break;

      case '/signup':
        title = siteName  + " | Sign up";
        metaDescription = "Sign up with MASTER YOUR MORTGAGE to access their forms and agreements";
        break;

      case '/login':
        title = siteName + " | Log in";
        metaDescription = "Log in with MASTER YOUR MORTGAGE to access their forms and agreements";
        break;

      case '/calculator':
        title = siteName + " | Calculator";
        metaDescription = "Use our free mortgage calculator to estimate your monthly mortgage payments. Account for interest rates and down payments in an easy to use interface.";
        break;

      case '/application':
        title = siteName + " | Application";
        metaDescription = "Make an application at MASTER YOUR MORTGAGE here";
        break;

      case '/application/forms':
        title = siteName + " | Forms";
        metaDescription = "Check out all the necessary forms that pertains to our mortgage services at MASTER YOUR MORTGAGE";
        break;

      case '/application/agreement':
        title = siteName + " | Agreements";
        metaDescription = "Check out all the necessary agreements that pertains to our mortgage services at MASTER YOUR MORTGAGE";
        break;

      default:
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

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
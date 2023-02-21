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

const App = () => {
  const location = useLocation()
  return (
    <>
      <NavBar light={location.pathname !== "/"} />
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/calculator' element={<MortgageCalculator />} />
        <Route path='/application' element={<Application />} />
        <Route path='/application/forms' element={<Forms />} />
        <Route path='/application/agreement' element={<Agreement />} />
        <Route path='/archive/forms/personal-bridging-loan-application' element={<PersonalBridgingLoanApplication />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
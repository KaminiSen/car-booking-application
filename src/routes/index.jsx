import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import VehicleSelectionPage from '../pages/vehicleSelection';
import PassengerInformationPage from '../pages/passengerInfo';
import InvoicePage from '../pages/invoice';

const AppRoutes = () => {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle-selection" element={<VehicleSelectionPage />} />
        <Route path="/passenger-information" element={<PassengerInformationPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
      <Footer/>
     </>
  );
};

export default AppRoutes;

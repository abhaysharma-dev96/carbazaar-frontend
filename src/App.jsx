import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import SellCar from "./pages/SellCar";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/sell" element={<SellCar />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cars/:id/edit" element={<EditCar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import CompareBar from "./components/cars/CompareBar";
import Compare from "./pages/Compare";
import BikeListing from "./pages/BikeListing";
import VehicleCategory from "./pages/VehicleCategory";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
 path="/vehicles" 
 element={<VehicleCategory />} 
/>
        <Route path="/cars" element={<CarListing />} />
<Route path="/bikes" element={<BikeListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/sell" element={<SellCar />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cars/:id/edit" element={<EditCar />} />
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
      <Footer />
<CompareBar />
    </>
  );
}

export default App;
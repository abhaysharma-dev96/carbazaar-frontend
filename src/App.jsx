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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<CarListing />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/bikes" element={<BikeListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      

        {/* Protected Routes */}
        <Route path="/sell" element={
          <ProtectedRoute><SellCar /></ProtectedRoute>
        } />
        <Route path="/cars/:id/edit" element={
          <ProtectedRoute><EditCar /></ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute><Wishlist /></ProtectedRoute>
        } />
       <Route path="/compare" element={
          <ProtectedRoute><Compare /></ProtectedRoute>
        } />
        <Route path="/contact" element={
          <ProtectedRoute><ContactUs /></ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <CompareBar />
    </>
  );
}

export default App;
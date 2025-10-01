
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav1 from "./navbar/Nav1"; 
import Tourist from "./body/Tourist"; 
import CityPlaces from "./body/CityPlaces"; 
import Hotels from "./body/Hotels"; // Make sure Hotels.jsx exists
import './App.css';
import './Footer'
import Footer from "./Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar visible on all pages */}
        <Nav1 />

        <div className="p-4">
          <Routes>
            {/* Home / Cities page */}
            <Route path="/" element={<Tourist />} />
            <Route path="/cities" element={<Tourist />} />
            <Route path="/tourist" element={<Tourist />} />

            {/* City places */}
            <Route path="/city/:cityName" element={<CityPlaces />} />

            {/* Hotels for a city */}
            <Route path="/hotels/:cityName" element={<Hotels />} />

            {/* Fallback route */}
            <Route path="*" element={<p className="text-center text-red-500 mt-8">Page Not Found</p>} />
          </Routes>
        </div>
        
      </div>
      <Footer />
    </Router>
  );
}
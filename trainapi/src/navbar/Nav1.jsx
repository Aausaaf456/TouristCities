import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import './nav1.css';

export default function Nav1() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const cities = [
    "Mumbai",
    "Delhi",
    "Jaipur",
    "Hyderabad",
    "Goa",
    "Agra",
    "Shimla",
    "Kashmir",
    "Chandigarh",
    "Nagpur",
    "Nashik",
    "Kolkata",
    "Khuldabad",
    
  ];

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
          Travel Website
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/tourist" className="hover:text-gray-200">Home</Link>
          <Link to="/cities" className="hover:text-gray-200">Tourist Cities</Link>

          {/* Hotels Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-200">Hotels</button>
            <div className="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow-lg z-10">
              {cities.map((city) => (
                <div
                  key={city}
                  onClick={() => navigate(`/hotels/${city.toLowerCase()}`)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {city} Hotels
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Links */}
      {open && (
        <div className="flex flex-col mt-4 space-y-2 md:hidden">
          <Link to="/tourist" className="hover:bg-blue-700 px-2 py-1 rounded" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/cities" className="hover:bg-blue-700 px-2 py-1 rounded" onClick={() => setOpen(false)}>Tourist Cities</Link>

          {/* Hotels Mobile Dropdown */}
          <div className="bg-blue-500 rounded px-2 py-1">
            <p className="font-semibold">Hotels</p>
            {cities.map((city) => (
              <div
                key={city}
                onClick={() => {
                  navigate(`/hotels/${city.toLowerCase()}`);
                  setOpen(false);
                }}
                className="hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
              >
                {city} Hotels
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
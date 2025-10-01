import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './body1.css';

export default function Hotels() {
  const { cityName } = useParams(); // grabs city name from URL
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/${cityName}`);
        setHotels(res.data.hotels || []);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setHotels([]);
      }
      setLoading(false);
    };

    fetchHotels();
  }, [cityName]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4 capitalize">{cityName} - Hotels</h2>

      {loading ? (
        <p>Loading hotels...</p>
      ) : hotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="border p-3 rounded shadow-sm bg-white hover:shadow-md"
            >
              <img
                src={hotel.image || "/images/default-hotel.jpg"} // fallback image
                alt={hotel.name}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <p className="text-sm text-gray-600">{hotel.kinds}</p>
              <p className="text-sm mt-1">Lat: {hotel.lat}, Lon: {hotel.lon}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hotels found for this city.</p>
      )}
    </div>
  );
}
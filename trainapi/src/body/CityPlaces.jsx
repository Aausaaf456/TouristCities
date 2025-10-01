import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CityPlaces() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/places/${cityName}`
        );
        setPlaces(res.data.attractions || []);
      } catch (err) {
        console.error("Error fetching attractions:", err);
        setPlaces([]);
      }
      setLoading(false);
    };

    fetchPlaces();
  }, [cityName]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4 capitalize">
        {cityName} - Tourist Places
      </h2>

      {loading ? (
        <p>Loading attractions...</p>
      ) : places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {places.map((place, idx) => (
            <div
              key={idx}
              className="border p-3 rounded shadow-sm bg-white hover:shadow-md"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h3 className="font-bold text-lg">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.kinds}</p>
              <p className="text-sm mt-1">
                Lat: {place.lat}, Lon: {place.lon}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No attractions found for this city.</p>
      )}
    </div>
  );
}
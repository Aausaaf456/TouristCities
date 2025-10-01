import { useNavigate } from "react-router-dom";
import './body1.css';

const cities = [
  { name: "Mumbai", image: "./mumbai.jpg" },
  { name: "Delhi", image: "./delhi.webp" },
  { name: "Hyderabad", image: "./hyderabad.jpg" },
  { name: "Shimla", image: "./shimla.jpg" },
  { name: "Kashmir", image: "./kashmir.webp" },
  { name: "agra", image: "./agra.webp" },
  { name: "Jaipur", image: "./jaipur.webp" },
  { name: "Goa", image: "./goa.jpg" },
  { name: "Kolkata", image: "./kolkata.webp" },
  { name: "Amritsar", image: "./amritsar.jpg" },
  { name: "Chandigarh", image: "./chandigarh.webp" },
  { name: "Chennai", image: "./chennai.webp" },
  { name: "Nashik", image: "./Nashik.webp" },
  { name: "Nagpur", image: "./nagpur.webp" },
  { name: "Khuldabad", image: "./khuldabad.webp" },

  // Add more cities as needed

];

export default function Tourist() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6 border-collapse shadow-sm">Tourist Cities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city.name}
            onClick={() => navigate(`/city/${city.name.toLowerCase()}`)}
            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={city.image}
              alt={city.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{city.name}</h3>
              <p className="text-gray-600">Explore attractions Places</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Replace with your OpenTripMap RapidAPI key

// Route to get attractions for a city
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const RAPIDAPI_KEY = "8cf501ae67msh704547314d25ad0p1141dfjsncde47cfb6283";  // Replace with your RapidAPI key

// ✅ Predefined city coordinates (so Mumbai/Delhi/Jaipur never fail)
const CITY_COORDS = {
  mumbai: { lat: 19.076, lon: 72.8777 },
  delhi: { lat: 28.6139, lon: 77.209 },
  jaipur: { lat: 26.9124, lon: 75.7873 },
  hyderabad: { lat: 17.385, lon: 78.4867 },
  goa: { lat: 15.2993, lon: 74.124 },
  agra: { lat: 27.1767, lon: 78.0081 },
  shimla: { lat: 31.1048, lon: 77.1734 },
  kashmir: { lat: 34.0837, lon: 74.7973 },
};

// 🔹 Utility: get coordinates (from map first, fallback to API)
async function getCityCoordinates(cityName) {
  const lowerCity = cityName.toLowerCase();
  if (CITY_COORDS[lowerCity]) {
    return CITY_COORDS[lowerCity];
  }

  try {
    const geoRes = await axios.get(
      "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname",
      {
        params: { name: cityName, country: "IN" },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );
    if (geoRes.data.lat && geoRes.data.lon) {
      return { lat: geoRes.data.lat, lon: geoRes.data.lon };
    }
  } catch (err) {
    console.error("Geo API error:", err.message);
  }
  return null;
}

// 🎯 Tourist Places
app.get("/api/places/:cityName", async (req, res) => {
  const { cityName } = req.params;
  const coords = await getCityCoordinates(cityName);
  if (!coords) return res.status(404).json({ error: "City not found" });

  try {
    const attractionsRes = await axios.get(
      "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
      {
        params: { lat: coords.lat, lon: coords.lon, radius: 10000, limit: 20, rate: 3 },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    const attractions = await Promise.all(
      (attractionsRes.data.features || []).map(async (p) => {
        let image = "/images/default.jpg";
        try {
          const detailRes = await axios.get(
            `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${p.properties.xid}`,
            {
              headers: {
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
              },
            }
          );
          if (detailRes.data.preview?.source) {
            image = detailRes.data.preview.source;
          }
        } catch {}
        return {
          name: p.properties.name,
          kinds: p.properties.kinds,
          xid: p.properties.xid,
          lat: p.geometry.coordinates[1],
          lon: p.geometry.coordinates[0],
          image,
        };
      })
    );

    res.json({ city: cityName, attractions });
  } catch (err) {
    console.error("Places API error:", err.message);
    res.status(500).json({ error: "Failed to fetch attractions" });
  }
});

// 🎯 Hotels
app.get("/api/hotels/:cityName", async (req, res) => {
  const { cityName } = req.params;

  try {
    // 1️⃣ Get city coordinates
    const geoRes = await axios.get(
      "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname",
      {
        params: { name: cityName, country: "IN" },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    const { lat, lon } = geoRes.data;
    if (!lat || !lon) return res.status(404).json({ error: "City not found" });

    // 2️⃣ Get hotels (only valid kind)
    const hotelsRes = await axios.get(
      "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
      {
        params: {
          lat,         // ✅ use lat
          lon,         // ✅ use lon
          radius: 10000,
          limit: 20,
          kinds: "other_hotels" // ✅ valid category
        },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
      }
    );

    // 3️⃣ Map results and get images
    const hotels = await Promise.all(
      (hotelsRes.data.features || []).map(async (h) => {
        let image = "/images/default-hotel.jpg";
        try {
          const detailRes = await axios.get(
            `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${h.properties.xid}`,
            {
              headers: {
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
              },
            }
          );
          if (detailRes.data.preview?.source) {
            image = detailRes.data.preview.source;
          }
        } catch (err) {
          console.log("No image for", h.properties.name);
        }

        return {
          name: h.properties.name,
          xid: h.properties.xid,
          lat: h.geometry.coordinates[1],
          lon: h.geometry.coordinates[0],
          image,
        };
      })
    );

    res.json({ city: cityName, hotels });
  } catch (err) {
    console.error("Hotels API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});
app.listen(5000, () => console.log("✅ Server running on port 5000"));


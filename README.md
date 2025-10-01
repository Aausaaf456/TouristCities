# 🌍 TouristCities Website  

A **full-stack project** that helps users explore tourist cities in India.  

It provides:  
- 🏨 Hotels & places data (from **touristbackend**)  
- places & Hotels (from **trainapi**)  

---

## ✨ Features  

- 🔍 Search for hotels in Indian cities using **OpenTripMap API**  
- 🖼️ Get images & details for tourist attractions  
- 🚆 Fetch train details for travel planning  
- 🔗 Simple REST APIs that can connect to a **React frontend**  

---

## 🛠️ Tech Stack  

- **Backend:** Node.js, Express  
- **APIs:** OpenTripMap (hotels & places), IRCTC/Train API (for schedules)  
- **Database (optional):** MongoDB (future support)  
- **Frontend (planned):** React + Vite + TailwindCSS  

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Aausaaf456/TouristCities.git
cd TouristCities
2️⃣ Install dependencies
bash
Copy code
# For touristbackend
cd touristbackend
npm install

# For trainapi
cd ../trainapi
npm install
3️ Add environment variables
Create .env file inside each backend folder:

touristbackend/.env

env
Copy code
RAPIDAPI_KEY=your_rapidapi_key_here
PORT=5000
trainapi/.env

env
Copy code
TRAIN_API_KEY=your_train_api_key_here
PORT=4000
4️ Run servers
bash
Copy code
# Run touristbackend
cd touristbackend
node server.js

# Run trainapi
cd ../trainapi
npm run dev

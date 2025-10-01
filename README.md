# TouristCities WebSite

** A full-stack project that helps users explore tourist cities in India.
It provides:

 Hotels & places data (from touristbackend)

 Hotels & Places info (from trainapi)


## Features
 Search for hotels in Indian cities using OpenTripMap API
 Get images & details for tourist attractions
 Fetch train details for travel planning
 Simple REST APIs that can connect to a React frontend

## Teck Stack
Backend: Node.js, Express
APIs: OpenTripMap (hotels & places), IRCTC/Train API (for schedules)
Database (optional): MongoDB (future support)
Frontend (planned): React+Vite + Tailwind

## SetUp Instruction
 git clone https://github.com/Aausaaf456/TouristCities.git
cd TouristCities
 Install dependencies
bash
Copy code
# For touristbackend
cd touristbackend
npm install

# For trainapi
cd ../trainapi
npm install

 Add .env files

Create .env inside each backend folder:

touristbackend/.env

RAPIDAPI_KEY=your_rapidapi_key_here
PORT=5000


trainapi/.env

TRAIN_API_KEY=your_train_api_key_here
PORT=4000

## Run servers
# Run touristbackend
cd touristbackend
node server.js

# Run trainapi
cd ../trainapi
npm run dev

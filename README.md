# Highway Delite - Experience Booking Platform

A full-stack web application for booking adventure experiences.

## 🎯 Project Overview

Highway Delite is a modern booking platform that allows users to:
- Browse and search available experiences
- View detailed information about each activity
- Book experiences with date and time selection
- Apply promo codes for discounts
- Receive booking confirmations with reference IDs

## 🛠️ Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose** - Database and ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **UUID** - Unique ID generation

## 📁 Project Structure

```
project/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components (Header, ExperienceCard)
│   │   ├── pages/         # Route pages (Home, Details, Checkout, Confirmed)
│   │   ├── types.d.ts     # TypeScript type definitions
│   │   ├── main.tsx       # Application entry point
│   │   └── index.css      # Global styles with Tailwind
│   ├── package.json
│   └── vite.config.ts
│
├── server/                # Backend API server
│   ├── config/           # Configuration files
│   │   └── db.js         # MongoDB connection
│   ├── models/           # Mongoose schemas
│   │   ├── Experience.js # Experience data model
│   │   └── Booking.js    # Booking data model
│   ├── routes/           # API endpoints
│   │   ├── experiences.js
│   │   └── bookings.js
│   ├── data/             # Seed data
│   │   └── seed.js       # Initial experiences
│   ├── scripts/          # Utility scripts
│   │   └── seedDatabase.js
│   ├── index.js          # Server entry point
│   ├── package.json
│   └── .env              # Environment variables (not in git)
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository**

2. **Install server dependencies**
   ```powershell
   cd project\server
   npm install
   ```

3. **Install client dependencies**
   ```powershell
   cd ..\client
   npm install
   ```

4. **Configure environment variables**
   
   Create `.env` file in `project/server/`:
   ```env
   DATABASE_URL=mongodb+srv://your-connection-string
   PORT=3000
   ```

5. **Seed the database** (first time only)
   ```powershell
   cd ..\server
   npm run seed
   ```

### Running the Application

Open **two terminal windows**:

**Terminal 1 - Backend Server:**
```powershell
cd project\server
npm run dev
```
Server runs at: `http://localhost:3000`

**Terminal 2 - Frontend Client:**
```powershell
cd project\client
npm run dev
```
Client runs at: `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## 🔌 API Endpoints

### Experiences

- **GET** `/api/experiences` - Get all experiences
  - Query params: `search`, `location`, `minPrice`, `maxPrice`
  - Example: `/api/experiences?search=kayak&minPrice=500`

- **GET** `/api/experiences/:id` - Get single experience by ID

### Bookings

- **POST** `/api/bookings` - Create a new booking
- **GET** `/api/bookings/:refId` - Get booking by reference ID
- **GET** `/api/bookings?email=user@example.com` - Get bookings by email
- **POST** `/api/bookings/validate-promo` - Validate promo code

## 🎫 Promo Codes

Available promo codes:
- `WELCOME10` - 10% discount
- `SUMMER20` - 20% discount
- `FIRST` - ₹50 flat discount

## 🔒 Environment Variables

### Server (.env)
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/
PORT=3000
```

### Client (.env) - Optional
```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing the Application

1. **Browse Experiences**: Visit home page to see all available experiences
2. **Search**: Use search bar to filter by name or location
3. **View Details**: Click on any experience card to see full details
4. **Book**: Select date, time, quantity and proceed to checkout
5. **Apply Promo**: Enter promo code (e.g., WELCOME10) at checkout
6. **Confirm**: Fill in contact details, agree to terms, and confirm booking
7. **Confirmation**: Receive booking reference ID (format: HD######)

## 🐛 Troubleshooting

**Server won't start:**
- Check if MongoDB connection string is correct in `.env`
- Ensure port 3000 is not already in use
- Run `npm install` in server directory

**Client won't start:**
- Ensure port 5173 is available
- Run `npm install` in client directory
- Clear Vite cache: `rm -rf node_modules/.vite`

**Booking refId showing undefined:**
- Restart the server after updating code
- Check server logs for database connection errors
- Verify UUID package is installed

**Database connection issues:**
- Verify MongoDB Atlas IP whitelist includes your IP
- Check database user credentials
- Ensure network connectivity

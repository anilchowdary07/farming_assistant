# 🌾 AI Crop Advisory System

A production-grade full-stack web application that helps Indian farmers make data-driven crop selection decisions using AI, real-time weather data, and market intelligence.

![AI Crop Advisory](https://img.shields.io/badge/Status-Production%20Ready-success)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Flask](https://img.shields.io/badge/Flask-3.0-black)

## 🎯 Features

### For Farmers
- **Multi-Step Interactive Form**: Simple, mobile-friendly interface to input farming parameters
- **Real-Time Weather Integration**: Live weather data and 5-day forecasts from OpenWeatherMap
- **AI-Powered Recommendations**: Google Gemini AI analyzes conditions and recommends top 3 crops
- **Comprehensive Analysis**: Get investment costs, profit estimates, ROI, risk levels, and harvest timelines
- **Detailed Cultivation Guides**: Step-by-step farming instructions for each recommended crop
- **Risk Assessment**: Identify potential risks and mitigation strategies
- **Market Insights**: Trending crops and price trend analysis

### Technical Features
- **Premium UI/UX**: Glassmorphism, smooth animations, gradient cards with Framer Motion
- **Responsive Design**: Mobile-first approach, works on all devices
- **Robust Backend**: Flask REST API with proper validation and error handling
- **Type Safety**: Pydantic schemas for data validation
- **Clean Architecture**: Modular, maintainable code structure
- **Production Ready**: Environment configs, error boundaries, logging

## 🏗️ Architecture

```
Frontend (React + Vite)          Backend (Flask + Python)
┌─────────────────────┐         ┌──────────────────────┐
│  Multi-Step Form    │────────▶│  Flask REST API      │
│  - Location         │         │  /api/recommend      │
│  - Season           │         └──────────┬───────────┘
│  - Budget           │                    │
│  - Land Size        │         ┌──────────▼───────────┐
│  - Soil Type        │         │  Weather Service     │
│  - Irrigation       │         │  OpenWeatherMap API  │
└──────────┬──────────┘         └──────────────────────┘
           │                    ┌──────────────────────┐
           │                    │  Gemini AI Service   │
           │                    │  Google Gemini API   │
           │                    └──────────────────────┘
┌──────────▼──────────┐
│  Results Display    │
│  - Weather Summary  │
│  - Crop Cards       │
│  - Market Insights  │
└─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn
- OpenWeatherMap API key (get free at https://openweathermap.org/api)
- Google Gemini API key (included in code, or get your own at https://makersuite.google.com/app/apikey)

### Initial Setup (One-Time)

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your OPENWEATHER_API_KEY
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

---

## ▶️ How to Start the Application

You need TWO terminal windows open simultaneously:

### Terminal 1: Start Backend Server

```bash
# Navigate to backend folder
cd backend

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run the backend server
python app.py
```

**You should see:**
```
╔════════════════════════════════════════════════╗
║   🌾 AI Crop Advisory Backend Server 🌾       ║
╠════════════════════════════════════════════════╣
║   Port: 5000                                   ║
║   Debug: True                                  ║
║   Endpoints:                                   ║
║   - GET  /health                               ║
║   - POST /api/recommend                        ║
║   - GET  /api/test-weather                     ║
╚════════════════════════════════════════════════╝
```

Backend will be running on `http://localhost:5000`

---

### Terminal 2: Start Frontend Server

**Open a NEW terminal window**, then:

```bash
# Navigate to frontend folder
cd frontend

# Start the development server
npm run dev
```

**You should see:**
```
VITE v5.0.8  ready in 523 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

Frontend will be running on `http://localhost:3000`

---

### Access the Application

Open your browser and visit: **http://localhost:3000**

**Important Notes:**
- Both backend and frontend must be running simultaneously
- Backend runs on port 5000
- Frontend runs on port 3000
- Keep both terminal windows open while using the app

## 📋 API Documentation

### POST /api/recommend

Get AI-powered crop recommendations.

**Request Body:**
```json
{
  "location": {
    "lat": 12.9716,
    "lon": 77.5946,
    "name": "Bangalore, Karnataka"
  },
  "season": "Kharif",
  "budget": 50000,
  "land_size": 2.5,
  "land_unit": "acres",
  "harvest_timeline": "3-4 months",
  "soil_type": "loamy",
  "irrigation": "drip"
}
```

**Response:**
```json
{
  "weather": {
    "temp": 28,
    "humidity": 65,
    "rainfall": "moderate",
    "forecast": "Consistent conditions expected",
    "wind_speed": 5.2
  },
  "recommendations": [
    {
      "name": "Rice (IR64)",
      "emoji": "🌾",
      "reason": "Ideal for monsoon season...",
      "investment": 40000,
      "profit_range": "65000-85000",
      "roi_percentage": 70,
      "risk_level": "low",
      "harvest_time": "120 days",
      "water_requirement": "high",
      "steps": ["Land preparation...", "Sowing..."],
      "risks": ["Pest attack...", "Disease..."],
      "confidence_score": 0.92,
      "ui_hints": {
        "gradient": ["#10b981", "#059669"],
        "icon_color": "#10b981"
      }
    }
  ],
  "market_insights": {
    "trending_crops": ["Rice", "Maize"],
    "price_trends": "Stable with MSP support"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🌱 Supported Features

### Seasons
- Kharif (Monsoon): June - October
- Rabi (Winter): October - March
- Zaid (Summer): March - June
- All Year Round

### Soil Types
- Loamy (best for most crops)
- Sandy (good drainage)
- Clay (water retention)
- Black (cotton belt)
- Red (common in South India)
- Alluvial (river plains)

### Irrigation Methods
- Rain-fed
- Drip irrigation
- Sprinkler
- Flood/Canal

### Crop Categories
System recommends from various categories:
- Cereals: Rice, Wheat, Maize
- Pulses: Chickpea, Lentils
- Oilseeds: Mustard, Sunflower
- Cash Crops: Cotton, Sugarcane
- Vegetables: Tomato, Potato

## 🎨 UI/UX Features

- **Glassmorphism Effects**: Modern frosted glass design
- **Smooth Animations**: Framer Motion for 60fps animations
- **Gradient Cards**: Color-coded risk levels (green/amber/red)
- **Expandable Sections**: Progressive disclosure of detailed information
- **Loading States**: Beautiful AI-themed loading animations
- **Responsive Grid**: Mobile, tablet, desktop optimized
- **Accessibility**: Proper ARIA labels, keyboard navigation

## 🔒 Security

- Input validation with Pydantic
- CORS configuration
- Environment variable protection
- Rate limiting ready (add middleware)
- SQL injection prevention (no SQL used)
- XSS protection

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/health

# Test weather API
curl "http://localhost:5000/api/test-weather?lat=12.9716&lon=77.5946"

# Full integration test (use Postman or curl with POST)
```

## 📦 Deployment

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect Railway/Render to repository
3. Set environment variables (GEMINI_API_KEY, OPENWEATHER_API_KEY)
4. Deploy automatically

### Frontend (Vercel/Netlify)
1. Push frontend to GitHub
2. Connect to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.railway.app`

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool & dev server
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **Axios**: HTTP client
- **React Hook Form**: Form management
- **Lucide React**: Icon library

### Backend
- **Flask 3.0**: Web framework
- **Flask-CORS**: Cross-origin support
- **Google Gemini AI**: Crop recommendations
- **OpenWeatherMap API**: Weather data
- **Pydantic**: Data validation
- **Python-dotenv**: Environment management

## 📄 License

MIT License - feel free to use for educational and commercial purposes.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check API documentation
- Review error logs in browser console and terminal

## 🌟 Acknowledgments

- Google Gemini for AI capabilities
- OpenWeatherMap for weather data
- Indian agricultural research for crop data
- Farmers for feedback and real-world insights

---

**Built with ❤️ for Indian farmers** 🌾

*Empowering agriculture through AI and data-driven decisions*

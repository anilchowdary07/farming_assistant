import { motion } from 'framer-motion';
import { X, AlertTriangle, CloudRain, Wind, Thermometer, Droplets, Sun, CloudLightning, Snowflake } from 'lucide-react';

const WeatherAlerts = ({ onClose, weatherData }) => {
  // General farming weather alerts for India
  const generalAlerts = [
    {
      type: "Monsoon Tips",
      icon: <CloudRain className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      tips: [
        "Don't sow seeds immediately after first rain - wait for consistent monsoon",
        "Prepare drainage channels before heavy rains to prevent waterlogging",
        "Use raised beds for vegetables to avoid root rot",
        "Apply fungicides preventively during high humidity periods",
        "Store harvested grains in waterproof containers"
      ]
    },
    {
      type: "Heat Wave Alert",
      icon: <Thermometer className="w-6 h-6" />,
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      tips: [
        "Irrigate during early morning (before 8 AM) or evening (after 5 PM)",
        "Apply mulch (straw, leaves) around plants to retain soil moisture",
        "Use shade nets for sensitive vegetables during peak heat",
        "Increase irrigation frequency but reduce volume per session",
        "Avoid any fertilizer application during extreme heat"
      ]
    },
    {
      type: "Cold Wave Alert",
      icon: <Snowflake className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      tips: [
        "Cover sensitive crops with plastic sheets or straw at night",
        "Irrigate fields before frost night - wet soil releases heat",
        "Use smoke/fire at field edges to raise temperature (traditional method)",
        "Delay pruning of fruit trees until frost danger passes",
        "Harvest mature vegetables before severe frost"
      ]
    },
    {
      type: "High Wind Alert",
      icon: <Wind className="w-6 h-6" />,
      color: "from-gray-500 to-slate-600",
      bgColor: "bg-gray-50",
      tips: [
        "Stake tall crops (maize, sugarcane, banana) before storm season",
        "Create windbreaks using trees or temporary barriers",
        "Harvest mature crops early if storm is predicted",
        "Secure polyhouse/greenhouse plastic sheets",
        "Don't spray pesticides during windy conditions (drift hazard)"
      ]
    },
    {
      type: "Drought Management",
      icon: <Sun className="w-6 h-6" />,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-50",
      tips: [
        "Switch to drip irrigation to save 40-60% water",
        "Grow drought-resistant varieties (Jowar, Bajra, Til)",
        "Apply organic mulch to reduce evaporation by 50%",
        "Practice deficit irrigation for crops like wheat",
        "Consider intercropping to reduce overall water needs"
      ]
    },
    {
      type: "Heavy Rainfall",
      icon: <CloudLightning className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      tips: [
        "Ensure all drainage channels are clear before monsoon",
        "Apply Bordeaux mixture to prevent fungal infections",
        "Stake and support heavy-fruiting plants",
        "Avoid harvesting wet crops - wait for drying",
        "Check for root rot symptoms after waterlogging"
      ]
    }
  ];

  const emergencyContacts = [
    { name: "Kisan Call Center", number: "1800-180-1551", desc: "Free 24x7 helpline" },
    { name: "IMD Weather", number: "1800-180-1717", desc: "Weather forecast hotline" },
    { name: "Disaster Management", number: "1078", desc: "NDMA helpline" },
    { name: "Crop Insurance", number: "1800-180-2117", desc: "PM Fasal Bima claims" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-4"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-t-3xl z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Weather Alerts & Tips</h2>
                <p className="text-amber-100 text-sm">Protect your crops from extreme weather</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Weather if available */}
          {weatherData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-3">📍 Your Current Weather</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 rounded-xl p-3 text-center">
                  <Thermometer className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">{weatherData.temp}°C</p>
                  <p className="text-sm text-emerald-100">Temperature</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 text-center">
                  <Droplets className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                  <p className="text-sm text-emerald-100">Humidity</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 text-center">
                  <CloudRain className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold capitalize">{weatherData.rainfall}</p>
                  <p className="text-sm text-emerald-100">Rainfall</p>
                </div>
                <div className="bg-white/20 rounded-xl p-3 text-center">
                  <Wind className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">{weatherData.wind || 'N/A'}</p>
                  <p className="text-sm text-emerald-100">Wind</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Weather-wise Tips */}
          <div className="grid md:grid-cols-2 gap-4">
            {generalAlerts.map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`${alert.bgColor} rounded-2xl p-5 border border-gray-100`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${alert.color} text-white`}>
                    {alert.icon}
                  </div>
                  <h3 className="font-bold text-gray-800">{alert.type}</h3>
                </div>
                <ul className="space-y-2">
                  {alert.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Emergency Contacts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6"
          >
            <h3 className="font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
              📞 Emergency Helplines
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyContacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.number}`}
                  className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow border border-red-100"
                >
                  <p className="font-bold text-red-600 text-lg">{contact.number}</p>
                  <p className="font-medium text-gray-800 text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.desc}</p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* IMD Attribution */}
          <div className="text-center text-sm text-gray-500">
            <p>Weather data from IMD (India Meteorological Department)</p>
            <p>Tips based on agricultural best practices from ICAR</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherAlerts;

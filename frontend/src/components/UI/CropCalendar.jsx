import { motion } from 'framer-motion';
import { X, Calendar, Droplets, Sun, Thermometer, Sprout } from 'lucide-react';

const CropCalendar = ({ onClose }) => {
  // Seasonal crop calendar for India
  const seasons = [
    {
      name: "Kharif (Monsoon)",
      period: "June - October",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      icon: <Droplets className="w-5 h-5" />,
      crops: [
        { name: "Rice", emoji: "🌾", sowing: "Jun-Jul", harvest: "Oct-Nov" },
        { name: "Maize", emoji: "🌽", sowing: "Jun-Jul", harvest: "Sep-Oct" },
        { name: "Jowar (Sorghum)", emoji: "🌾", sowing: "Jun-Jul", harvest: "Oct-Nov" },
        { name: "Bajra (Millet)", emoji: "🌾", sowing: "Jun-Jul", harvest: "Sep-Oct" },
        { name: "Cotton", emoji: "☁️", sowing: "Apr-May", harvest: "Oct-Dec" },
        { name: "Groundnut", emoji: "🥜", sowing: "Jun-Jul", harvest: "Oct-Nov" },
        { name: "Soybean", emoji: "🫘", sowing: "Jun-Jul", harvest: "Sep-Oct" },
        { name: "Sugarcane", emoji: "🎋", sowing: "Feb-Mar", harvest: "Dec-Mar" },
        { name: "Urad (Black Gram)", emoji: "🫘", sowing: "Jun-Jul", harvest: "Sep-Oct" },
        { name: "Moong (Green Gram)", emoji: "🫘", sowing: "Jun-Jul", harvest: "Aug-Sep" }
      ]
    },
    {
      name: "Rabi (Winter)",
      period: "October - March",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      icon: <Sun className="w-5 h-5" />,
      crops: [
        { name: "Wheat", emoji: "🌾", sowing: "Oct-Nov", harvest: "Mar-Apr" },
        { name: "Mustard", emoji: "🌻", sowing: "Oct-Nov", harvest: "Feb-Mar" },
        { name: "Gram (Chickpea)", emoji: "🫘", sowing: "Oct-Nov", harvest: "Feb-Mar" },
        { name: "Barley", emoji: "🌾", sowing: "Oct-Nov", harvest: "Mar-Apr" },
        { name: "Lentil (Masoor)", emoji: "🫘", sowing: "Oct-Nov", harvest: "Feb-Mar" },
        { name: "Peas", emoji: "🫛", sowing: "Oct-Nov", harvest: "Feb-Mar" },
        { name: "Potato", emoji: "🥔", sowing: "Oct-Nov", harvest: "Jan-Feb" },
        { name: "Onion", emoji: "🧅", sowing: "Oct-Nov", harvest: "Mar-Apr" },
        { name: "Sunflower", emoji: "🌻", sowing: "Sep-Oct", harvest: "Jan-Feb" },
        { name: "Coriander", emoji: "🌿", sowing: "Oct-Nov", harvest: "Feb-Mar" }
      ]
    },
    {
      name: "Zaid (Summer)",
      period: "March - June",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      icon: <Thermometer className="w-5 h-5" />,
      crops: [
        { name: "Watermelon", emoji: "🍉", sowing: "Feb-Mar", harvest: "May-Jun" },
        { name: "Muskmelon", emoji: "🍈", sowing: "Feb-Mar", harvest: "May-Jun" },
        { name: "Cucumber", emoji: "🥒", sowing: "Feb-Mar", harvest: "Apr-May" },
        { name: "Bitter Gourd", emoji: "🥬", sowing: "Feb-Mar", harvest: "May-Jun" },
        { name: "Pumpkin", emoji: "🎃", sowing: "Feb-Mar", harvest: "May-Jun" },
        { name: "Moong (Green Gram)", emoji: "🫘", sowing: "Mar-Apr", harvest: "May-Jun" },
        { name: "Urad (Black Gram)", emoji: "🫘", sowing: "Mar-Apr", harvest: "May-Jun" },
        { name: "Groundnut (Summer)", emoji: "🥜", sowing: "Jan-Feb", harvest: "Apr-May" }
      ]
    }
  ];

  const annualCrops = [
    { name: "Banana", emoji: "🍌", info: "Year-round (10-12 months cycle)", regions: "South India, Maharashtra" },
    { name: "Papaya", emoji: "🍈", info: "Year-round (8-10 months cycle)", regions: "All India" },
    { name: "Coconut", emoji: "🥥", info: "Perennial (first harvest 6-8 yrs)", regions: "Kerala, Karnataka, Tamil Nadu" },
    { name: "Mango", emoji: "🥭", info: "Flowering: Dec-Jan, Harvest: Apr-Jul", regions: "UP, AP, Maharashtra, Karnataka" },
    { name: "Guava", emoji: "🍈", info: "2 seasons: Jul-Sep & Nov-Mar", regions: "All India" },
    { name: "Turmeric", emoji: "🟡", info: "Plant: Jun-Jul, Harvest: Jan-Mar (9 months)", regions: "Telangana, AP, Tamil Nadu" }
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
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto my-4"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-3xl z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Crop Calendar India</h2>
                <p className="text-emerald-100 text-sm">When to sow, when to harvest</p>
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

        <div className="p-6 space-y-8">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center">
            {seasons.map((season, idx) => (
              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <div className={`p-1 rounded-full bg-gradient-to-r ${season.color} text-white`}>
                  {season.icon}
                </div>
                <span className="font-medium text-gray-700">{season.name}</span>
                <span className="text-sm text-gray-500">({season.period})</span>
              </div>
            ))}
          </div>

          {/* Seasonal Crops */}
          {seasons.map((season, seasonIdx) => (
            <motion.div
              key={seasonIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: seasonIdx * 0.1 }}
              className={`${season.bgColor} rounded-2xl p-6`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${season.color} text-white`}>
                  {season.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{season.name}</h3>
                  <p className="text-sm text-gray-600">{season.period}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {season.crops.map((crop, cropIdx) => (
                  <motion.div
                    key={cropIdx}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{crop.emoji}</span>
                      <span className="font-semibold text-gray-800 text-sm">{crop.name}</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1 text-green-600">
                        <Sprout className="w-3 h-3" />
                        <span>Sow: {crop.sowing}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600">
                        <Calendar className="w-3 h-3" />
                        <span>Harvest: {crop.harvest}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Annual/Perennial Crops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🌳 Annual & Perennial Crops
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {annualCrops.map((crop, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{crop.emoji}</span>
                    <span className="font-bold text-gray-800">{crop.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{crop.info}</p>
                  <p className="text-xs text-emerald-600">📍 {crop.regions}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-bold text-yellow-800 mb-2">💡 Important Tips</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Sowing dates vary by region - adjust based on your local monsoon arrival</li>
              <li>• For irrigated areas, you can sow 2-3 weeks before rain-fed areas</li>
              <li>• Always consult your local Krishi Vigyan Kendra for exact dates</li>
              <li>• Check soil moisture before sowing - it should be 50-60% for most crops</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CropCalendar;

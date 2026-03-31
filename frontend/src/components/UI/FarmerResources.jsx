import { motion } from 'framer-motion';
import { 
  Phone, 
  TrendingUp, 
  Droplets, 
  Bug, 
  Calculator,
  BookOpen,
  AlertTriangle,
  IndianRupee,
  Leaf,
  Cloud,
  ExternalLink
} from 'lucide-react';

const FarmerResources = ({ onClose }) => {
  const resources = [
    {
      category: "Government Helplines",
      icon: <Phone className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "Kisan Call Center", value: "1800-180-1551", desc: "24x7 toll-free farming advice", type: "phone" },
        { name: "PM-KISAN Helpline", value: "155261", desc: "PM Kisan scheme support", type: "phone" },
        { name: "Soil Health Card", value: "1800-180-1551", desc: "Soil testing information", type: "phone" },
      ]
    },
    {
      category: "Government Schemes",
      icon: <IndianRupee className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      items: [
        { name: "PM-KISAN", value: "₹6,000/year", desc: "Direct income support for farmers", link: "https://pmkisan.gov.in" },
        { name: "PM Fasal Bima Yojana", value: "Crop Insurance", desc: "Protect against crop loss", link: "https://pmfby.gov.in" },
        { name: "Kisan Credit Card", value: "Low interest loans", desc: "Easy credit for farming", link: "https://www.nabard.org" },
        { name: "Soil Health Card", value: "Free testing", desc: "Know your soil nutrients", link: "https://soilhealth.dac.gov.in" },
      ]
    },
    {
      category: "Market Prices (Mandi)",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "eNAM Portal", value: "Live Mandi Rates", desc: "National agriculture market prices", link: "https://enam.gov.in" },
        { name: "Agmarknet", value: "Historical Prices", desc: "Price trends and analysis", link: "https://agmarknet.gov.in" },
      ]
    },
    {
      category: "Weather Services",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-sky-500 to-blue-500",
      items: [
        { name: "IMD Agromet", value: "5-day forecast", desc: "Agricultural weather advisories", link: "https://mausam.imd.gov.in" },
        { name: "Meghdoot App", value: "Mobile App", desc: "Weather alerts for farmers", link: "https://play.google.com/store/apps/details?id=com.aas.meghdoot" },
      ]
    },
  ];

  const quickTips = [
    { emoji: "🌱", title: "Seed Treatment", desc: "Always treat seeds with fungicide before sowing to prevent diseases" },
    { emoji: "💧", title: "Morning Irrigation", desc: "Water crops early morning to reduce evaporation loss" },
    { emoji: "🐛", title: "Pest Monitoring", desc: "Check crops weekly for pests. Early detection saves crops" },
    { emoji: "🧪", title: "Soil Testing", desc: "Test soil every 2 years for balanced fertilizer application" },
    { emoji: "📅", title: "Right Timing", desc: "Sow within recommended dates for best yields" },
    { emoji: "🌾", title: "Crop Rotation", desc: "Rotate legumes with cereals to maintain soil health" },
  ];

  const mspRates = [
    { crop: "Paddy (Common)", msp: "₹2,183/quintal", season: "Kharif 2024-25" },
    { crop: "Wheat", msp: "₹2,275/quintal", season: "Rabi 2024-25" },
    { crop: "Maize", msp: "₹2,090/quintal", season: "Kharif 2024-25" },
    { crop: "Cotton (Medium)", msp: "₹6,620/quintal", season: "Kharif 2024-25" },
    { crop: "Groundnut", msp: "₹6,377/quintal", season: "Kharif 2024-25" },
    { crop: "Soybean", msp: "₹4,600/quintal", season: "Kharif 2024-25" },
    { crop: "Chana (Gram)", msp: "₹5,440/quintal", season: "Rabi 2024-25" },
    { crop: "Mustard", msp: "₹5,650/quintal", season: "Rabi 2024-25" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-7 h-7" />
                Farmer Resources & Help
              </h2>
              <p className="text-emerald-100 mt-1">Government schemes, helplines, market prices & tips</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Resources Grid */}
          {resources.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} text-white`}>
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{section.category}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {section.items.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      {item.type === "phone" ? (
                        <a
                          href={`tel:${item.value}`}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold hover:bg-emerald-200"
                        >
                          📞 {item.value}
                        </a>
                      ) : item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-200"
                        >
                          Visit <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* MSP Rates */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Minimum Support Prices (MSP) 2024-25</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mspRates.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
                >
                  <div className="font-semibold text-gray-800 text-sm">{item.crop}</div>
                  <div className="text-lg font-bold text-amber-700">{item.msp}</div>
                  <div className="text-xs text-gray-500">{item.season}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Quick Farming Tips</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {quickTips.map((tip, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-emerald-50 rounded-xl border border-emerald-200"
                >
                  <div className="text-2xl mb-2">{tip.emoji}</div>
                  <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-bold text-red-800">Emergency Numbers</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="tel:1800-180-1551" className="flex items-center gap-2 text-red-700 hover:text-red-800">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Kisan Helpline: 1800-180-1551</span>
              </a>
              <a href="tel:112" className="flex items-center gap-2 text-red-700 hover:text-red-800">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Emergency: 112</span>
              </a>
              <a href="tel:1070" className="flex items-center gap-2 text-red-700 hover:text-red-800">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Disaster Helpline: 1070</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Close Resources
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FarmerResources;

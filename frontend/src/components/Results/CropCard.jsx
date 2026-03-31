import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown,
  Droplet,
  Clock,
  Target,
  Sparkles,
  Package,
  Leaf,
  FlaskConical,
  Wrench,
  ShoppingBag
} from 'lucide-react';
import { useState } from 'react';

const CropCard = ({ crop, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return { bg: 'from-emerald-500 to-green-600', text: 'text-emerald-700', border: 'border-emerald-300' };
      case 'medium': return { bg: 'from-amber-500 to-orange-600', text: 'text-amber-700', border: 'border-amber-300' };
      case 'high': return { bg: 'from-red-500 to-rose-600', text: 'text-red-700', border: 'border-red-300' };
      default: return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-700', border: 'border-gray-300' };
    }
  };

  const riskColors = getRiskColor(crop.risk_level);
  const gradient = crop.ui_hints?.gradient || ['#10b981', '#059669'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {/* Header with Gradient */}
      <div 
        className="p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{crop.emoji}</span>
            <div>
              <h3 className="text-2xl font-bold mb-1">{crop.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-90">Confidence</span>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                  {Math.round(crop.confidence_score * 100)}%
                </div>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            crop.risk_level === 'low' ? 'bg-white/20' :
            crop.risk_level === 'medium' ? 'bg-white/30' : 'bg-white/40'
          }`}>
            {crop.risk_level.toUpperCase()} RISK
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Reason */}
        <p className="text-gray-700 mb-6 leading-relaxed">{crop.reason}</p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200"
          >
            <div className="text-sm text-gray-600 mb-1">Investment</div>
            <div className="text-2xl font-bold text-emerald-700">
              ₹{crop.investment.toLocaleString('en-IN')}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="text-sm text-gray-600 mb-1">Expected Profit</div>
            <div className="text-xl font-bold text-blue-700">
              ₹{crop.profit_range}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              ROI
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {crop.roi_percentage}%
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              Harvest
            </div>
            <div className="text-xl font-bold text-orange-700">
              {crop.harvest_time}
            </div>
          </motion.div>
        </div>

        {/* Water Requirement */}
        <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <Droplet className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-700">
            Water Requirement: <span className="font-semibold capitalize text-blue-700">{crop.water_requirement}</span>
          </span>
        </div>

        {/* Expand Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl hover:from-gray-100 hover:to-slate-100 transition-all border border-gray-200"
        >
          <span className="font-semibold text-gray-800">
            {isExpanded ? 'Hide' : 'View'} Details & Materials
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </motion.div>
        </motion.button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-6">
                {/* Required Materials Section */}
                {crop.materials && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-indigo-500 p-2 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">Required Materials</h4>
                    </div>
                    <div className="grid gap-3">
                      {/* Seeds */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">Seeds</span>
                        </div>
                        <p className="text-sm text-gray-700">{crop.materials.seeds}</p>
                      </motion.div>

                      {/* Fertilizers */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-amber-600" />
                          <span className="font-semibold text-amber-800">Fertilizers</span>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {crop.materials.fertilizers?.map((fert, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                              {fert}
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Pesticides */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <FlaskConical className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-800">Pesticides & Protection</span>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {crop.materials.pesticides?.map((pest, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {pest}
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Tools */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Wrench className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Tools & Equipment</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {crop.materials.tools?.map((tool, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Other Requirements */}
                      {crop.materials.other && crop.materials.other.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            <span className="font-semibold text-purple-800">Other Requirements</span>
                          </div>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {crop.materials.other.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Cultivation Steps */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-emerald-500 p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">Cultivation Steps</h4>
                  </div>
                  <div className="space-y-3">
                    {crop.steps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3 p-3 bg-white rounded-xl border border-gray-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-gray-700 flex-1">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Risks & Mitigation */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`bg-gradient-to-r ${riskColors.bg} p-2 rounded-lg`}>
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">Risks & Mitigation</h4>
                  </div>
                  <div className="space-y-3">
                    {crop.risks.map((risk, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border ${riskColors.border}`}
                      >
                        <div className="flex gap-3">
                          <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${riskColors.text}`} />
                          <p className="text-sm text-gray-700">{risk}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CropCard;

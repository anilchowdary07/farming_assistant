import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Thermometer, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const WeatherSummary = ({ weather }) => {
  if (!weather) return null;

  const getRainfallColor = (rainfall) => {
    if (rainfall.includes('no') || rainfall.includes('light')) return 'text-yellow-600';
    if (rainfall.includes('moderate')) return 'text-blue-600';
    return 'text-indigo-600';
  };

  const isRealData = weather.is_real_data === true;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 mb-8 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {isRealData ? 'Live Weather' : 'Weather Conditions'}
              {weather.location_name && weather.location_name !== 'Estimated' && (
                <span className="text-sm font-normal text-gray-500 ml-2">• {weather.location_name}</span>
              )}
            </h2>
            <p className="text-sm text-gray-500">{weather.description || 'Weather data'}</p>
          </div>
        </div>
        
        {/* Data source indicator */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
          isRealData 
            ? 'bg-green-100 text-green-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {isRealData ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Live Data</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Estimated</span>
            </>
          )}
        </div>
      </div>

      {/* Warning banner for estimated data */}
      {!isRealData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Using seasonal estimates.</strong> Weather API temporarily unavailable. 
              Recommendations are based on typical weather patterns for your region and season.
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">Temperature</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">{weather.temp}°C</div>
          {weather.feels_like && (
            <div className="text-xs text-gray-500 mt-1">Feels like {weather.feels_like}°C</div>
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Humidity</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{weather.humidity}%</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-600">Rainfall</span>
          </div>
          <div className={`text-lg font-bold capitalize ${getRainfallColor(weather.rainfall)}`}>
            {weather.rainfall}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-teal-600" />
            <span className="text-sm text-gray-600">Wind Speed</span>
          </div>
          <div className="text-2xl font-bold text-teal-700">{weather.wind_speed} m/s</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200"
      >
        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Forecast Summary</h3>
            <p className="text-sm text-gray-700">{weather.forecast}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherSummary;

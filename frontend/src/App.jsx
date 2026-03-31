import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, TrendingUp, BarChart3, BookOpen, Calendar, AlertTriangle } from 'lucide-react';
import FormStep1 from './components/FormSteps/FormStep1';
import FormStep2 from './components/FormSteps/FormStep2';
import LoadingScreen from './components/UI/LoadingScreen';
import WelcomePage from './components/UI/WelcomePage';
import FarmerResources from './components/UI/FarmerResources';
import CropCalendar from './components/UI/CropCalendar';
import WeatherAlerts from './components/UI/WeatherAlerts';
import WeatherSummary from './components/Results/WeatherSummary';
import CropCard from './components/Results/CropCard';
import { getCropRecommendations } from './services/api';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showResources, setShowResources] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showWeatherAlerts, setShowWeatherAlerts] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    location: null,
    season: '',
    budget: 0,
    land_size: 0,
    land_unit: 'acres',
    harvest_timeline: '',
    soil_type: '',
    irrigation: ''
  });

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleShowResources = () => {
    setShowResources(true);
  };

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleShowWeatherAlerts = () => {
    setShowWeatherAlerts(true);
  };

  const handleStep1Next = () => {
    setCurrentStep(2);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure location has default if not selected
      const location = formData.location || {
        lat: 12.9716,
        lon: 77.5946,
        name: 'Bangalore, Karnataka'
      };

      const requestData = {
        location,
        season: formData.season,
        budget: formData.budget,
        land_size: formData.land_size,
        land_unit: formData.land_unit,
        harvest_timeline: formData.harvest_timeline,
        soil_type: formData.soil_type,
        irrigation: formData.irrigation
      };

      console.log('Sending request:', requestData);
      const response = await getCropRecommendations(requestData);
      console.log('Received response:', response);
      
      setResults(response);
      setCurrentStep(3);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setResults(null);
    setError(null);
    setFormData({
      location: null,
      season: '',
      budget: 0,
      land_size: 0,
      land_unit: 'acres',
      harvest_timeline: '',
      soil_type: '',
      irrigation: ''
    });
  };

  const handleBackToWelcome = () => {
    handleReset();
    setShowWelcome(true);
  };

  // Show welcome page first
  if (showWelcome) {
    return (
      <>
        <WelcomePage 
          onGetStarted={handleGetStarted} 
          onShowResources={handleShowResources}
          onShowCalendar={handleShowCalendar}
          onShowWeatherAlerts={handleShowWeatherAlerts}
        />
        <AnimatePresence>
          {showResources && <FarmerResources onClose={() => setShowResources(false)} />}
          {showCalendar && <CropCalendar onClose={() => setShowCalendar(false)} />}
          {showWeatherAlerts && <WeatherAlerts onClose={() => setShowWeatherAlerts(false)} />}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {isLoading && <LoadingScreen stage="Analyzing your farming conditions..." />}

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Back to Home */}
          <motion.button
            onClick={handleBackToWelcome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </motion.button>
          
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-emerald-600 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gradient mb-3">
            🌾 AI Crop Advisory
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Enter your farming details to get AI-powered crop recommendations
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
            >
              <p className="font-semibold">⚠️ Error: {error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        {currentStep !== 3 ? (
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Step {currentStep} of 2</span>
                <span className="text-sm text-gray-500">{currentStep === 1 ? 'Location & Season' : 'Budget & Timeline'}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStep / 2) * 100}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                />
              </div>
            </div>

            {/* Form Card */}
            <motion.div
              className="glass rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <FormStep1
                    key="step1"
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleStep1Next}
                  />
                )}
                {currentStep === 2 && (
                  <FormStep2
                    key="step2"
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleSubmit}
                    onBack={handleStep2Back}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          /* Results View */
          <div>
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleReset}
              className="flex items-center gap-2 mb-6 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">New Search</span>
            </motion.button>

            {/* Weather Summary */}
            {results?.weather && <WeatherSummary weather={results.weather} />}

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                🎯 Top 3 Recommended Crops
              </h2>
              <p className="text-gray-600">AI-analyzed and optimized for your farming conditions</p>
            </motion.div>

            {/* Crop Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results?.recommendations?.map((crop, index) => (
                <CropCard key={index} crop={crop} index={index} />
              ))}
            </div>

            {/* Market Insights */}
            {results?.market_insights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Market Insights</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <div className="text-sm text-gray-600 mb-2">📈 Trending Crops</div>
                    <div className="flex flex-wrap gap-2">
                      {results.market_insights.trending_crops?.map((crop, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-purple-700 border border-purple-200"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-2">💰 Price Trends</div>
                    <p className="text-sm text-gray-700 font-medium">{results.market_insights.price_trends}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleReset}
                className="btn-primary"
              >
                Try Another Search 🔄
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16 text-gray-500 text-sm"
      >
        <p>Powered by AI • Real-time Weather • Market Intelligence</p>
        <p className="mt-2">🌾 Helping farmers make smarter decisions</p>
        <p className="mt-2">
          <a href="tel:1800-180-1551" className="text-emerald-600 hover:text-emerald-700 font-medium">
            📞 Kisan Helpline: 1800-180-1551
          </a>
        </p>
      </motion.footer>

      {/* Floating Quick Tools */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCalendar(true)}
          className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg flex items-center justify-center"
          title="Crop Calendar"
        >
          <Calendar className="w-5 h-5" />
        </motion.button>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowWeatherAlerts(true)}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg flex items-center justify-center"
          title="Weather Tips"
        >
          <AlertTriangle className="w-5 h-5" />
        </motion.button>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowResources(true)}
          className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-lg flex items-center justify-center"
          title="Farmer Resources & Help"
        >
          <BookOpen className="w-6 h-6" />
        </motion.button>
      </div>

      {/* All Modals */}
      <AnimatePresence>
        {showResources && <FarmerResources onClose={() => setShowResources(false)} />}
        {showCalendar && <CropCalendar onClose={() => setShowCalendar(false)} />}
        {showWeatherAlerts && <WeatherAlerts onClose={() => setShowWeatherAlerts(false)} weatherData={results?.weather} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

import { motion } from 'framer-motion';
import { Sparkles, Leaf, TrendingUp, Cloud, Shield, ArrowRight, Phone, IndianRupee, BookOpen, MapPin, Calendar, AlertTriangle } from 'lucide-react';

const WelcomePage = ({ onGetStarted, onShowResources, onShowCalendar, onShowWeatherAlerts }) => {
  const features = [
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Real-Time Weather",
      description: "Live weather from your village for accurate crop advice",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Smart recommendations based on your land & conditions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Profit Estimates",
      description: "Know investment, returns & MSP before you sow",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Assessment",
      description: "Pest warnings, disease alerts & how to prevent them",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { value: "90+", label: "Districts Covered" },
    { value: "15", label: "States Supported" },
    { value: "50+", label: "Crop Varieties" },
    { value: "24/7", label: "Free to Use" }
  ];

  const benefits = [
    { emoji: "🌾", text: "Regional crop varieties for your area" },
    { emoji: "💰", text: "MSP & market price information" },
    { emoji: "📱", text: "Works on mobile - use in your field" },
    { emoji: "🗣️", text: "Simple language, easy to understand" },
    { emoji: "🆓", text: "Completely free - no hidden charges" },
    { emoji: "📞", text: "Government helpline numbers included" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full opacity-30 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200 rounded-full opacity-30 blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Floating Emoji Animation */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl mb-6"
            >
              🌾
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">AI Crop Advisory</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Make <span className="font-semibold text-emerald-600">data-driven farming decisions</span> with 
              AI-powered crop recommendations, real-time weather analysis, and profit projections.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-500 mb-10"
            >
              🇮🇳 For Indian Farmers | 90+ Districts | 15 States | Free to Use
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onGetStarted}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl inline-flex items-center justify-center gap-3"
              >
                <Leaf className="w-6 h-6" />
                Get Crop Recommendations
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
              
              <motion.button
                onClick={onShowResources}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-emerald-300 text-emerald-700 px-8 py-5 rounded-2xl font-bold text-lg shadow-lg inline-flex items-center justify-center gap-3 hover:bg-emerald-50"
              >
                <BookOpen className="w-5 h-5" />
                Farmer Resources & Help
              </motion.button>
            </div>

            {/* Quick Tools */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex flex-wrap gap-3 justify-center"
            >
              <button
                onClick={onShowCalendar}
                className="flex items-center gap-2 px-5 py-3 bg-amber-100 text-amber-800 rounded-xl font-medium hover:bg-amber-200 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Crop Calendar
              </button>
              <button
                onClick={onShowWeatherAlerts}
                className="flex items-center gap-2 px-5 py-3 bg-blue-100 text-blue-800 rounded-xl font-medium hover:bg-blue-200 transition-colors"
              >
                <AlertTriangle className="w-5 h-5" />
                Weather Tips
              </button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-2xl p-6 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", emoji: "📍", title: "Enter Your Details", desc: "Your village/district, season, budget, land size & soil type" },
                { step: "2", emoji: "🤖", title: "AI Analysis", desc: "We analyze weather, soil & market to find best crops" },
                { step: "3", emoji: "🌾", title: "Get Recommendations", desc: "Receive top 3 crops with profit estimates & farming guide" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center relative"
                >
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <div className="absolute -top-2 -left-2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits for Farmers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Why Farmers Love This Tool
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100"
                >
                  <span className="text-2xl">{benefit.emoji}</span>
                  <span className="text-sm text-gray-700 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Kisan Helpline Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-6 h-6" />
                <span className="font-bold text-lg">Kisan Call Center (24x7 Free):</span>
              </div>
              <a 
                href="tel:1800-180-1551" 
                className="bg-white text-emerald-700 px-6 py-2 rounded-full font-bold text-xl hover:bg-emerald-50 transition-colors"
              >
                📞 1800-180-1551
              </a>
            </div>
            <p className="mt-2 text-emerald-100 text-sm">Get farming advice in your language anytime</p>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mt-16"
          >
            <p className="text-gray-500 mb-6">
              🌤️ Powered by real-time weather data & Google Gemini AI
            </p>
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg"
            >
              Start Free Analysis →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>Built with ❤️ for Indian Farmers</p>
        <p className="mt-2">🌾 Empowering agriculture through AI and data-driven decisions</p>
      </footer>
    </div>
  );
};

export default WelcomePage;

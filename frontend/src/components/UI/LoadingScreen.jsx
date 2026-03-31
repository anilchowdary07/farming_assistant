import { motion } from 'framer-motion';
import { Loader2, Sparkles, TrendingUp } from 'lucide-react';

const LoadingScreen = ({ stage = 'Initializing' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6">
              <Sparkles className="w-16 h-16 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl font-bold text-white mb-4"
        >
          AI Crop Advisory
        </motion.h2>

        {/* Stage Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 rounded-full mb-4 max-w-xs mx-auto"
        />

        <p className="text-emerald-100 text-lg mb-8">{stage}</p>

        {/* Loading Steps */}
        <div className="space-y-3 text-left max-w-md mx-auto">
          {[
            { icon: '🌤️', text: 'Fetching real-time weather data', delay: 0 },
            { icon: '🤖', text: 'Analyzing crop suitability with AI', delay: 0.2 },
            { icon: '📊', text: 'Calculating profit projections', delay: 0.4 },
            { icon: '🌾', text: 'Preparing recommendations', delay: 0.6 },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay, duration: 0.5 }}
              className="flex items-center gap-3 text-white/90"
            >
              <span className="text-2xl">{step.icon}</span>
              <span className="flex-1">{step.text}</span>
              <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12"
        >
          <TrendingUp className="w-8 h-8 text-emerald-300 mx-auto" />
          <p className="text-emerald-200 text-sm mt-2">Maximizing your farming success...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

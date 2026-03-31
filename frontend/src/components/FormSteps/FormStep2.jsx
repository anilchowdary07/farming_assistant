import { motion } from 'framer-motion';
import { DollarSign, Maximize2, Clock } from 'lucide-react';
import { useState } from 'react';

const FormStep2 = ({ formData, setFormData, onNext, onBack }) => {
  const budgetPresets = [
    { value: 25000, label: '₹25,000', desc: 'Small scale' },
    { value: 50000, label: '₹50,000', desc: 'Medium scale' },
    { value: 100000, label: '₹1,00,000', desc: 'Large scale' },
    { value: 200000, label: '₹2,00,000', desc: 'Commercial' },
  ];

  const landPresets = [
    { value: 1, unit: 'acres', label: '1 Acre' },
    { value: 2.5, unit: 'acres', label: '2.5 Acres' },
    { value: 5, unit: 'acres', label: '5 Acres' },
    { value: 10, unit: 'acres', label: '10 Acres' },
  ];

  const timelineOptions = [
    { value: '2-3 months', label: '2-3 months', emoji: '⚡', desc: 'Quick harvest' },
    { value: '3-4 months', label: '3-4 months', emoji: '⏱️', desc: 'Standard' },
    { value: '4-6 months', label: '4-6 months', emoji: '📅', desc: 'Extended' },
    { value: '6+ months', label: '6+ months', emoji: '🗓️', desc: 'Long-term' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.budget || !formData.land_size || !formData.harvest_timeline) {
      alert('Please fill all required fields');
      return;
    }
    onNext();
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Budget */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          Investment Budget (₹)
        </label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {budgetPresets.map((preset) => (
            <motion.button
              key={preset.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData(prev => ({ ...prev, budget: preset.value }))}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.budget === preset.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="font-bold text-lg text-gray-800">{preset.label}</div>
              <div className="text-xs text-gray-500">{preset.desc}</div>
            </motion.button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
          <input
            type="number"
            value={formData.budget || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: parseFloat(e.target.value) || 0 }))}
            placeholder="Enter custom amount"
            min="1000"
            step="1000"
            className="input-field pl-10"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">💡 Includes seeds, fertilizers, labor, and irrigation costs</p>
      </div>

      {/* Land Size */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <Maximize2 className="w-5 h-5 text-emerald-600" />
          Land Size
        </label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {landPresets.map((preset) => (
            <motion.button
              key={`${preset.value}-${preset.unit}`}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                land_size: preset.value,
                land_unit: preset.unit 
              }))}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.land_size === preset.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="font-bold text-lg text-gray-800">{preset.label}</div>
            </motion.button>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            value={formData.land_size || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, land_size: parseFloat(e.target.value) || 0 }))}
            placeholder="Custom size"
            min="0.1"
            step="0.5"
            className="input-field flex-1"
          />
          <select
            value={formData.land_unit || 'acres'}
            onChange={(e) => setFormData(prev => ({ ...prev, land_unit: e.target.value }))}
            className="input-field w-32"
          >
            <option value="acres">Acres</option>
            <option value="hectares">Hectares</option>
          </select>
        </div>
      </div>

      {/* Harvest Timeline */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <Clock className="w-5 h-5 text-emerald-600" />
          Expected Harvest Time
        </label>
        <div className="grid grid-cols-2 gap-3">
          {timelineOptions.map((option) => (
            <motion.button
              key={option.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData(prev => ({ ...prev, harvest_timeline: option.value }))}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.harvest_timeline === option.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{option.emoji}</div>
              <div className="font-semibold text-gray-800">{option.label}</div>
              <div className="text-xs text-gray-500">{option.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200"
      >
        <h3 className="font-semibold text-gray-800 mb-3">📊 Your Investment Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Budget:</span>
            <span className="font-bold text-gray-800">₹{formData.budget?.toLocaleString('en-IN') || '0'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Land Size:</span>
            <span className="font-bold text-gray-800">
              {formData.land_size || '0'} {formData.land_unit || 'acres'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Per Acre Investment:</span>
            <span className="font-bold text-emerald-600">
              ₹{formData.budget && formData.land_size 
                ? Math.round(formData.budget / formData.land_size).toLocaleString('en-IN') 
                : '0'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary flex-1"
        >
          ← Back
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex-1"
        >
          Get AI Recommendations 🤖
        </motion.button>
      </div>
    </motion.form>
  );
};

export default FormStep2;

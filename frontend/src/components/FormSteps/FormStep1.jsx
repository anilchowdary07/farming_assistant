import { motion } from 'framer-motion';
import { MapPin, Calendar, Droplet, Sprout, Navigation, Loader2, Search } from 'lucide-react';
import { useState } from 'react';

const FormStep1 = ({ formData, setFormData, onNext }) => {
  const [locationInput, setLocationInput] = useState(formData.location?.name || '');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Indian States with major agricultural districts/taluks
  const indianStates = [
    {
      state: 'Punjab',
      districts: [
        { name: 'Ludhiana', lat: 30.9010, lon: 75.8573 },
        { name: 'Amritsar', lat: 31.6340, lon: 74.8723 },
        { name: 'Patiala', lat: 30.3398, lon: 76.3869 },
        { name: 'Bathinda', lat: 30.2110, lon: 74.9455 },
        { name: 'Sangrur', lat: 30.2506, lon: 75.8442 },
        { name: 'Moga', lat: 30.8231, lon: 75.1742 },
      ]
    },
    {
      state: 'Uttar Pradesh',
      districts: [
        { name: 'Muzaffarnagar', lat: 29.4727, lon: 77.7085 },
        { name: 'Meerut', lat: 28.9845, lon: 77.7064 },
        { name: 'Saharanpur', lat: 29.9680, lon: 77.5510 },
        { name: 'Gorakhpur', lat: 26.7606, lon: 83.3732 },
        { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
        { name: 'Allahabad (Prayagraj)', lat: 25.4358, lon: 81.8463 },
      ]
    },
    {
      state: 'Maharashtra',
      districts: [
        { name: 'Nashik', lat: 20.0063, lon: 73.7895 },
        { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
        { name: 'Solapur', lat: 17.6599, lon: 75.9064 },
        { name: 'Kolhapur', lat: 16.7050, lon: 74.2433 },
        { name: 'Ahmednagar', lat: 19.0948, lon: 74.7480 },
        { name: 'Sangli', lat: 16.8524, lon: 74.5815 },
      ]
    },
    {
      state: 'Madhya Pradesh',
      districts: [
        { name: 'Indore', lat: 22.7196, lon: 75.8577 },
        { name: 'Ujjain', lat: 23.1793, lon: 75.7849 },
        { name: 'Dewas', lat: 22.9676, lon: 76.0534 },
        { name: 'Hoshangabad', lat: 22.7533, lon: 77.7264 },
        { name: 'Sagar', lat: 23.8315, lon: 78.7378 },
        { name: 'Vidisha', lat: 23.5251, lon: 77.8081 },
      ]
    },
    {
      state: 'Rajasthan',
      districts: [
        { name: 'Sri Ganganagar', lat: 29.9038, lon: 73.8772 },
        { name: 'Alwar', lat: 27.5530, lon: 76.6346 },
        { name: 'Bharatpur', lat: 27.2152, lon: 77.5030 },
        { name: 'Kota', lat: 25.2138, lon: 75.8648 },
        { name: 'Udaipur', lat: 24.5854, lon: 73.7125 },
        { name: 'Jodhpur', lat: 26.2389, lon: 73.0243 },
      ]
    },
    {
      state: 'Gujarat',
      districts: [
        { name: 'Junagadh', lat: 21.5222, lon: 70.4579 },
        { name: 'Rajkot', lat: 22.3039, lon: 70.8022 },
        { name: 'Mehsana', lat: 23.5880, lon: 72.3693 },
        { name: 'Anand', lat: 22.5645, lon: 72.9289 },
        { name: 'Kheda', lat: 22.7507, lon: 72.6847 },
        { name: 'Banaskantha', lat: 24.1722, lon: 72.4310 },
      ]
    },
    {
      state: 'Karnataka',
      districts: [
        { name: 'Belgaum (Belagavi)', lat: 15.8497, lon: 74.4977 },
        { name: 'Dharwad', lat: 15.4589, lon: 75.0078 },
        { name: 'Mysore (Mysuru)', lat: 12.2958, lon: 76.6394 },
        { name: 'Mandya', lat: 12.5218, lon: 76.8951 },
        { name: 'Hassan', lat: 13.0068, lon: 76.1003 },
        { name: 'Shimoga', lat: 13.9299, lon: 75.5681 },
      ]
    },
    {
      state: 'Andhra Pradesh',
      districts: [
        { name: 'Guntur', lat: 16.3067, lon: 80.4365 },
        { name: 'Krishna', lat: 16.6100, lon: 80.7214 },
        { name: 'West Godavari', lat: 16.9174, lon: 81.3399 },
        { name: 'East Godavari', lat: 17.3200, lon: 82.0800 },
        { name: 'Kurnool', lat: 15.8281, lon: 78.0373 },
        { name: 'Anantapur', lat: 14.6819, lon: 77.6006 },
      ]
    },
    {
      state: 'Telangana',
      districts: [
        { name: 'Nizamabad', lat: 18.6725, lon: 78.0940 },
        { name: 'Karimnagar', lat: 18.4386, lon: 79.1288 },
        { name: 'Warangal', lat: 17.9784, lon: 79.5941 },
        { name: 'Khammam', lat: 17.2473, lon: 80.1514 },
        { name: 'Nalgonda', lat: 17.0575, lon: 79.2690 },
        { name: 'Medak', lat: 18.0529, lon: 78.2620 },
      ]
    },
    {
      state: 'Tamil Nadu',
      districts: [
        { name: 'Thanjavur', lat: 10.7870, lon: 79.1378 },
        { name: 'Tiruchirapalli', lat: 10.7905, lon: 78.7047 },
        { name: 'Salem', lat: 11.6643, lon: 78.1460 },
        { name: 'Erode', lat: 11.3410, lon: 77.7172 },
        { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
        { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
      ]
    },
    {
      state: 'West Bengal',
      districts: [
        { name: 'Bardhaman (Burdwan)', lat: 23.2324, lon: 87.8615 },
        { name: 'Hooghly', lat: 22.9086, lon: 88.3975 },
        { name: 'Nadia', lat: 23.4710, lon: 88.5565 },
        { name: 'Murshidabad', lat: 24.1754, lon: 88.2746 },
        { name: 'Birbhum', lat: 23.8361, lon: 87.5517 },
        { name: 'Malda', lat: 25.0108, lon: 88.1411 },
      ]
    },
    {
      state: 'Bihar',
      districts: [
        { name: 'Patna', lat: 25.5941, lon: 85.1376 },
        { name: 'Muzaffarpur', lat: 26.1209, lon: 85.3647 },
        { name: 'Bhagalpur', lat: 25.2425, lon: 86.9842 },
        { name: 'Gaya', lat: 24.7955, lon: 85.0002 },
        { name: 'Darbhanga', lat: 26.1542, lon: 85.8918 },
        { name: 'Purnia', lat: 25.7771, lon: 87.4753 },
      ]
    },
    {
      state: 'Haryana',
      districts: [
        { name: 'Karnal', lat: 29.6857, lon: 76.9905 },
        { name: 'Kurukshetra', lat: 29.9695, lon: 76.8783 },
        { name: 'Hisar', lat: 29.1492, lon: 75.7217 },
        { name: 'Sirsa', lat: 29.5349, lon: 75.0289 },
        { name: 'Jind', lat: 29.3162, lon: 76.3142 },
        { name: 'Kaithal', lat: 29.8015, lon: 76.3998 },
      ]
    },
    {
      state: 'Odisha',
      districts: [
        { name: 'Cuttack', lat: 20.4625, lon: 85.8830 },
        { name: 'Puri', lat: 19.8135, lon: 85.8312 },
        { name: 'Balasore', lat: 21.4934, lon: 86.9135 },
        { name: 'Sambalpur', lat: 21.4669, lon: 83.9756 },
        { name: 'Ganjam', lat: 19.3873, lon: 85.0540 },
        { name: 'Kendrapara', lat: 20.5024, lon: 86.4202 },
      ]
    },
    {
      state: 'Kerala',
      districts: [
        { name: 'Palakkad', lat: 10.7867, lon: 76.6548 },
        { name: 'Thrissur', lat: 10.5276, lon: 76.2144 },
        { name: 'Alappuzha', lat: 9.4981, lon: 76.3388 },
        { name: 'Wayanad', lat: 11.6854, lon: 76.1320 },
        { name: 'Idukki', lat: 9.9189, lon: 77.1025 },
        { name: 'Kottayam', lat: 9.5916, lon: 76.5222 },
      ]
    },
  ];

  // Flatten all districts for search
  const allDistricts = indianStates.flatMap(state => 
    state.districts.map(d => ({ ...d, state: state.state }))
  );

  // Filter districts based on search
  const filteredDistricts = searchQuery.length > 0 
    ? allDistricts.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Get current location using Geolocation API
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding using OpenStreetMap Nominatim (free)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          const data = await response.json();
          
          const village = data.address?.village || data.address?.hamlet || '';
          const town = data.address?.town || data.address?.city || '';
          const district = data.address?.county || data.address?.state_district || '';
          const state = data.address?.state || '';
          
          // Build location name prioritizing village/town
          let locationName = '';
          if (village) locationName = village;
          else if (town) locationName = town;
          
          if (district && district !== locationName) {
            locationName = locationName ? `${locationName}, ${district}` : district;
          }
          if (state) {
            locationName = locationName ? `${locationName}, ${state}` : state;
          }
          
          if (!locationName) locationName = 'Your Location';
          
          setLocationInput(locationName);
          setFormData(prev => ({
            ...prev,
            location: { lat: latitude, lon: longitude, name: locationName }
          }));
        } catch (error) {
          // If reverse geocoding fails, still use coordinates
          setLocationInput(`Your Farm Location`);
          setFormData(prev => ({
            ...prev,
            location: { lat: latitude, lon: longitude, name: `Your Farm Location` }
          }));
        }
        
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access or select district manually.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please select district manually.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again or select district.';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const selectDistrict = (district) => {
    const locationName = `${district.name}, ${district.state}`;
    setLocationInput(locationName);
    setSearchQuery('');
    setFormData(prev => ({
      ...prev,
      location: { lat: district.lat, lon: district.lon, name: locationName }
    }));
  };

  const seasons = [
    { value: 'Kharif', label: 'Kharif (Monsoon)', icon: '🌧️', months: 'June - October' },
    { value: 'Rabi', label: 'Rabi (Winter)', icon: '❄️', months: 'October - March' },
    { value: 'Zaid', label: 'Zaid (Summer)', icon: '☀️', months: 'March - June' },
    { value: 'All Year', label: 'All Year Round', icon: '🌍', months: 'Any Season' },
  ];

  const soilTypes = [
    { value: 'loamy', label: 'Loamy Soil', emoji: '🟤', desc: 'Best for most crops' },
    { value: 'sandy', label: 'Sandy Soil', emoji: '🟡', desc: 'Good drainage' },
    { value: 'clay', label: 'Clay Soil', emoji: '🔴', desc: 'Water retention' },
    { value: 'black', label: 'Black Soil', emoji: '⚫', desc: 'Cotton belt' },
    { value: 'red', label: 'Red Soil', emoji: '🔶', desc: 'Common in South' },
    { value: 'alluvial', label: 'Alluvial Soil', emoji: '🟢', desc: 'River plains' },
  ];

  const irrigationTypes = [
    { value: 'rain-fed', label: 'Rain-fed', icon: '🌧️' },
    { value: 'drip', label: 'Drip Irrigation', icon: '💧' },
    { value: 'sprinkler', label: 'Sprinkler', icon: '💦' },
    { value: 'flood', label: 'Flood/Canal', icon: '🌊' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location || !formData.season || !formData.soil_type || !formData.irrigation) {
      alert('Please fill all required fields');
      return;
    }
    onNext();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Location */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Select Your Farm Location
        </label>
        
        {/* Current Location Button - Best for farmers in field */}
        <motion.button
          type="button"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full mb-4 p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${
            formData.location?.name?.includes('Your') || formData.location?.name?.includes('Farm')
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-dashed border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-50 hover:border-emerald-500'
          }`}
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="font-semibold text-emerald-700">Finding your farm location...</span>
            </>
          ) : (
            <>
              <Navigation className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <span className="font-semibold text-emerald-700 block">📍 Use My Farm's Current Location</span>
                <span className="text-xs text-emerald-600">Best accuracy - uses your phone's GPS</span>
              </div>
            </>
          )}
        </motion.button>
        
        {locationError && (
          <p className="text-sm text-red-600 mb-3 p-2 bg-red-50 rounded-lg">⚠️ {locationError}</p>
        )}
        
        <p className="text-center text-gray-500 text-sm mb-3">— OR search your district —</p>
        
        {/* Search Box */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district or state (e.g., Guntur, Punjab, Thanjavur)"
            className="input-field pl-10"
          />
        </div>
        
        {/* Search Results */}
        {searchQuery.length > 0 && (
          <div className="mb-4 max-h-48 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-lg">
            {filteredDistricts.length > 0 ? (
              filteredDistricts.slice(0, 10).map((district, idx) => (
                <motion.button
                  key={`${district.name}-${district.state}`}
                  type="button"
                  whileHover={{ backgroundColor: '#f0fdf4' }}
                  onClick={() => selectDistrict(district)}
                  className="w-full p-3 text-left border-b border-gray-100 last:border-b-0 hover:bg-emerald-50"
                >
                  <div className="font-medium text-gray-800">{district.name}</div>
                  <div className="text-xs text-gray-500">{district.state}</div>
                </motion.button>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-center">
                No districts found. Try a different search or use GPS.
              </div>
            )}
          </div>
        )}
        
        {/* Quick Select - Major Agricultural Districts */}
        {searchQuery.length === 0 && !formData.location && (
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">🌾 Popular Agricultural Districts:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { name: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lon: 80.4365 },
                { name: 'Thanjavur', state: 'Tamil Nadu', lat: 10.7870, lon: 79.1378 },
                { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573 },
                { name: 'Nashik', state: 'Maharashtra', lat: 20.0063, lon: 73.7895 },
                { name: 'Karnal', state: 'Haryana', lat: 29.6857, lon: 76.9905 },
                { name: 'Muzaffarnagar', state: 'Uttar Pradesh', lat: 29.4727, lon: 77.7085 },
              ].map((district) => (
                <motion.button
                  key={district.name}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectDistrict(district)}
                  className="p-2 rounded-lg border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 text-left transition-all"
                >
                  <div className="font-medium text-sm text-gray-800">{district.name}</div>
                  <div className="text-xs text-gray-500">{district.state}</div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
        
        {/* Selected Location Display */}
        {formData.location && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800">
                📍 {formData.location.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, location: null }));
                setLocationInput('');
                setSearchQuery('');
              }}
              className="text-xs text-gray-500 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50"
            >
              ✕ Change
            </button>
          </motion.div>
        )}
      </div>

      {/* Season */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <Calendar className="w-5 h-5 text-emerald-600" />
          Planting Season
        </label>
        <div className="grid grid-cols-2 gap-3">
          {seasons.map((season) => (
            <motion.button
              key={season.value}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData(prev => ({ ...prev, season: season.value }))}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.season === season.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{season.icon}</span>
                <span className="font-semibold text-gray-800">{season.label}</span>
              </div>
              <div className="text-xs text-gray-500">{season.months}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Soil Type */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <Sprout className="w-5 h-5 text-emerald-600" />
          Soil Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {soilTypes.map((soil) => (
            <motion.button
              key={soil.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData(prev => ({ ...prev, soil_type: soil.value }))}
              className={`p-3 rounded-xl border-2 transition-all ${
                formData.soil_type === soil.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{soil.emoji}</div>
              <div className="font-semibold text-sm text-gray-800">{soil.label}</div>
              <div className="text-xs text-gray-500">{soil.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Irrigation */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          <Droplet className="w-5 h-5 text-emerald-600" />
          Irrigation Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          {irrigationTypes.map((irrigation) => (
            <motion.button
              key={irrigation.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormData(prev => ({ ...prev, irrigation: irrigation.value }))}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.irrigation === irrigation.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-2">{irrigation.icon}</div>
              <div className="font-semibold text-gray-800">{irrigation.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full"
      >
        Continue to Budget & Land Details →
      </motion.button>
    </motion.form>
  );
};

export default FormStep1;

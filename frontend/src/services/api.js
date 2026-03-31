import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds for AI processing
});

export const getCropRecommendations = async (formData) => {
  try {
    const response = await apiClient.post('/api/recommend', formData);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const testWeather = async (lat, lon) => {
  try {
    const response = await apiClient.get('/api/test-weather', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health Check Error:', error);
    throw error;
  }
};

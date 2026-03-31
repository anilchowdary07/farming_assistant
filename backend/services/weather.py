import requests
from typing import Dict, Optional


class WeatherService:
    """Service to fetch weather data from Open-Meteo API."""
    
    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1/forecast"
        
    def get_current_weather(self, lat: float, lon: float) -> Dict:
        """
        Fetch current weather conditions
        
        Args:
            lat: Latitude
            lon: Longitude
            
        Returns:
            Dict containing weather data
        """
        try:
            print(f"Fetching Open-Meteo weather for lat={lat}, lon={lon}")

            params = {
                'latitude': lat,
                'longitude': lon,
                'timezone': 'auto',
                'current': 'temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code,precipitation',
                'hourly': 'precipitation,weather_code,temperature_2m',
                'forecast_days': 3
            }
            
            response = requests.get(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

            current = data.get('current', {})
            if not current:
                return self._get_fallback_weather(lat, lon)

            print(
                "Weather data received: "
                f"{current.get('temperature_2m', 'n/a')}C, "
                f"code={current.get('weather_code', 'n/a')}"
            )
            
            # Process data
            rainfall_prediction = self._analyze_rainfall(current, data.get('hourly'))
            forecast_summary = self._generate_forecast_summary(data.get('hourly'))
            description = self._weather_code_to_description(current.get('weather_code'))
            
            return {
                'temp': round(current.get('temperature_2m', 0.0), 1),
                'humidity': current.get('relative_humidity_2m', 0),
                'rainfall': rainfall_prediction,
                'forecast': forecast_summary,
                'wind_speed': round(current.get('wind_speed_10m', 0.0), 1),
                'description': description,
                'feels_like': round(current.get('apparent_temperature', current.get('temperature_2m', 0.0)), 1),
                'pressure': current.get('surface_pressure', 1013),
                'clouds': current.get('cloud_cover', 0),
                'is_real_data': True,
                'location_name': 'Live',
                'raw_data': data
            }
            
        except requests.exceptions.Timeout:
            print("Weather API timeout - server took too long to respond")
            return self._get_fallback_weather(lat, lon)
        except requests.exceptions.ConnectionError:
            print("Weather API connection error - check internet connection")
            return self._get_fallback_weather(lat, lon)
        except requests.exceptions.RequestException as e:
            print(f"Weather API error: {e}")
            return self._get_fallback_weather(lat, lon)
        except Exception as e:
            print(f"Unexpected error fetching weather: {e}")
            return self._get_fallback_weather(lat, lon)
    
    def _get_fallback_weather(self, lat: float, lon: float) -> Dict:
        """Generate realistic fallback weather based on location and season"""
        import datetime
        
        month = datetime.datetime.now().month
        
        # Seasonal adjustments for India
        if month in [3, 4, 5]:  # Summer (March-May)
            temp = 35.0
            humidity = 40
            rainfall = 'no rainfall expected'
            description = 'Hot and Dry'
            forecast = 'Hot summer conditions. Ensure adequate irrigation. Avoid mid-day farming activities.'
        elif month in [6, 7, 8, 9]:  # Monsoon (June-September)
            temp = 28.0
            humidity = 85
            rainfall = 'moderate to heavy rainfall'
            description = 'Monsoon Season'
            forecast = 'Monsoon active. Good conditions for Kharif crops. Prepare drainage for excess water.'
        elif month in [10, 11]:  # Post-monsoon (October-November)
            temp = 26.0
            humidity = 65
            rainfall = 'light showers possible'
            description = 'Pleasant Weather'
            forecast = 'Post-monsoon conditions. Good time for Rabi sowing. Soil moisture adequate.'
        else:  # Winter (December-February)
            temp = 18.0
            humidity = 55
            rainfall = 'no rainfall expected'
            description = 'Cool and Dry'
            forecast = 'Winter season. Protect crops from frost. Good for wheat and mustard.'
        
        # Adjust for latitude (north vs south India)
        if lat < 20:  # South India is warmer
            temp += 3
            humidity += 10
        elif lat > 28:  # North India is cooler
            temp -= 5
            
        return {
            'temp': round(temp, 1),
            'humidity': min(humidity, 100),
            'rainfall': rainfall,
            'forecast': f"Using estimated data (API unavailable). {forecast}",
            'wind_speed': 8.0,
            'description': description,
            'feels_like': round(temp + 2, 1),
            'pressure': 1013,
            'clouds': 30,
            'is_real_data': False,
            'location_name': 'Estimated'
        }
    
    def _analyze_rainfall(self, current_data: Dict, hourly_data: Optional[Dict]) -> str:
        """Analyze rainfall from current and next 24-hour precipitation."""
        try:
            rain_now = float(current_data.get('precipitation', 0) or 0)
            
            if hourly_data:
                hourly_rain = hourly_data.get('precipitation', [])[:24]
                forecast_rain = sum(float(v or 0) for v in hourly_rain)
                total_rain = rain_now + forecast_rain
            else:
                total_rain = rain_now
            
            if total_rain == 0:
                return 'no rainfall expected'
            elif total_rain < 10:
                return 'light rainfall'
            elif total_rain < 50:
                return 'moderate rainfall'
            else:
                return 'heavy rainfall expected'
                
        except Exception as e:
            print(f"Rainfall analysis error: {e}")
            return 'moderate'
    
    def _generate_forecast_summary(self, hourly_data: Optional[Dict]) -> str:
        """Generate human-readable forecast summary."""
        try:
            if not hourly_data:
                return "Forecast unavailable"
            
            temps = [float(v) for v in hourly_data.get('temperature_2m', [])[:24] if v is not None]
            weather_codes = hourly_data.get('weather_code', [])[:24]

            if not temps:
                return "Forecast unavailable"
            
            avg_temp = sum(temps) / len(temps)

            rain_like = sum(1 for code in weather_codes if int(code) in {51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82})
            storm_like = sum(1 for code in weather_codes if int(code) in {95, 96, 99})
            cloud_like = sum(1 for code in weather_codes if int(code) in {1, 2, 3, 45, 48})

            if storm_like > 0:
                return f"Storm risk possible. Avg temp: {avg_temp:.0f}C. Secure farm inputs and avoid spraying before storms."
            if rain_like >= 6:
                return f"Rainy conditions expected. Avg temp: {avg_temp:.0f}°C. Good for water-intensive crops."
            if cloud_like >= 8:
                return f"Partly cloudy conditions. Avg temp: {avg_temp:.0f}C. Favorable for most crops."
            else:
                return f"Clear skies ahead. Avg temp: {avg_temp:.0f}°C. Ensure adequate irrigation."
                
        except Exception as e:
            print(f"Forecast summary error: {e}")
            return "Weather conditions appear stable for farming activities."

    def _weather_code_to_description(self, weather_code: Optional[int]) -> str:
        """Map Open-Meteo weather code to a readable description."""
        mapping = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Light freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snowfall',
            73: 'Moderate snowfall',
            75: 'Heavy snowfall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        }
        return mapping.get(int(weather_code), 'Weather conditions updated') if weather_code is not None else 'Weather conditions updated'


# Singleton instance
weather_service = WeatherService()

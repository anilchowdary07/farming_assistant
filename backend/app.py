from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from models.schemas import CropRequest, CropResponse, Weather, MarketInsights
from services.weather import weather_service
from services.gemini import gemini_service
from pydantic import ValidationError
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'AI Crop Advisory Backend'
    })


@app.route('/api/recommend', methods=['POST'])
def recommend_crops():
    """
    Main endpoint to get crop recommendations
    
    Request body should match CropRequest schema
    Returns CropResponse with weather, recommendations, and market insights
    """
    try:
        # Parse and validate request
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Request body is required'}), 400
        
        try:
            crop_request = CropRequest(**data)
        except ValidationError as e:
            return jsonify({
                'error': 'Invalid request data',
                'details': e.errors()
            }), 400
        
        # Step 1: Fetch weather data
        print(f"Fetching weather for {crop_request.location.name} ({crop_request.location.lat}, {crop_request.location.lon})")
        weather_data = weather_service.get_current_weather(
            crop_request.location.lat,
            crop_request.location.lon
        )
        
        # Step 2: Get AI crop recommendations
        print(f"Getting AI recommendations for {crop_request.season} season...")
        ai_response = gemini_service.get_crop_recommendations(
            location_name=crop_request.location.name,
            season=crop_request.season,
            budget=crop_request.budget,
            land_size=crop_request.land_size,
            land_unit=crop_request.land_unit,
            harvest_timeline=crop_request.harvest_timeline,
            soil_type=crop_request.soil_type,
            irrigation=crop_request.irrigation,
            weather_data=weather_data
        )
        
        # Step 3: Build response
        response_data = {
            'weather': {
                'temp': weather_data['temp'],
                'humidity': weather_data['humidity'],
                'rainfall': weather_data['rainfall'],
                'forecast': weather_data['forecast'],
                'wind_speed': weather_data.get('wind_speed'),
                'description': weather_data.get('description'),
                'feels_like': weather_data.get('feels_like'),
                'location_name': weather_data.get('location_name'),
                'is_real_data': weather_data.get('is_real_data', False)
            },
            'recommendations': ai_response['recommendations'],
            'market_insights': ai_response.get('market_insights'),
            'timestamp': datetime.utcnow().isoformat()
        }
        
        # Validate response
        try:
            validated_response = CropResponse(**response_data)
            return jsonify(validated_response.dict()), 200
        except ValidationError as e:
            print(f"Response validation error: {e}")
            # Return anyway but log the error
            return jsonify(response_data), 200
        
    except Exception as e:
        print(f"Error in recommend_crops: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500


@app.route('/api/test-weather', methods=['GET'])
def test_weather():
    """Test endpoint for weather service"""
    lat = request.args.get('lat', 12.9716)  # Default: Bangalore
    lon = request.args.get('lon', 77.5946)
    
    try:
        lat = float(lat)
        lon = float(lon)
        weather_data = weather_service.get_current_weather(lat, lon)
        return jsonify(weather_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    import os
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"""
    ╔════════════════════════════════════════════════╗
    ║   🌾 AI Crop Advisory Backend Server 🌾       ║
    ╠════════════════════════════════════════════════╣
    ║   Port: {port}                                    ║
    ║   Debug: {debug}                                ║
    ║   Endpoints:                                   ║
    ║   - GET  /health                               ║
    ║   - POST /api/recommend                        ║
    ║   - GET  /api/test-weather                     ║
    ╚════════════════════════════════════════════════╝
    """)
    
    app.run(host='0.0.0.0', port=port, debug=debug)

#!/usr/bin/env python3
"""
Integration test for AI Crop Advisory System
Tests the full workflow from API request to response
"""

import requests
import json
import sys

def test_health():
    """Test backend health endpoint"""
    print("🔍 Testing backend health...")
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Backend is healthy")
            return True
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend health check error: {e}")
        return False

def test_recommendation():
    """Test crop recommendation endpoint"""
    print("\n🌾 Testing crop recommendation API...")
    
    test_data = {
        "location": {
            "lat": 12.9716,
            "lon": 77.5946,
            "name": "Bangalore, Karnataka"
        },
        "season": "Kharif",
        "budget": 50000,
        "land_size": 2.5,
        "land_unit": "acres",
        "harvest_timeline": "3-4 months",
        "soil_type": "loamy",
        "irrigation": "drip"
    }
    
    try:
        print("📤 Sending request...")
        response = requests.post(
            'http://localhost:5000/api/recommend',
            json=test_data,
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API request successful!")
            
            # Validate response structure
            print("\n📊 Validating response structure...")
            
            if 'weather' in data:
                print(f"  ✅ Weather data present: {data['weather']['temp']}°C, {data['weather']['humidity']}% humidity")
            else:
                print("  ❌ Weather data missing")
                return False
            
            if 'recommendations' in data and len(data['recommendations']) == 3:
                print(f"  ✅ Got {len(data['recommendations'])} crop recommendations")
                
                for i, crop in enumerate(data['recommendations'], 1):
                    print(f"\n  Crop {i}: {crop.get('emoji', '')} {crop.get('name', 'Unknown')}")
                    print(f"    - Investment: ₹{crop.get('investment', 0):,}")
                    print(f"    - Profit Range: ₹{crop.get('profit_range', 'N/A')}")
                    print(f"    - ROI: {crop.get('roi_percentage', 0)}%")
                    print(f"    - Risk Level: {crop.get('risk_level', 'unknown').upper()}")
                    print(f"    - Confidence: {crop.get('confidence_score', 0)*100:.0f}%")
                    print(f"    - Steps: {len(crop.get('steps', []))} cultivation steps")
                    print(f"    - Risks: {len(crop.get('risks', []))} identified")
            else:
                print(f"  ❌ Expected 3 recommendations, got {len(data.get('recommendations', []))}")
                return False
            
            if 'market_insights' in data:
                print(f"\n  ✅ Market insights present")
            
            print("\n✅ All validations passed!")
            return True
            
        else:
            print(f"❌ API request failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ Request timed out (AI processing can take 30-60 seconds)")
        return False
    except Exception as e:
        print(f"❌ Test error: {e}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("🧪 AI CROP ADVISORY - INTEGRATION TEST")
    print("=" * 60)
    
    results = []
    
    # Test 1: Health check
    results.append(test_health())
    
    # Test 2: Full recommendation flow
    results.append(test_recommendation())
    
    print("\n" + "=" * 60)
    if all(results):
        print("🎉 ALL TESTS PASSED!")
        print("=" * 60)
        print("\n✨ Your AI Crop Advisory system is ready!")
        print("\n🌐 Frontend: http://localhost:3000")
        print("🔧 Backend:  http://localhost:5000")
        print("\n💡 Open the frontend URL in your browser to use the app!")
        return 0
    else:
        print("❌ SOME TESTS FAILED")
        print("=" * 60)
        return 1

if __name__ == "__main__":
    sys.exit(main())

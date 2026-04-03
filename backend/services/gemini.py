import google.generativeai as genai
import os
import json
import re
from typing import Dict, List
from dotenv import load_dotenv

load_dotenv()


class GeminiService:
    """Service to get AI-powered crop recommendations using Gemini API"""
    
    def __init__(self):
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        # Use gemini-1.5-flash for faster responses (gemini-pro was deprecated)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def get_crop_recommendations(
        self, 
        location_name: str,
        season: str,
        budget: float,
        land_size: float,
        land_unit: str,
        harvest_timeline: str,
        soil_type: str,
        irrigation: str,
        weather_data: Dict
    ) -> Dict:
        """
        Get AI-powered crop recommendations based on input parameters
        
        Returns:
            Dict containing 3 crop recommendations with all required fields
        """
        
        # Build comprehensive prompt
        prompt = self._build_prompt(
            location_name, season, budget, land_size, land_unit,
            harvest_timeline, soil_type, irrigation, weather_data
        )
        
        try:
            print(f"🤖 Calling Gemini AI for {location_name}, {season} season...")
            
            # Generate content
            response = self.model.generate_content(prompt)
            
            print(f"✅ Gemini response received ({len(response.text)} chars)")
            
            # Extract JSON from response
            json_data = self._extract_json(response.text)
            
            if json_data and 'recommendations' in json_data:
                print(f"✅ AI recommendations: {[c['name'] for c in json_data['recommendations']]}")
                return json_data
            else:
                print(f"⚠️ Could not parse AI response, using fallback")
                return self._get_fallback_recommendations(season, soil_type, irrigation)
            
        except Exception as e:
            print(f"❌ Gemini API error: {e}")
            # Return fallback recommendations
            return self._get_fallback_recommendations(season, soil_type, irrigation)
    
    def _build_prompt(
        self, location_name, season, budget, land_size, land_unit,
        harvest_timeline, soil_type, irrigation, weather_data
    ) -> str:
        """Build structured prompt for Gemini"""
        
        return f"""You are an expert agricultural advisor helping Indian farmers make data-driven crop selection decisions.

**FARMER'S CONTEXT:**
- Location: {location_name}
- Season: {season}
- Budget Available: ₹{budget:,.0f}
- Land Size: {land_size} {land_unit}
- Harvest Timeline: {harvest_timeline}
- Soil Type: {soil_type}
- Irrigation: {irrigation}

**CURRENT WEATHER CONDITIONS:**
- Temperature: {weather_data.get('temp')}°C
- Humidity: {weather_data.get('humidity')}%
- Rainfall: {weather_data.get('rainfall')}
- Forecast: {weather_data.get('forecast')}
- Wind Speed: {weather_data.get('wind_speed')} m/s

**TASK:**
Recommend EXACTLY 3 crops that are:
1. Suitable for the given season, soil type, and climate
2. Profitable within the farmer's budget
3. Harvestable within the specified timeline
4. Regionally appropriate for {location_name}
5. Aligned with current market demand

**CRITICAL INSTRUCTIONS:**
- Consider REAL Indian crop varieties (e.g., "Rice (IR64)", "Wheat (HD2967)", "Cotton (Bt)")
- Include practical investment calculations (seeds, fertilizer, labor, irrigation)
- Provide REALISTIC profit ranges based on current MSP and market rates
- Factor in the irrigation method when recommending crops
- Prioritize crops with proven success in similar conditions
- Include confidence scores based on data quality (0.0 to 1.0)

**REQUIRED JSON OUTPUT FORMAT (STRICT):**
Return ONLY valid JSON with this exact structure:

{{
  "recommendations": [
    {{
      "name": "Crop Name (Variety)",
      "emoji": "🌾",
      "reason": "2-3 sentence explanation of why this crop is ideal for the farmer's specific conditions",
      "investment": 45000,
      "profit_range": "70000-95000",
      "roi_percentage": 75,
      "risk_level": "low",
      "harvest_time": "120 days",
      "water_requirement": "high/medium/low",
      "steps": [
        "Week 1: Land preparation - Deep plowing 2-3 times, level field, apply 8-10 tonnes FYM per acre",
        "Week 2: Sowing - Use 20-25 kg certified seeds per acre, treat seeds with Carbendazim 2g/kg, maintain 20x10cm spacing",
        "Week 3-8: Irrigation - Water immediately after sowing, maintain 2-3 inch water level, drain before fertilizer application",
        "Week 4: First fertilization - Apply 50kg Urea + 100kg DAP + 25kg MOP per acre at tillering stage",
        "Week 8: Second fertilization - Apply 50kg Urea per acre at panicle initiation stage",
        "Week 6-12: Pest control - Monitor for stem borer, apply Chlorantraniliprole 0.4ml/L if needed, use pheromone traps",
        "Week 12: Pre-harvest - Stop irrigation 10 days before harvest",
        "Week 16-18: Harvesting - When 80% grains turn golden, moisture 20-25%, use combine harvester or manual sickle"
      ],
      "risks": [
        "Stem borer and leaf folder attack (peak: Week 6-10) - Use Chlorantraniliprole 18.5 SC @ 0.3ml/L, install pheromone traps 8-10 per acre",
        "Blast disease in humid conditions - Spray Tricyclazole 75% WP @ 0.6g/L at tillering and panicle stages, ensure field drainage",
        "Market price volatility - Government MSP ₹2,183/quintal (2024), consider FCI procurement or contract farming for guaranteed price"
      ],
      "confidence_score": 0.92,
      "ui_hints": {{
        "gradient": ["#10b981", "#059669"],
        "icon_color": "#10b981"
      }}
    }}
  ],
  "market_insights": {{
    "trending_crops": ["Rice", "Maize", "Pulses"],
    "price_trends": "Stable with slight upward trend due to government MSP increase"
  }}
}}

**COLOR SCHEMES FOR UI (use these gradients):**
- Low Risk: ["#10b981", "#059669"] (green)
- Medium Risk: ["#f59e0b", "#d97706"] (amber)
- High Risk: ["#ef4444", "#dc2626"] (red)

**IMPORTANT:**
- Return ONLY the JSON object, no markdown, no explanations
- All 3 crops must be DIFFERENT and suitable for the conditions
- Steps array must have 6-8 DETAILED, TIMELINE-BASED steps with SPECIFIC quantities and inputs
- Each step MUST include timing (Week/Day/Month), specific fertilizer/pesticide names, dosages, and application methods
- Example: "Week 4: Apply 50kg Urea + 100kg DAP per acre" NOT "Apply fertilizers"
- Include SPECIFIC pesticide names (e.g., "Chlorantraniliprole 18.5 SC @ 0.3ml/L") NOT generic "pesticides"
- Risks array must have 3-4 SPECIFIC risks with EXACT mitigation strategies including product names and dosages
- Investment and profit must be realistic for {land_size} {land_unit}
- Confidence score should reflect certainty based on available data
- Each crop MUST have UNIQUE cultivation steps specific to that crop variety

Generate the recommendations now with MAXIMUM DETAIL and SPECIFICITY:"""

    def _extract_json(self, text: str) -> Dict:
        """Extract JSON from Gemini response"""
        try:
            # Try direct JSON parse first
            return json.loads(text)
        except json.JSONDecodeError:
            # Extract JSON from markdown code blocks
            json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group(1))
            
            # Try to find JSON object in text
            json_match = re.search(r'\{.*"recommendations".*\}', text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group(0))
            
            raise ValueError("Could not extract valid JSON from Gemini response")
    
    def _get_fallback_recommendations(self, season: str, soil_type: str, irrigation: str) -> Dict:
        """Provide fallback recommendations if AI fails - with variety based on inputs"""
        
        # Comprehensive fallback crops by season AND soil type
        fallback_data = {
            "Kharif": {
                "black": [
                    {"name": "Cotton (Bt Hybrid)", "emoji": "☁️", "reason": "Black soil retains moisture well, perfect for cotton. Bt varieties resist bollworm.", "investment": 50000, "profit_range": "80000-120000", "roi_percentage": 80, "risk_level": "medium", "harvest_time": "150-180 days", "water_requirement": "medium"},
                    {"name": "Soybean (JS 335)", "emoji": "🫘", "reason": "Soybean thrives in black soil with good drainage. High protein content fetches premium prices.", "investment": 30000, "profit_range": "50000-70000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "90-100 days", "water_requirement": "medium"},
                    {"name": "Pigeon Pea (Arhar)", "emoji": "🫛", "reason": "Drought-tolerant pulse crop, improves soil nitrogen. Good intercrop with cotton.", "investment": 25000, "profit_range": "45000-60000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "150-180 days", "water_requirement": "low"},
                ],
                "red": [
                    {"name": "Groundnut (TMV-2)", "emoji": "🥜", "reason": "Red soil's good drainage suits groundnut. High oil content variety.", "investment": 35000, "profit_range": "55000-75000", "roi_percentage": 65, "risk_level": "medium", "harvest_time": "100-120 days", "water_requirement": "medium"},
                    {"name": "Jowar (CSH-14)", "emoji": "🌾", "reason": "Drought-tolerant millet, ideal for red soils with low water retention.", "investment": 20000, "profit_range": "35000-50000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "100-110 days", "water_requirement": "low"},
                    {"name": "Castor", "emoji": "🌿", "reason": "Industrial oilseed thriving in red soils. Good export demand.", "investment": 25000, "profit_range": "50000-70000", "roi_percentage": 85, "risk_level": "medium", "harvest_time": "140-150 days", "water_requirement": "low"},
                ],
                "alluvial": [
                    {"name": "Rice (Pusa Basmati)", "emoji": "🌾", "reason": "Alluvial soil's fertility supports premium Basmati rice with high export value.", "investment": 45000, "profit_range": "80000-110000", "roi_percentage": 85, "risk_level": "low", "harvest_time": "130-140 days", "water_requirement": "high"},
                    {"name": "Sugarcane", "emoji": "🎋", "reason": "Heavy feeder crop that thrives in nutrient-rich alluvial soils.", "investment": 60000, "profit_range": "100000-150000", "roi_percentage": 90, "risk_level": "medium", "harvest_time": "300-365 days", "water_requirement": "high"},
                    {"name": "Maize (DHM 117)", "emoji": "🌽", "reason": "High-yielding hybrid for fertile soils. Good for both grain and fodder.", "investment": 35000, "profit_range": "55000-75000", "roi_percentage": 65, "risk_level": "low", "harvest_time": "90-100 days", "water_requirement": "medium"},
                ],
                "loamy": [
                    {"name": "Turmeric (Lakadong)", "emoji": "🟡", "reason": "Loamy soil's balanced texture perfect for turmeric rhizomes. High curcumin variety.", "investment": 50000, "profit_range": "90000-130000", "roi_percentage": 95, "risk_level": "medium", "harvest_time": "240-270 days", "water_requirement": "medium"},
                    {"name": "Ginger", "emoji": "🫚", "reason": "Spice crop thriving in well-drained loamy soils. Strong domestic demand.", "investment": 55000, "profit_range": "85000-120000", "roi_percentage": 75, "risk_level": "medium", "harvest_time": "210-240 days", "water_requirement": "medium"},
                    {"name": "Vegetables (Mixed)", "emoji": "🥬", "reason": "Loamy soil supports diverse vegetables - tomato, brinjal, okra rotation.", "investment": 40000, "profit_range": "70000-100000", "roi_percentage": 80, "risk_level": "medium", "harvest_time": "60-90 days", "water_requirement": "medium"},
                ],
                "sandy": [
                    {"name": "Bajra (Pearl Millet)", "emoji": "🌾", "reason": "Drought-hardy millet perfect for sandy soils. Low input, assured returns.", "investment": 18000, "profit_range": "30000-45000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "75-90 days", "water_requirement": "low"},
                    {"name": "Moth Bean", "emoji": "🫘", "reason": "Pulse crop adapted to sandy soils and dry conditions. Good fodder value.", "investment": 15000, "profit_range": "28000-38000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "60-75 days", "water_requirement": "low"},
                    {"name": "Cluster Bean (Guar)", "emoji": "🌿", "reason": "Industrial crop for gum extraction. Sandy soil specialist.", "investment": 20000, "profit_range": "40000-60000", "roi_percentage": 85, "risk_level": "medium", "harvest_time": "90-100 days", "water_requirement": "low"},
                ],
                "clay": [
                    {"name": "Rice (Swarna)", "emoji": "🌾", "reason": "Clay soil's water retention suits paddy. Swarna is high-yielding.", "investment": 38000, "profit_range": "60000-80000", "roi_percentage": 65, "risk_level": "low", "harvest_time": "120-130 days", "water_requirement": "high"},
                    {"name": "Jute", "emoji": "🌿", "reason": "Fiber crop thriving in waterlogged clay soils. Good MSP support.", "investment": 25000, "profit_range": "45000-60000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "100-120 days", "water_requirement": "high"},
                    {"name": "Water Chestnut", "emoji": "🌰", "reason": "Aquatic crop perfect for waterlogged clay fields. High market value.", "investment": 30000, "profit_range": "55000-75000", "roi_percentage": 80, "risk_level": "medium", "harvest_time": "180-200 days", "water_requirement": "high"},
                ],
            },
            "Rabi": {
                "black": [
                    {"name": "Chickpea (JG 11)", "emoji": "🫘", "reason": "Black soil's moisture retention ideal for chickpea. Disease-resistant variety.", "investment": 28000, "profit_range": "48000-65000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "100-110 days", "water_requirement": "low"},
                    {"name": "Safflower", "emoji": "🌻", "reason": "Oilseed crop suited to residual moisture in black soils.", "investment": 22000, "profit_range": "40000-55000", "roi_percentage": 80, "risk_level": "low", "harvest_time": "130-150 days", "water_requirement": "low"},
                    {"name": "Linseed", "emoji": "🌸", "reason": "Industrial oilseed thriving in heavy black soils. Good export potential.", "investment": 20000, "profit_range": "38000-50000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "120-140 days", "water_requirement": "low"},
                ],
                "alluvial": [
                    {"name": "Wheat (HD 2967)", "emoji": "🌾", "reason": "Premium wheat variety for fertile alluvial soils. High MSP support.", "investment": 35000, "profit_range": "60000-80000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "120-140 days", "water_requirement": "medium"},
                    {"name": "Mustard (Pusa Bold)", "emoji": "🌻", "reason": "Oilseed crop with strong domestic demand. Good for crop rotation.", "investment": 25000, "profit_range": "45000-60000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "90-110 days", "water_requirement": "low"},
                    {"name": "Potato (Kufri Jyoti)", "emoji": "🥔", "reason": "High-value vegetable crop for alluvial soils. Multiple markets.", "investment": 50000, "profit_range": "85000-120000", "roi_percentage": 80, "risk_level": "medium", "harvest_time": "90-100 days", "water_requirement": "medium"},
                ],
                "loamy": [
                    {"name": "Peas (Arkel)", "emoji": "🫛", "reason": "Premium vegetable pea variety. Loamy soil perfect for root development.", "investment": 35000, "profit_range": "60000-85000", "roi_percentage": 80, "risk_level": "medium", "harvest_time": "65-75 days", "water_requirement": "medium"},
                    {"name": "Onion (Nasik Red)", "emoji": "🧅", "reason": "Storage variety with good keeping quality. Loamy soil ensures good bulb size.", "investment": 45000, "profit_range": "80000-120000", "roi_percentage": 85, "risk_level": "high", "harvest_time": "100-120 days", "water_requirement": "medium"},
                    {"name": "Garlic", "emoji": "🧄", "reason": "High-value spice crop. Loamy soil supports bulb development.", "investment": 40000, "profit_range": "70000-100000", "roi_percentage": 80, "risk_level": "medium", "harvest_time": "140-160 days", "water_requirement": "medium"},
                ],
                "red": [
                    {"name": "Groundnut (Rabi)", "emoji": "🥜", "reason": "Second crop of groundnut suitable for red soil with irrigation.", "investment": 32000, "profit_range": "52000-70000", "roi_percentage": 65, "risk_level": "medium", "harvest_time": "100-120 days", "water_requirement": "medium"},
                    {"name": "Bengal Gram", "emoji": "🫘", "reason": "Pulse crop adapted to red soils. Low water requirement.", "investment": 25000, "profit_range": "45000-60000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "95-110 days", "water_requirement": "low"},
                    {"name": "Sunflower", "emoji": "🌻", "reason": "Oilseed crop for red soils. Short duration, good returns.", "investment": 28000, "profit_range": "48000-65000", "roi_percentage": 70, "risk_level": "medium", "harvest_time": "90-100 days", "water_requirement": "medium"},
                ],
                "sandy": [
                    {"name": "Cumin", "emoji": "🌿", "reason": "High-value spice crop suited to sandy soils of Rajasthan.", "investment": 30000, "profit_range": "60000-90000", "roi_percentage": 100, "risk_level": "medium", "harvest_time": "100-120 days", "water_requirement": "low"},
                    {"name": "Isabgol (Psyllium)", "emoji": "🌾", "reason": "Medicinal crop thriving in sandy soils. Export-oriented.", "investment": 25000, "profit_range": "50000-70000", "roi_percentage": 90, "risk_level": "medium", "harvest_time": "110-130 days", "water_requirement": "low"},
                    {"name": "Fennel (Saunf)", "emoji": "🌿", "reason": "Aromatic spice for sandy soils. Good market demand.", "investment": 28000, "profit_range": "55000-75000", "roi_percentage": 85, "risk_level": "medium", "harvest_time": "140-160 days", "water_requirement": "low"},
                ],
                "clay": [
                    {"name": "Wheat (PBW 343)", "emoji": "🌾", "reason": "Bread wheat variety adapted to heavy soils with good tilth.", "investment": 32000, "profit_range": "55000-72000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "125-135 days", "water_requirement": "medium"},
                    {"name": "Lentil (Masoor)", "emoji": "🫘", "reason": "Pulse crop tolerant of heavier soils. Good dal market.", "investment": 22000, "profit_range": "40000-55000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "100-120 days", "water_requirement": "low"},
                    {"name": "Barley", "emoji": "🌾", "reason": "Hardy cereal for clay soils. Good for malt and feed.", "investment": 20000, "profit_range": "35000-48000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "110-130 days", "water_requirement": "low"},
                ],
            },
            "Zaid": {
                "default": [
                    {"name": "Watermelon", "emoji": "🍉", "reason": "Summer favorite with high demand. Quick returns in 70-90 days.", "investment": 40000, "profit_range": "70000-100000", "roi_percentage": 85, "risk_level": "medium", "harvest_time": "70-90 days", "water_requirement": "high"},
                    {"name": "Muskmelon", "emoji": "🍈", "reason": "Premium fruit crop for summer. High market value.", "investment": 35000, "profit_range": "60000-85000", "roi_percentage": 75, "risk_level": "medium", "harvest_time": "65-80 days", "water_requirement": "high"},
                    {"name": "Cucumber", "emoji": "🥒", "reason": "Quick vegetable crop. Multiple harvests possible.", "investment": 30000, "profit_range": "50000-70000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "45-55 days", "water_requirement": "medium"},
                ],
                "loamy": [
                    {"name": "Summer Moong", "emoji": "🫘", "reason": "Short-duration pulse for loamy soils. Improves soil nitrogen.", "investment": 22000, "profit_range": "38000-52000", "roi_percentage": 75, "risk_level": "low", "harvest_time": "60-65 days", "water_requirement": "medium"},
                    {"name": "Bitter Gourd", "emoji": "🥬", "reason": "Medicinal vegetable with good summer demand.", "investment": 28000, "profit_range": "48000-68000", "roi_percentage": 70, "risk_level": "medium", "harvest_time": "55-60 days", "water_requirement": "medium"},
                    {"name": "Ridge Gourd", "emoji": "🥒", "reason": "Popular summer vegetable. Low maintenance crop.", "investment": 25000, "profit_range": "42000-58000", "roi_percentage": 70, "risk_level": "low", "harvest_time": "50-55 days", "water_requirement": "medium"},
                ],
            },
        }
        
        # Get crops based on season and soil type
        season_data = fallback_data.get(season, fallback_data.get("Kharif"))
        crops = season_data.get(soil_type, season_data.get("default", season_data.get(list(season_data.keys())[0])))
        
        # Materials/inputs required for each crop type
        materials_data = {
            "Cotton": {
                "seeds": "Bt Cotton hybrid seeds - 1.25 kg/acre (₹800-1000/packet)",
                "fertilizers": ["DAP - 50 kg/acre", "Urea - 50 kg/acre", "MOP - 25 kg/acre", "Zinc Sulphate - 10 kg/acre"],
                "pesticides": ["Imidacloprid (sucking pests)", "Emamectin Benzoate (bollworm)", "Neem oil spray"],
                "tools": ["Seed drill/Planter", "Sprayer (knapsack/power)", "Picking bags"],
                "other": ["FYM/Compost - 2 tons/acre", "Drip irrigation kit (optional)", "Mulching material"]
            },
            "Soybean": {
                "seeds": "JS 335 / JS 9560 seeds - 30 kg/acre (₹80-100/kg)",
                "fertilizers": ["DAP - 40 kg/acre", "MOP - 20 kg/acre", "Sulphur - 10 kg/acre"],
                "pesticides": ["Triazophos (stem fly)", "Quinalphos (girdle beetle)", "Mancozeb (fungicide)"],
                "tools": ["Seed drill", "Sprayer", "Thresher"],
                "other": ["Rhizobium culture - 200g/acre", "FYM - 1 ton/acre"]
            },
            "Pigeon Pea": {
                "seeds": "Arhar seeds - 6-8 kg/acre (₹150-200/kg)",
                "fertilizers": ["DAP - 40 kg/acre", "MOP - 15 kg/acre"],
                "pesticides": ["Quinalphos (pod borer)", "NPV (Helicoverpa)", "Neem-based sprays"],
                "tools": ["Seed drill", "Sprayer", "Thresher"],
                "other": ["Rhizobium culture - 200g/acre", "Pheromone traps - 5/acre"]
            },
            "Groundnut": {
                "seeds": "TMV-2 / JL-24 kernels - 50 kg/acre (₹100-120/kg)",
                "fertilizers": ["Gypsum - 200 kg/acre", "SSP - 100 kg/acre", "FYM - 2 tons/acre"],
                "pesticides": ["Chlorpyrifos (white grub)", "Mancozeb (tikka disease)", "Carbendazim (collar rot)"],
                "tools": ["Groundnut planter", "Digger/Harvester", "Decorticator"],
                "other": ["Rhizobium culture - 200g/acre", "Seed treatment chemicals"]
            },
            "Jowar": {
                "seeds": "CSH-14 / CSH-16 hybrid - 4 kg/acre (₹200-250/kg)",
                "fertilizers": ["DAP - 30 kg/acre", "Urea - 40 kg/acre", "MOP - 15 kg/acre"],
                "pesticides": ["Carbofuran (shoot fly)", "Carbaryl (stem borer)"],
                "tools": ["Seed drill", "Sprayer", "Thresher"],
                "other": ["FYM - 2 tons/acre"]
            },
            "Rice": {
                "seeds": "Certified seeds - 8-10 kg/acre (₹50-150/kg based on variety)",
                "fertilizers": ["DAP - 50 kg/acre", "Urea - 60 kg/acre (in 3 splits)", "MOP - 25 kg/acre", "Zinc Sulphate - 10 kg/acre"],
                "pesticides": ["Carbofuran (stem borer)", "Tricyclazole (blast)", "Buprofezin (BPH)"],
                "tools": ["Nursery trays/beds", "Transplanter/Manual", "Leveler", "Sprayer", "Harvester/Sickle"],
                "other": ["FYM - 2 tons/acre", "Blue-green algae culture", "Cono weeder"]
            },
            "Sugarcane": {
                "seeds": "Setts (3-bud) - 25,000-30,000/acre",
                "fertilizers": ["Urea - 120 kg/acre (in 3 splits)", "SSP - 150 kg/acre", "MOP - 60 kg/acre"],
                "pesticides": ["Chlorpyrifos (termites)", "Carbofuran (early shoot borer)", "Fipronil (white grub)"],
                "tools": ["Sugarcane planter", "Ridger", "Harvester/Manual cutting"],
                "other": ["FYM - 5 tons/acre", "Trash mulch", "Drip system (recommended)"]
            },
            "Maize": {
                "seeds": "Hybrid seeds - 8 kg/acre (₹300-400/kg)",
                "fertilizers": ["DAP - 50 kg/acre", "Urea - 60 kg/acre", "MOP - 30 kg/acre", "Zinc Sulphate - 10 kg/acre"],
                "pesticides": ["Emamectin Benzoate (fall armyworm)", "Chlorantraniliprole (stem borer)"],
                "tools": ["Seed drill/Planter", "Sprayer", "Maize sheller"],
                "other": ["FYM - 2 tons/acre", "Pheromone traps for FAW"]
            },
            "Wheat": {
                "seeds": "HD 2967 / PBW 343 seeds - 40 kg/acre (₹30-50/kg)",
                "fertilizers": ["DAP - 50 kg/acre", "Urea - 60 kg/acre (in 2 splits)", "MOP - 20 kg/acre"],
                "pesticides": ["Propiconazole (rust)", "Imidacloprid (aphids)", "2,4-D (broadleaf weeds)"],
                "tools": ["Seed drill (zero-till/conventional)", "Sprayer", "Combine harvester"],
                "other": ["FYM - 2 tons/acre", "Wheat straw mulch (for residue management)"]
            },
            "Mustard": {
                "seeds": "Pusa Bold / RH 749 seeds - 2 kg/acre (₹150-200/kg)",
                "fertilizers": ["DAP - 35 kg/acre", "Urea - 40 kg/acre", "Sulphur - 20 kg/acre"],
                "pesticides": ["Imidacloprid (aphids)", "Mancozeb (white rust)", "Malathion (painted bug)"],
                "tools": ["Seed drill", "Sprayer", "Thresher"],
                "other": ["FYM - 1 ton/acre", "Bee colonies for pollination - 2-3/acre"]
            },
            "Chickpea": {
                "seeds": "JG 11 / Kabuli type - 30 kg/acre (₹80-150/kg)",
                "fertilizers": ["DAP - 40 kg/acre", "MOP - 15 kg/acre"],
                "pesticides": ["Quinalphos (pod borer)", "NPV (Helicoverpa)", "Carbendazim (wilt)"],
                "tools": ["Seed drill", "Sprayer", "Thresher"],
                "other": ["Rhizobium culture - 200g/acre", "Trichoderma - 1 kg/acre", "Pheromone traps"]
            },
            "Potato": {
                "seeds": "Certified seed tubers - 800-1000 kg/acre (₹25-40/kg)",
                "fertilizers": ["DAP - 75 kg/acre", "Urea - 60 kg/acre", "MOP - 60 kg/acre"],
                "pesticides": ["Mancozeb (late blight)", "Imidacloprid (aphids)", "Chlorpyrifos (cutworm)"],
                "tools": ["Potato planter", "Digger/Harvester", "Grading machine", "Cold storage"],
                "other": ["FYM - 5 tons/acre", "Mulching material", "Sprinkler/Drip system"]
            },
            "Turmeric": {
                "seeds": "Mother/Finger rhizomes - 600-800 kg/acre",
                "fertilizers": ["DAP - 40 kg/acre", "Urea - 60 kg/acre (in 3 splits)", "MOP - 40 kg/acre"],
                "pesticides": ["Dimethoate (shoot borer)", "Mancozeb (leaf spot)", "Trichoderma (rhizome rot)"],
                "tools": ["Raised bed maker", "Sprayer", "Digger", "Boiling vessel", "Polisher"],
                "other": ["FYM - 4 tons/acre", "Shade net (40%)", "Mulch material - paddy straw"]
            },
            "Watermelon": {
                "seeds": "Hybrid seeds - 400-500 g/acre (₹1500-2500/100g)",
                "fertilizers": ["DAP - 50 kg/acre", "Urea - 50 kg/acre", "MOP - 40 kg/acre", "Micronutrients"],
                "pesticides": ["Imidacloprid (aphids)", "Mancozeb (downy mildew)", "Abamectin (mites)"],
                "tools": ["Plastic mulch layer", "Drip system", "Sprayer"],
                "other": ["Plastic mulch - 1 roll/acre", "Bee colonies - 2/acre", "Fruit cradles"]
            },
            "default": {
                "seeds": "Quality certified seeds as per crop requirement",
                "fertilizers": ["DAP - 50 kg/acre", "Urea - as per crop", "MOP - 20-30 kg/acre"],
                "pesticides": ["Need-based application", "IPM practices recommended"],
                "tools": ["Basic farm implements", "Sprayer", "Harvesting tools"],
                "other": ["FYM/Compost - 2 tons/acre", "Soil testing recommended"]
            }
        }
        
        # Add detailed steps, risks, and materials to each crop
        for crop in crops:
            if "steps" not in crop:
                crop["steps"] = [
                    "Land preparation: Prepare field with proper tillage and leveling",
                    "Sowing: Follow recommended seed rate and spacing",
                    "Irrigation: Water at critical growth stages",
                    "Fertilization: Apply balanced NPK as per soil test",
                    "Pest management: Regular monitoring and IPM practices",
                    "Harvesting: Harvest at proper maturity stage"
                ]
            if "risks" not in crop:
                crop["risks"] = [
                    "Weather variability - monitor forecasts regularly",
                    "Pest and disease pressure - follow IPM practices",
                    "Market price fluctuations - consider MSP or contract farming"
                ]
            
            # Add materials based on crop name
            crop_base_name = crop["name"].split(" (")[0].split("/")[0].strip()
            crop["materials"] = materials_data.get(crop_base_name, materials_data["default"])
            
            crop["confidence_score"] = crop.get("confidence_score", 0.80)
            crop["ui_hints"] = {"gradient": ["#10b981", "#059669"], "icon_color": "#10b981"}
        
        return {
            "recommendations": crops[:3],
            "market_insights": {
                "trending_crops": [c["name"].split(" (")[0] for c in crops[:3]],
                "price_trends": "MSP provides price stability. Check local mandi rates for current prices."
            }
        }


# Singleton instance
gemini_service = GeminiService()

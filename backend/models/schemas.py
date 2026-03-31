from pydantic import BaseModel, Field, validator
from typing import List, Dict, Optional
from enum import Enum


class Season(str, Enum):
    KHARIF = "Kharif"
    RABI = "Rabi"
    ZAID = "Zaid"
    SUMMER = "Summer"
    WINTER = "Winter"
    MONSOON = "Monsoon"
    ALL_YEAR = "All Year"


class SoilType(str, Enum):
    SANDY = "sandy"
    LOAMY = "loamy"
    CLAY = "clay"
    BLACK = "black"
    RED = "red"
    ALLUVIAL = "alluvial"


class IrrigationType(str, Enum):
    RAINFED = "rain-fed"
    DRIP = "drip"
    SPRINKLER = "sprinkler"
    FLOOD = "flood"
    CANAL = "canal"


class LandUnit(str, Enum):
    ACRES = "acres"
    HECTARES = "hectares"


class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Location(BaseModel):
    lat: float = Field(..., ge=-90, le=90)
    lon: float = Field(..., ge=-180, le=180)
    name: str = Field(..., min_length=1, max_length=200)


class CropRequest(BaseModel):
    location: Location
    season: Season
    budget: float = Field(..., gt=0, description="Budget in INR")
    land_size: float = Field(..., gt=0, le=1000)
    land_unit: LandUnit = LandUnit.ACRES
    harvest_timeline: str = Field(..., min_length=1, max_length=50)
    soil_type: Optional[SoilType] = SoilType.LOAMY
    irrigation: Optional[IrrigationType] = IrrigationType.RAINFED

    @validator('harvest_timeline')
    def validate_timeline(cls, v):
        # Accept formats like "3-4 months", "90 days", "2 months"
        if not any(word in v.lower() for word in ['month', 'day', 'week']):
            raise ValueError('Timeline must include time unit (months/days/weeks)')
        return v


class UIHints(BaseModel):
    gradient: List[str] = Field(..., min_items=2, max_items=2)
    icon_color: str


class CropRecommendation(BaseModel):
    name: str
    emoji: str
    reason: str
    investment: float
    profit_range: str
    roi_percentage: float
    risk_level: RiskLevel
    harvest_time: str
    water_requirement: str
    steps: List[str] = Field(..., min_items=4)
    risks: List[str] = Field(..., min_items=2)
    confidence_score: float = Field(..., ge=0, le=1)
    ui_hints: UIHints


class Weather(BaseModel):
    temp: float
    humidity: float
    rainfall: str
    forecast: str
    wind_speed: Optional[float] = None
    description: Optional[str] = None
    feels_like: Optional[float] = None
    location_name: Optional[str] = None
    is_real_data: bool = False


class MarketInsights(BaseModel):
    trending_crops: List[str]
    price_trends: str


class CropResponse(BaseModel):
    weather: Weather
    recommendations: List[CropRecommendation] = Field(..., min_items=3, max_items=3)
    market_insights: Optional[MarketInsights] = None
    timestamp: str

# PlantUML Diagrams for AI Crop Advisory System

This folder contains comprehensive PlantUML diagrams documenting the system architecture and design.

## 📁 Diagram Files

1. **01_usecase_diagram.puml** - Use Case Diagram
   - Shows all user interactions
   - Farmer use cases
   - External API integrations

2. **02_component_architecture.puml** - Component Architecture
   - Frontend components (React)
   - Backend services (Flask)
   - External APIs (Gemini, OpenWeatherMap)
   - Data flow between components

3. **03_sequence_diagram.puml** - Sequence Diagram
   - Complete recommendation request flow
   - API interactions
   - Data processing steps

4. **04_deployment_architecture.puml** - Deployment Architecture
   - Production deployment setup
   - Hosting platforms (Vercel, Railway, AWS)
   - Network topology

5. **05_class_diagram.puml** - Class Diagram
   - Data models and schemas
   - Service classes
   - Relationships

6. **06_activity_diagram.puml** - Activity Diagram
   - User journey flow
   - Decision points
   - Multi-step form process

7. **07_state_machine_diagram.puml** - State Machine
   - Application states
   - State transitions
   - User interactions

## 🚀 How to Render Diagrams

### Option 1: Online (Easiest)
1. Go to http://www.plantuml.com/plantuml/
2. Copy the content of any `.puml` file
3. Paste into the text area
4. Click "Submit" to see the diagram
5. Download as PNG/SVG

### Option 2: VS Code Extension
1. Install "PlantUML" extension in VS Code
2. Open any `.puml` file
3. Press `Alt+D` (Windows/Linux) or `Option+D` (Mac)
4. View the diagram in preview pane

### Option 3: Command Line
```bash
# Install PlantUML (requires Java)
# macOS
brew install plantuml

# Ubuntu/Debian
sudo apt-get install plantuml

# Render all diagrams
plantuml *.puml

# Render single diagram
plantuml 01_usecase_diagram.puml

# Export as SVG
plantuml -tsvg 01_usecase_diagram.puml
```

### Option 4: Docker
```bash
# Render all diagrams using Docker
docker run -v $(pwd):/data plantuml/plantuml *.puml
```

## 📊 Diagram Descriptions

### Use Case Diagram
Shows all functional requirements from the farmer's perspective and system interactions with external APIs.

### Component Architecture
Comprehensive view of system components including:
- React frontend with multi-step form
- Flask backend with REST API
- Weather and AI services
- Data validation and error handling

### Sequence Diagram
Detailed interaction flow showing:
- Form submission
- API request/response
- Weather data fetching
- AI recommendation generation
- UI updates

### Deployment Architecture
Production deployment setup showing:
- Frontend hosting (Vercel/Netlify)
- Backend hosting (Railway/Render)
- External API connections
- Environment configuration

### Class Diagram
Data structures including:
- Request/Response models
- Pydantic schemas
- Service classes
- Relationships

### Activity Diagram
Complete user journey from:
- Opening the app
- Filling multi-step form
- Viewing recommendations
- Making decisions

### State Machine
Application states:
- Form entry (4 steps)
- Loading state
- Results display
- Error handling

## 🎨 Customization

You can customize the diagrams by editing the `.puml` files:

- Change colors: `#HEXCODE`
- Modify layout: `left to right direction` or `top to bottom direction`
- Add/remove components
- Update relationships
- Change themes: `!theme plain`, `!theme sketchy-outline`, etc.

## 📖 PlantUML Resources

- Official Documentation: https://plantuml.com/
- Language Reference: https://plantuml.com/guide
- Online Editor: http://www.plantuml.com/plantuml/
- Examples Gallery: https://real-world-plantuml.com/

## 🤝 Contributing

To add new diagrams:
1. Create a new `.puml` file
2. Follow the existing naming convention
3. Add description to this README
4. Test rendering before committing

---

**Built with ❤️ for AI Crop Advisory System**

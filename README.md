# Kusto Learning Docs

A modular learning platform for Kusto Query Language (KQL) featuring interactive content, progress tracking, and responsive design.

## Overview

This platform provides structured KQL learning content with real-time search, progress tracking, and mobile-responsive navigation. The system supports modular content organization with dynamic loading and caching for optimal performance.

## Architecture

### Core Components

**Content Management System**
- JSON-based configuration (`content/sessions-config.json`)
- Dynamic content loading with caching
- Modular session and topic structure

**User Interface**
- Responsive navigation with collapsible sessions
- Real-time search with fuzzy matching
- Progress tracking with local storage
- Monaco Editor integration for syntax highlighting

**Technical Stack**
- Vanilla JavaScript with ES6+ features
- Tailwind CSS for styling
- Monaco Editor for code display
- Fuse.js for search functionality

### Project Structure

```
/
├── index.html                    # Main application
├── content/
│   ├── sessions-config.json      # Session configuration
│   └── session-01/               # Session content files
│       ├── introduction.html
│       ├── kql-basics.html
│       └── ...
├── js/
│   ├── content-manager.js        # Content loading and caching
│   └── monaco-manager.js         # Code syntax highlighting
└── icons/                       # Azure service icons
```

## Session Configuration

Sessions are defined in JSON format:

```json
{
  "sessions": [
    {
      "id": "session-01",
      "title": "KQL Basics & Fundamentals",
      "description": "Introduction to KQL and basic operators",
      "difficulty": "Beginner",
      "estimatedTime": "1hr 30min",
      "topics": [
        {
          "id": "introduction",
          "title": "Introduction",
          "type": "overview",
          "duration": "5min"
        }
      ]
    }
  ]
}
```

## Content Management

### Adding Sessions
1. Update `content/sessions-config.json` with session metadata
2. Create content files in `content/session-XX/` directory
3. Follow existing content structure and styling patterns

### Content Types
- **Overview**: Introduction and context
- **Setup**: Environment configuration
- **Tutorial**: Step-by-step learning content
- **Practice**: Exercises and challenges


## Deployment

### Development
```bash
python -m http.server 8000
# Open http://localhost:8000
```

### Production
Deploy to any static web hosting service. The application requires no server-side components.

## Browser Requirements

- Modern browsers with ES6+ support
- Local storage for progress tracking
- Fetch API for content loading

## License

Educational use for Microsoft Kusto/KQL learning.
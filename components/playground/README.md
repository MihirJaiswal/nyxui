# Component Playground

A comprehensive playground for customizing and testing React components from the Nyx UI library.

## Features

### 🎨 Live Preview
- Real-time component rendering with custom properties
- Instant visual feedback as you modify properties
- Responsive preview area with white background for better visibility

### ⚙️ Property Editor
- **String Inputs**: Text fields for strings and URLs
- **Number Inputs**: Numeric inputs with optional range sliders
- **Color Picker**: Visual color picker with hex input
- **Select Dropdowns**: Predefined options for component properties
- **Boolean Toggles**: Switch controls for boolean values
- **Object Editor**: JSON textarea for complex objects

### 📋 Component Selector
- Browse all available components from the registry
- See component names and property counts
- Easy selection with visual feedback

### 💻 Code Generator
- Generate clean, copyable React code
- Automatic import statements
- Download component code as files
- Syntax highlighting and formatting

### 🎯 Supported Components

Currently supports customization for:
- 3D Layered Card
- Animated Text
- Cyberpunk Card
- Glow Card
- Music Player
- GitHub Repo Card
- Bubble Background
- Custom Cursor
- Dynamic Ripple
- Glitch Button
- Liquid Metal Button
- Marquee
- Matrix Code Rain
- Morphing Blob
- Water Ripple Effect
- Demo Component (for testing)

## Usage

1. **Select a Component**: Choose from the sidebar
2. **Customize Properties**: Use the property editor to modify values
3. **Preview Changes**: See live updates in the preview area
4. **Generate Code**: Switch to the code tab to get the final code
5. **Copy/Download**: Use the copy or download buttons to save your code

## Property Types

### String
- Text inputs for strings, URLs, and text content
- Supports placeholder text and validation

### Number
- Numeric inputs with optional min/max constraints
- Range sliders for better UX
- Step controls for precise values

### Color
- Visual color picker
- Hex input field
- Real-time color preview

### Select
- Dropdown with predefined options
- Perfect for animation types, directions, etc.

### Boolean
- Toggle switches
- Visual on/off states

### Object
- JSON textarea for complex objects
- Syntax validation
- Pretty-printed formatting

## Technical Details

- Built with Next.js 14 and TypeScript
- Uses Framer Motion for animations
- Responsive design with Tailwind CSS
- Dynamic component loading to avoid SSR issues
- Real-time state management with React hooks

## File Structure

```
components/playground/
├── PlaygroundClient.tsx    # Main playground component
├── ComponentSelector.tsx    # Component selection sidebar
├── PropertyEditor.tsx      # Property editing interface
├── LivePreview.tsx         # Live component preview
├── CodeGenerator.tsx       # Code generation and export
├── DemoComponent.tsx       # Test component
├── types.ts               # TypeScript interfaces
└── README.md              # This documentation
```

## Future Enhancements

- [ ] Save/load component configurations
- [ ] Share component configurations via URL
- [ ] Component presets and templates
- [ ] Advanced property validation
- [ ] Component comparison mode
- [ ] Export to different frameworks
- [ ] Component performance metrics

# 🎯 Life Dashboard - To-Do List & Focus Timer

A modern, aesthetically pleasing web application that helps you stay organized and focused throughout your day.

![Dashboard Preview](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### Core Functionality
- **🕐 Real-Time Clock & Date** - Always know what time it is with automatic updates
- **👋 Personalized Greeting** - Dynamic greetings that change based on time of day (Morning/Afternoon/Evening)
- **⏱️ Pomodoro Focus Timer** - 25-minute countdown timer to boost productivity
- **✅ Smart To-Do List** - Create, edit, complete, and delete tasks with duplicate prevention
- **🔗 Quick Links Dashboard** - Save and access your favorite websites instantly
- **🌓 Light/Dark Mode** - Easy on the eyes with beautiful theme switching
- **💾 Persistent Storage** - All your data saves automatically to browser storage

### Design Highlights
- **Glassmorphism UI** - Modern frosted glass effect with backdrop blur
- **Smooth Animations** - Subtle micro-interactions for delightful user experience
- **Fully Responsive** - Works beautifully on desktop, tablet, and mobile devices
- **Accessibility Ready** - Semantic HTML and ARIA labels for screen readers

## 🚀 Quick Start

### Installation

1. **Clone or download this repository**
2. **Open `index.html` in your browser**

That's it! No build process, no dependencies, no installation required.

```bash
# If you have a simple HTTP server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Browser Compatibility
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari

## 📁 Project Structure

```
Life-Dashboard/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # Complete styling with CSS variables
├── js/
│   └── app.js          # Application logic and functionality
└── README.md           # Documentation
```

## 🎨 Design System

### Color Palette
The application uses CSS Custom Properties for easy theme customization:

**Light Mode:**
- Gradient Background: Purple to Violet (`#667eea` → `#764ba2`)
- Glass Surface: White with 15% opacity
- Text: White with varying opacity levels

**Dark Mode:**
- Gradient Background: Dark Navy (`#1a1a2e` → `#16213e`)
- Glass Surface: Dark blue-gray with 85% opacity
- Text: Light gray with varying opacity levels

### Typography
- Font Stack: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Responsive font sizes using `clamp()` for fluid typography
- Tabular numbers for timer display

## 💡 How to Use

### Setting Your Name
1. On first visit, you'll be prompted to enter your name
2. Click the ✏️ icon next to your greeting to change it anytime
3. Your name persists across sessions

### Using the Focus Timer
1. Click **Start** to begin a 25-minute Pomodoro session
2. Click **Pause** to temporarily stop the timer
3. Click **Reset** to restore to 25:00
4. You'll get an alert when the session completes

### Managing Tasks
1. Type your task in the input field
2. Click **Add Task** or press Enter
3. Click the checkbox to mark tasks as complete
4. Use the ✏️ icon to edit a task
5. Use the 🗑️ icon to delete a task
6. The app prevents duplicate tasks automatically

### Adding Quick Links
1. Enter a link name (e.g., "GitHub")
2. Enter the full URL (e.g., "https://github.com")
3. Click **Add Link**
4. Click a link badge to open it in a new tab
5. Click the × button to remove a link

### Switching Themes
Click the 🌙/☀️ button in the top-right corner to toggle between light and dark modes.

## 🛠️ Technical Implementation

### Local Storage Keys
- `userName` - User's custom name
- `theme` - Current theme preference ('light' or 'dark')
- `todos` - Array of task objects
- `links` - Array of link objects

### Data Structures

**Todo Object:**
```javascript
{
  id: 1634567890123,        // Timestamp
  text: "Complete project",  // Task description
  completed: false           // Completion status
}
```

**Link Object:**
```javascript
{
  id: 1634567890123,     // Timestamp
  name: "GitHub",         // Display name
  url: "https://github.com"  // Full URL
}
```

## 🎯 Interactive Challenges Implemented

1. ✅ **Light/Dark Mode Toggle** - Seamless theme switching with CSS variables
2. ✅ **Custom Name in Greeting** - Personalized experience with editable name
3. ✅ **Prevent Duplicate Tasks** - Input validation to avoid redundant entries

## 🌟 Advanced Features

### CSS Techniques Used
- **CSS Grid & Flexbox** - Modern, responsive layouts
- **CSS Custom Properties** - Theme system with variables
- **Backdrop Filter** - Glassmorphism effect
- **CSS Animations** - Smooth fade-in and slide-in effects
- **Media Queries** - Mobile-first responsive design

### JavaScript Patterns
- **State Management** - Centralized AppState object
- **Event Delegation** - Efficient event handling
- **LocalStorage API** - Client-side data persistence
- **Module Pattern** - Organized, maintainable code structure

## 🔒 Security Considerations

- XSS Protection through HTML escaping
- `rel="noopener noreferrer"` on external links
- URL validation before saving links
- No inline event handlers in HTML

## 🚦 Future Enhancement Ideas

- [ ] Multiple timer presets (15, 25, 45 minutes)
- [ ] Task categories and filtering
- [ ] Drag-and-drop task reordering
- [ ] Export/import data functionality
- [ ] Keyboard shortcuts
- [ ] Task statistics and streaks
- [ ] Browser notifications for timer completion

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer

Built with ❤️ as a coding exercise to demonstrate modern web development skills with vanilla JavaScript.

---

**Enjoy your productive day! 🚀**
# LYADH CODE 🚀

An AI-powered code review platform that analyzes source code and provides intelligent feedback on bugs, security vulnerabilities, performance issues, coding standards, and optimized solutions using Groq's LLM API.

---

## 🚀 What's New in v2.0

### 🎨 UI/UX Improvements
* **Redesigned Interface**: Completely refreshed the interface with a modern developer-centric theme.
* **Premium Navigation Bar**: Added a glassmorphism navbar featuring a *System Online* status badge, GitHub link, and export actions.
* **Redesigned Hero Section**: A modernized headline layout with a blinking terminal cursor effect.
* **Enhanced Spacing & Grid**: Reduced unnecessary whitespace, improved layout alignment, and expanded the layout to utilize larger screen widths.
* **Full Mobile Responsiveness**: Improved layout behavior across devices and fixed multiple mobile sizing bugs.
* **Typography Hierarchy**: Cleaner typographic rules and v2.0 badges.

### 💻 Editor Improvements
* **Monaco Editor Container**: Upgraded editor styling and container framing.
* **Controls**: Added a language selector, editor reset, and fullscreen controls.
* **Detailed Footer**: Interactive status bar showing:
  * Line count
  * Character count
  * Auto-save indicator
* **Prominence**: Increased the editor's visual weight inside the main grid.

### 🤖 Review Panel Improvements
* **Groq Branding**: Added a distinct *AI Powered by Groq* badge.
* **Ready State**: Added a "Ready for Review" status checklist prior to submission.
* **Categorized Analysis Cards**: Custom, highlighted cards for:
  * Bugs & Issues
  * Security Analysis
  * Performance
  * Best Practices
  * Refactored Code
* **Spacing**: Enhanced typography and vertical spacing for the Markdown review report.

### 🎯 Review Button
* **Ctrl + Enter Shortcut**: Added an interactive keyboard shortcut indicator.
* **Visual Styling**: Enhanced click and hover feedback with glow, shine, and fluid animations.

### 🌌 Immersive Background
* **Terminal Aesthetics**: Animated grid background with subtle scanlines.
* **Floating Particles**: Reactive neon green glowing nodes floating across the canvas.
* **Cyberpunk Framing**: Styled lines and digital circuit traces.

### 📊 Footer & Analytics
* **AI Model Info**: Displays the active LLM engine (*Llama 3.3 70B*).
* **System Stats**: Response time and uptime indicator cards.
* **Social Links**: Styled links to developer profiles.

---

## ✨ Features

* 🔍 AI-Powered Code Review
* 🐛 Bug Detection & Analysis
* 🔒 Security Vulnerability Identification
* ⚡ Performance Optimization Suggestions
* 📖 Best Practices Recommendations
* ♻️ Refactored Code Generation
* 🎨 Modern Developer-Centric UI
* 📱 Responsive Design
* 🌐 Real-Time API Integration with Groq
* 💻 Monaco Code Editor Integration

## 🛠️ Tech Stack

### Frontend
* React.js
* Vite
* Monaco Editor
* Framer Motion
* Axios
* React Icons

### Backend
* Node.js
* Express.js
* Groq SDK
* CORS
* Dotenv

### AI Model
* Groq API
* Llama 3.3 70B Versatile

## 📂 Project Structure

```bash
LYADH_CODE/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🚀 Live Demo

### Frontend
https://lyadh-code.vercel.app/

### Backend
https://lyadh-code-backend.onrender.com/review

## ⚙️ Installation

### Clone Repository
```bash
git clone https://github.com/Jarjis-Alam/LYADH_CODE.git
cd LYADH_CODE
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run Backend:
```bash
npm start
```

## 🧪 Sample Test Code

```python
def calculate_average(numbers):
    total = 0

    for i in range(len(numbers) + 1):
        total += numbers[i]

    average = total / len(numbers)

    print("Average:", average)

    return average


data = []
calculate_average(data)
```

The AI reviewer will identify:
* Index out of range bug
* Division by zero risk
* Lack of input validation
* Performance improvements
* Best practice recommendations
* Refactored implementations 

## 🔐 Environment Variables

Create a `.env` file inside the backend directory:
```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```
*Note: Never commit your API keys to GitHub.*

## 🎯 Future Enhancements
* Multi-language support
* Code quality scoring
* GitHub repository integration
* Export review reports
* Authentication system
* Team collaboration features
* CI/CD integration

## 👨‍💻 Developer

**Munshi Jarjis Alam**
* Third-Year B.Tech Student
* Computer Science & Technology at Institute of Engineering & Management (IEM), Kolkata

*Passionate about software development, artificial intelligence, UI/UX design, and building innovative technology solutions that solve real-world problems.*

---
Built with ❤️ to help developers write cleaner, safer, and more efficient code.

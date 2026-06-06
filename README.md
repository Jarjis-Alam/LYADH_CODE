# LYADH CODE 🚀

An AI-powered code review platform that analyzes source code and provides intelligent feedback on bugs, security vulnerabilities, performance issues, coding standards, and optimized solutions using Groq's LLM API.

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

Create a `.env` file:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run Backend:

```bash
node server.js
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

The AI reviewer should identify:

* Index out of range bug
* Division by zero risk
* Lack of input validation
* Performance improvements
* Best practice recommendations
* Refactored implementation

## 📸 Screenshots

Add screenshots of the application interface here.

## 🔐 Environment Variables

Create a `.env` file inside the backend directory:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Never commit your API keys to GitHub.

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

Third-Year B.Tech Student
Computer Science & Technology at
Institute of Engineering & Management (IEM), Kolkata

Passionate about software development, artificial intelligence, UI/UX design, and building innovative technology solutions that solve real-world problems.


Built with ❤️ to help developers write cleaner, safer, and more efficient code.

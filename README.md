# 🎓 Online Examination System

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, fully responsive Online Examination System built with React.js**  
*Featuring Glassmorphism UI, animated backgrounds, randomized questions, and real-time countdown timer.*

[🌐 Live Demo](#) &nbsp;·&nbsp; [📸 Screenshots](#-screenshots) &nbsp;·&nbsp; [🚀 Getting Started](#-getting-started) &nbsp;·&nbsp; [✨ Features](#-features)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Subjects & Questions](#-subjects--questions)
- [Grading System](#-grading-system)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 📖 About the Project

The **Online Examination System** is a web-based quiz application developed as an academic project. It allows students to take multiple-choice exams across **6 core Computer Science subjects**, automatically calculates grades and grade points, and maintains a session-based score history.

The project is built using **React.js** with a beautiful **Glassmorphism / Liquidmorphism** UI design, featuring animated gradient backgrounds and fully responsive layouts for both desktop and mobile devices.

> 💡 This project was also implemented as a **Java Swing desktop application** (separate repository) and later upgraded to a full web application for broader accessibility.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🎨 **Glassmorphism UI** | Modern frosted-glass design with animated gradient backgrounds |
| 📱 **Fully Responsive** | Works seamlessly on mobile, tablet, and desktop |
| 🔀 **Question Shuffle** | Questions and answer options are randomized on every attempt |
| ⏱️ **Countdown Timer** | 10-minute timer per exam with color-coded urgency indicator |
| ⬅️ **Previous / Next** | Navigate back and forth between questions during the exam |
| 📊 **Score History** | Session-based history with best score and average tracking |
| 🏆 **Grade Calculation** | Automatic grade point calculation using a standard grading scale |
| ✋ **Quit Option** | Students can exit the exam anytime with confirmation |
| 🚫 **No Login Required** | Students fill basic details and directly start the exam |
| 🌐 **Live Deployable** | Hosted on Vercel — accessible by anyone with the link |

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js 18](https://reactjs.org/) — Component-based UI library
- [Vite](https://vitejs.dev/) — Lightning-fast build tool
- Vanilla CSS with Glassmorphism styling
- HTML5 Canvas API — Animated gradient background

**No external UI libraries used** — everything is built from scratch using React and CSS.

---

## 📁 Project Structure

```
quiz-web/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── data/
│   │   └── questions.js          # 45 questions × 6 subjects = 270 total questions
│   │
│   ├── pages/
│   │   ├── WelcomePage.jsx       # Landing page with animated background
│   │   ├── StudentFormPage.jsx   # Student detail form (Name, Roll, Course, Sem)
│   │   ├── DashboardPage.jsx     # Dashboard with sidebar + subject cards
│   │   ├── QuizPage.jsx          # Exam screen with timer, navigation, options
│   │   ├── ResultPage.jsx        # Score, grade, grade point display
│   │   └── HistoryPage.jsx       # Session score history table
│   │
│   ├── App.jsx                   # Root component with page state management
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Global styles + Glassmorphism utilities
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📚 Subjects & Questions

The system covers **6 core Computer Science subjects** with **45 questions each** (270 total). Each exam randomly picks **25 questions** with shuffled answer options.

| # | Subject | Code | Questions |
|---|---------|------|-----------|
| 1 | Database Management System | `DBMS` | 45 |
| 2 | Object Oriented Programming | `OOPS` | 45 |
| 3 | Python Programming | `PYTHON` | 45 |
| 4 | C Programming | `C` | 45 |
| 5 | Computer Organization & Architecture | `COA` | 45 |
| 6 | Data Structures & Algorithms | `DSA` | 45 |

**Total:** 270 questions across all subjects

---

## 🏆 Grading System

Each exam is out of **25 marks** (1 mark per correct answer, no negative marking).

| Marks (out of 25) | Percentage | Grade | Grade Point |
|-------------------|-----------|-------|-------------|
| 23 – 25 | 92% – 100% | **O** | 10 |
| 20 – 22 | 80% – 91% | **A+** | 9 |
| 17 – 19 | 68% – 79% | **A** | 8 |
| 14 – 16 | 56% – 67% | **B+** | 7 |
| 11 – 13 | 44% – 55% | **B** | 6 |
| 8 – 10 | 32% – 43% | **C** | 5 |
| 0 – 7 | 0% – 31% | **F** | 0 (Fail) |

---

## 🖼️ Screenshots

### 🏠 Welcome Page
> Animated gradient background with subject chips and stat cards

### 📋 Student Registration
> Glassmorphism form card with animated liquid background

### 📊 Dashboard
> Sidebar navigation + colorful subject cards with hover effects

### 📝 Exam Screen
> Progress bar, countdown timer, glass option cards, Prev/Next navigation

### 🏆 Result Page
> Score bar, grade cards, grade point display

### 📈 History Page
> Session-based exam records with best score summary

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/quiz-web.git
cd quiz-web
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the development server:**
```bash
npm run dev
```

**4. Open in browser:**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready for deployment.

---

## 🌐 Deployment

This project is deployed on **Vercel** for free hosting.

### Deploy on Vercel (Recommended)

**Option 1 — Vercel Dashboard (Easy):**
```
1. Go to vercel.com and sign in with GitHub
2. Click "New Project"
3. Import your quiz-web repository
4. Framework: Vite (auto-detected)
5. Click "Deploy"
6. Get your live URL instantly ✅
```

**Option 2 — Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Other Platforms
| Platform | Steps |
|----------|-------|
| **Netlify** | Drag & drop the `dist/` folder |
| **GitHub Pages** | Use `gh-pages` package |

---

## 🔄 Application Flow

```
Welcome Page
    ↓
Student Details Form  (Name, Roll No, Course, Semester)
    ↓
Dashboard             (Sidebar + 6 Subject Cards)
    ↓
Quiz Screen           (25 Shuffled MCQs + 10 min Timer)
    ↓
Result Page           (Score + Grade + Grade Point)
    ↓
Score History         (All session records)
```

---

## 📋 Exam Rules

- ✅ Each exam contains **25 randomly selected questions**
- ✅ Answer options are **shuffled** for every attempt
- ✅ **10 minutes** time limit per exam
- ✅ Students can navigate **Previous / Next** freely
- ✅ Score is **hidden during exam** — shown only in Result
- ✅ **No negative marking**
- ✅ Exam auto-submits when time runs out
- ✅ Students can **quit** anytime with confirmation

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your-email@example.com

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- This project was assigned as part of the **Java Programming** course curriculum
- Originally built as a **Java Swing** desktop application, later upgraded to a **React.js** web application
- Inspired by modern UI trends including **Glassmorphism** and **Liquidmorphism** design

---

<div align="center">

Made with ❤️ using React.js

⭐ **Star this repository if you found it helpful!** ⭐

</div>
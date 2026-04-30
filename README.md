 # 🎓 QuizPortal

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-SaaS_Aesthetic-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, fully responsive Online Examination System built with React.js**  
*Featuring Glassmorphism UI, animated backgrounds, randomized questions, and real-time countdown timer.*

</div>

---

## 📖 Project Overview

**QuizPortal** is a premium, production-ready web-based assessment application. It allows students to take multiple-choice exams across **6 core Computer Science subjects**, automatically calculates grades, provides an advanced review system, and issues dynamic certificates upon completion.

The project is built using **React.js**, featuring a highly polished **SaaS-inspired UI/UX** with beautiful gradient token design, smooth `framer-motion` animations, and a fully responsive layout with a mobile-optimized collapsible sidebar dashboard.

> 💡 This project was originally an **Online Examination System** desktop application, later significantly overhauled into a premium web portal for broader accessibility and feature-rich UX.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🎨 **Premium SaaS UI/UX** | Modern component-based architecture with smooth `framer-motion` micro-interactions |
| 📱 **Responsive Dashboard** | Collapsible sidebar with quick-access hamburger menu for mobile/tablet optimization |
| 🔀 **Question Shuffle & Pool** | Questions and answer options are intelligently randomized |
| ⏱️ **Sticky Countdown Timer** | 10-minute sticky timer per exam with color-coded urgency |
| 🧭 **Advanced Navigator** | Navigate back and forth using a real-time question map grid |
| 🔎 **Advanced Review System**| Post-exam correct/incorrect highlights with detailed visual filtering |
| 📜 **Smart Certificates** | Dynamic, verifiable certificate generation with deterministic IDs |
| 📊 **Score History** | Session-based history with responsive score card grid layout |
| 🏆 **Grade Calculation** | Automatic grade point logic powered by dynamic thresholds |
| 🌐 **Live Deployable** | Production-ready architecture easily hosted on Vercel |

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js 18](https://reactjs.org/) — Component-based UI library
- [Vite](https://vitejs.dev/) — Lightning-fast build tool
- [Framer Motion](https://www.framer.com/motion/) — Fluid animations & gestures
- [Lucide React](https://lucide.dev/) — Clean, consistent iconography
- Vanilla CSS — Custom robust design system with gradient tokens

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

Each exam comprises **25 marks** (1 mark per correct answer, no negative impact). Passing threshold is dynamically determined.

| Marks (out of 25) | Percentage | Grade | Grade Point | Status |
|-------------------|-----------|-------|-------------|--------|
| 23 – 25 | 92% – 100% | **O** | 10 | PASS |
| 20 – 22 | 80% – 91% | **A+** | 9 | PASS |
| 17 – 19 | 68% – 79% | **A** | 8 | PASS |
| 14 – 16 | 56% – 67% | **B+** | 7 | PASS |
| 11 – 13 | 44% – 55% | **B** | 6 | PASS |
| 8 – 10 | 32% – 43% | **C** | 5 | PASS |
| 0 – 7 | 0% – 31% | **F** | 0 | FAIL |

---

## 🖼️ Screenshots

### 🏠 Landing & Dashboard
<img width="1890" height="811" alt="image" src="https://github.com/user-attachments/assets/3af9de89-7a9e-42f0-8db2-3112e28ace7c" />
<img width="1876" height="813" alt="image" src="https://github.com/user-attachments/assets/ff931666-de49-4370-a676-6566734e4f14" />
<img width="1889" height="802" alt="image" src="https://github.com/user-attachments/assets/d252647a-6bec-45db-8c75-ab2145831632" />

### 📝 Exam Screen
> Progress bar, countdown timer, glass option cards, Prev/Next navigation

### 🔎 Advanced Review System
*(Placeholder for question filtering UI and correct/incorrect highlight states)*

### 📈 History Page
> Session-based exam records with best score summary

---

## 🚀 Setup Instructions

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Local Environment Initialization

**1. Clone the repository:**
```bash
git clone https://github.com/arupdas0825/quiz-web.git
cd quiz-web
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the dev environment:**
```bash
npm run dev
```

**4. Browser Sandbox:** Navigate to `http://localhost:5173` to test the environment.

### Production Environment Build

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
Dashboard             (Responsive Sidebar + 6 Subject Cards)
    ↓
Quiz Screen           (25 Shuffled MCQs + Sticky Timer + Advanced Navigator)
    ↓
Result & Review       (Score + Grade Point + Advanced Filter Review)
    ↓
Certificate Gen       (Deterministic Smart ID Issuance)
    ↓
Score History         (All session records mapped into cards)
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

## 👥 Contributors

- **Arup Das** (Author)
- **Aditya Bar**
- **Rajarshi Lakshman**

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
<br />
⭐ <b>Star this repository if you found it helpful!</b> ⭐
</div>

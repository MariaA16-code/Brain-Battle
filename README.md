# 🎮 BrainBattle — Quiz & Trivia Platform

> *Where intelligence becomes a weapon.*

A full-stack quiz and trivia web application where users can register, browse quiz categories, take timed quizzes, view their scores, and compete on a global leaderboard.

🔗 **Live Demo:** [brain-battle-swart.vercel.app](https://brain-battle-swart.vercel.app)

---

## ✨ Features

### 👤 User
- Register and login with JWT-secured authentication
- Browse quizzes by category (Science, History, Technology, Sports)
- Take timed quizzes with multiple choice questions
- View score and result breakdown after each quiz
- Compete on the global leaderboard

### 🛠️ Admin
- Add and manage quiz categories
- Create quizzes with custom timers
- Add multiple choice questions with correct answer marking
- View all user results

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python Django + Django REST Framework |
| Authentication | JWT (djangorestframework-simplejwt) |
| Database | MySQL (Railway) |
| Frontend | React JS (Vite) |
| Styling | Tailwind CSS v4 |
| Backend Hosting | Render.com |
| Frontend Hosting | Vercel |

---

## 📁 Project Structure

```
Brain-Battle/
├── backend/
│   ├── core/           # Django project settings & URLs
│   ├── users/          # User model, auth endpoints
│   ├── quiz/           # Quiz, Question, Option, Result models & APIs
│   ├── leaderboard/    # Leaderboard API
│   ├── requirements.txt
│   └── manage.py
├── frontend/
│   ├── src/
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Home.jsx
│   │       ├── Quiz.jsx
│   │       ├── Result.jsx
│   │       └── Leaderboard.jsx
│   └── package.json
└── README.md
```

---

## 🗄️ Database Schema

| Table | Description |
|---|---|
| `users_user` | User accounts with role-based access |
| `quiz_category` | Quiz categories (Science, History, etc.) |
| `quiz_quiz` | Quiz details with timer settings |
| `quiz_question` | Questions linked to quizzes |
| `quiz_option` | Answer choices with correct answer flag |
| `quiz_result` | User quiz attempts and scores |

---

## 🚀 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register/` | Register a new user |
| POST | `/api/users/login/` | Login and get JWT token |
| GET | `/api/quiz/` | Get all quizzes |
| GET | `/api/quiz/:id/` | Get quiz with questions |
| POST | `/api/quiz/submit/` | Submit quiz result |
| GET | `/api/leaderboard/` | Get top 10 players |

---

## ⚙️ Run Locally

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [brain-battle-swart.vercel.app](https://brain-battle-swart.vercel.app) |
| Backend | Render | [brainbattle-backend-ztcs.onrender.com](https://brainbattle-backend-ztcs.onrender.com) |
| Database | Railway MySQL | Cloud hosted |

---

## 👩‍💻 Developer

**Maria** — Information Engineering Technology Student  
Backend Development · Database Design · Full-Stack Deployment

---

> Built as a semester backend project demonstrating REST API design, JWT authentication, database management, and cloud deployment.
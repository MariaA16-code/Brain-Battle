🎮 BrainBattle — Quiz & Trivia Platform

«A full-stack quiz application where users can register, take quizzes, view scores, and compete on a leaderboard.»

🚀 Live Demo

🔗 https://brain-battle-swart.vercel.app

✨ Features

👤 User

- User registration and login
- JWT authentication
- Browse quizzes by category
- Timed quizzes with multiple-choice questions
- View quiz results and scores
- Global leaderboard

🛠️ Admin

- Manage categories and quizzes
- Add questions and answers
- View user results

🛠️ Technologies Used

- Python
- Django
- Django REST Framework
- MySQL
- React (Vite)
- Tailwind CSS
- JWT Authentication

📁 Project Structure

Brain-Battle/
├── backend/

│   ├── users/

│   ├── quiz/

│   ├── leaderboard/

│   └── manage.py

├── frontend/
│   ├── src/

│   └── package.json

└── README.md

🔗 API Endpoints

POST  /api/users/register/

POST  /api/users/login/

GET   /api/quiz/

GET   /api/quiz/:id/

POST  /api/quiz/submit/

GET   /api/leaderboard/

⚙️ Run Locally

Backend

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend

cd frontend
npm install
npm run dev

🌐 Deployment

- Frontend: Vercel
- Backend: Render
- Database: Railway MySQL

👩‍💻 Developer

Maria Amir
Information Engineering Technology Student

---

Built as a semester project demonstrating REST APIs, JWT authentication, database management, and cloud deployment.
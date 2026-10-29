import random

from django.core.management.base import BaseCommand

from quiz.models import Category, Option, Question, Quiz

# Each question: (text, correct answer, [3 wrong answers])
DATA = {
    "Science": {
        "title": "Science Basics",
        "questions": [
            ("What planet is known as the Red Planet?", "Mars", ["Venus", "Jupiter", "Mercury"]),
            ("Which gas do plants absorb from the air?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Hydrogen"]),
            ("What is H2O commonly known as?", "Water", ["Salt", "Hydrogen peroxide", "Ammonia"]),
            ("How many bones are in the adult human body?", "206", ["186", "216", "256"]),
            ("What is the center of an atom called?", "Nucleus", ["Shell", "Ion", "Molecule"]),
            ("Which force pulls objects toward Earth?", "Gravity", ["Magnetism", "Friction", "Inertia"]),
            ("What is the hardest natural substance?", "Diamond", ["Gold", "Iron", "Quartz"]),
            ("Which organ pumps blood around the body?", "Heart", ["Liver", "Lungs", "Kidney"]),
        ],
    },
    "History": {
        "title": "History Challenge",
        "questions": [
            ("Who was the first President of the United States?", "George Washington", ["Abraham Lincoln", "Thomas Jefferson", "John Adams"]),
            ("In which year did World War II end?", "1945", ["1939", "1918", "1950"]),
            ("Who is the founder of Pakistan?", "Muhammad Ali Jinnah", ["Allama Iqbal", "Liaquat Ali Khan", "Sir Syed Ahmad Khan"]),
            ("In which year was Pakistan created?", "1947", ["1945", "1950", "1956"]),
            ("Which civilization built the pyramids of Giza?", "Ancient Egyptians", ["Romans", "Greeks", "Mayans"]),
            ("Who was the first man to walk on the Moon?", "Neil Armstrong", ["Buzz Aldrin", "Yuri Gagarin", "Michael Collins"]),
            ("The Great Wall is located in which country?", "China", ["India", "Japan", "Mongolia"]),
            ("Which empire built the Taj Mahal?", "Mughal Empire", ["Ottoman Empire", "Maurya Empire", "Persian Empire"]),
        ],
    },
    "General Knowledge": {
        "title": "General Knowledge Mix",
        "questions": [
            ("What is the capital of Pakistan?", "Islamabad", ["Lahore", "Karachi", "Peshawar"]),
            ("How many continents are there?", "7", ["5", "6", "8"]),
            ("Which is the largest ocean?", "Pacific Ocean", ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]),
            ("How many days are in a leap year?", "366", ["365", "364", "367"]),
            ("Which is the longest river in Pakistan?", "Indus", ["Jhelum", "Ravi", "Chenab"]),
            ("What is the national animal of Pakistan?", "Markhor", ["Snow leopard", "Lion", "Tiger"]),
            ("Mixing blue and yellow gives which color?", "Green", ["Purple", "Orange", "Brown"]),
            ("Which is the largest country by area?", "Russia", ["Canada", "China", "United States"]),
        ],
    },
    "Technology": {
        "title": "Tech Trivia",
        "questions": [
            ("What does CPU stand for?", "Central Processing Unit", ["Computer Personal Unit", "Central Program Utility", "Core Processing Unit"]),
            ("What does HTML stand for?", "HyperText Markup Language", ["High Text Machine Language", "HyperTool Multi Language", "Home Text Markup Language"]),
            ("Which language is Django written in?", "Python", ["Java", "Ruby", "PHP"]),
            ("Who created Git?", "Linus Torvalds", ["Bill Gates", "Guido van Rossum", "Tim Berners-Lee"]),
            ("Which of these is a database?", "PostgreSQL", ["React", "Flask", "Bootstrap"]),
            ("What is CSS used for?", "Styling web pages", ["Storing data", "Running servers", "Compiling Python"]),
            ("Which shortcut copies on Windows?", "Ctrl + C", ["Ctrl + V", "Ctrl + X", "Ctrl + Z"]),
            ("What does API stand for?", "Application Programming Interface", ["Applied Program Integration", "Automated Page Index", "Advanced Python Input"]),
        ],
    },
    "Sports": {
        "title": "Sports Showdown",
        "questions": [
            ("How many players per team are on the field in football (soccer)?", "11", ["9", "10", "12"]),
            ("Which country won the 1992 Cricket World Cup?", "Pakistan", ["India", "Australia", "England"]),
            ("How many runs is a six in cricket worth?", "6", ["4", "5", "8"]),
            ("Which sport is played at Wimbledon?", "Tennis", ["Golf", "Cricket", "Rugby"]),
            ("How often are the Summer Olympic Games held?", "Every 4 years", ["Every 2 years", "Every 3 years", "Every 5 years"]),
            ("Which sport uses a shuttlecock?", "Badminton", ["Tennis", "Squash", "Table tennis"]),
            ("How many rings are on the Olympic flag?", "5", ["4", "6", "7"]),
            ("Which country hosted the 2022 FIFA World Cup?", "Qatar", ["Russia", "Brazil", "Germany"]),
        ],
    },
}


class Command(BaseCommand):
    help = "Seed demo categories, quizzes, questions and options (safe to re-run)."

    def handle(self, *args, **options):
        new_questions = 0

        for cat_name, info in DATA.items():
            category, _ = Category.objects.get_or_create(name=cat_name)
            quiz, _ = Quiz.objects.get_or_create(
                title=info["title"],
                category=category,
                defaults={"timer_seconds": 30},
            )

            for text, correct, wrongs in info["questions"]:
                question, created = Question.objects.get_or_create(
                    quiz=quiz, question_text=text
                )
                if not created:
                    continue

                answers = [(correct, True)] + [(w, False) for w in wrongs]
                random.shuffle(answers)
                for option_text, is_correct in answers:
                    Option.objects.create(
                        question=question,
                        option_text=option_text,
                        is_correct=is_correct,
                    )
                new_questions += 1

        self.stdout.write(self.style.SUCCESS(f"Done. Added {new_questions} new questions."))
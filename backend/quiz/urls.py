from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.get_categories),
    path('', views.get_quizzes),
    path('<int:quiz_id>/', views.get_quiz),
    path('submit/', views.submit_result),
]
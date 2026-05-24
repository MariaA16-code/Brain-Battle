from rest_framework.decorators import api_view
from rest_framework.response import Response
from quiz.models import Result
from users.models import User

@api_view(['GET'])
def get_leaderboard(request):
    users = User.objects.all()
    leaderboard = []

    for user in users:
        results = Result.objects.filter(user=user)
        if results.exists():
            total_score = sum(r.score for r in results)
            leaderboard.append({
                'username': user.username,
                'total_score': total_score,
                'quizzes_taken': results.count()
            })

    leaderboard = sorted(leaderboard, key=lambda x: x['total_score'], reverse=True)[:10]
    return Response(leaderboard)

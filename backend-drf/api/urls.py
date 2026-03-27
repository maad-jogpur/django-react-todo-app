from django.urls import path
from todo import views as todoViews
from accounts import views as userViews
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [

    # Register
    path('register/',userViews.Register.as_view()),


    # Todo Configurations
    path('tasks/',todoViews.list_tasks),
    path('tasks_user/<int:pk>',todoViews.get_tasks),
    path('tasks/post/',todoViews.post_tasks),
    path('tasks/<int:pk>/update',todoViews.update_tasks),
    path('tasks/<int:pk>/delete',todoViews.delete_tasks),

    # Login
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('current_user/', userViews.current_user),
]

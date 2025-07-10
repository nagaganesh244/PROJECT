from django.urls import path 
from . import views

urlpatterns = [
    path("register_user/", views.register_user, name="register_user"),
    path("create_video/", views.create_video, name="create_video"),
    path("video_list/", views.video_list, name="video_list"),
    path("get_username/", views.get_username, name="get_username"),
    path("update_video/<int:pk>/", views.update_video, name="update_video"),
    path("delete_video/<int:pk>/", views.delete_video, name="delete_video"),
    path("video/<slug:slug>/", views.get_video, name="video"),
    path('video/<slug:slug>/like/', views.toggle_like, name='toggle-like'),
    path('liked/', views.liked_videos, name='liked_videos'),
    path('videos/<int:video_pk>/comments/', views.video_comments, name='video_comments'),
    path('videos/<int:video_pk>/comments/post/', views.post_comment, name='post_comment'),


    
    
]

from argparse import Action
import traceback
from urllib import response
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Video, Comment
from rest_framework.permissions import AllowAny
from api.serializers import  CommentSerializer, UserRegistrationSerializer, VideoSerializer
from . import serializers
from .models import CustomUser, Like



# Create your views here.
@api_view(['POST'])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_video(request):
    user = request.user
    serializer = VideoSerializer(data= request.data)
    if serializer.is_valid():
        serializer.save(about= user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def video_list(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True, context={'request': request})  
    return Response(serializer.data)

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_video(request , pk):
    user = request.user
    video = Video.objects.get(id=pk)   
    if video.about!= user:
         return Response({"error": "You are not the author of this video"} ,  status=status.HTTP_403_FORBIDDEN)
    serializer = VideoSerializer(video , data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_video(request , pk):
    user = request.user
    try:
        video = Video.objects.get(id=pk)
    except Video.DoesNotExist:
        return Response({"error": "Video not found"}, status=status.HTTP_404_NOT_FOUND)

    if video.about != user:
        return Response({"error": "You are not the author of this video"}, status=status.HTTP_403_FORBIDDEN)

    video.delete()
    return Response({"message": "Video deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
  
@api_view(['GET'])
def get_video(request, slug):
    video = get_object_or_404(Video, slug=slug)
    serializer = VideoSerializer(video, context={'request': request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    if not request.user.is_authenticated:
        return Response({"error": "Not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({"username": request.user.username})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request, slug):
    try:
        video = Video.objects.get(slug=slug)
    except Video.DoesNotExist:
        return Response({"error": "Video not found"}, status=status.HTTP_404_NOT_FOUND)

    user = request.user

    if video.likes.filter(id=user.id).exists():
        video.likes.remove(user)
        
        Like.objects.filter(user=user, video=video).delete()
        liked = False
    else:
        video.likes.add(user)
        
        Like.objects.create(user=user, video=video)
        liked = True

    return Response({
        "liked": liked,
        "likes_count": video.likes.count()
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def liked_videos(request):
    user = request.user
    liked = user.liked_videos.all()  
    serializer = VideoSerializer(liked, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def video_comments(request, video_pk): 
    video = get_object_or_404(Video, pk=video_pk)
    comments = video.comment_set.all()
    serializer = CommentSerializer(comments, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request, video_pk):
    video = get_object_or_404(Video, pk=video_pk)
    # The request.data will contain the 'content' of the comment
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        # Associate the comment with the video and the authenticated user
        serializer.save(video=video, author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
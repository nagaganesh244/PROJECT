from dataclasses import field, fields
import email
from pyexpat import model
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import  Comment, Video


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id','email','username','first_name', 'last_name','channel_name','profile_picture','password']
        extra_kwargs = {
            'password' : {'write_only' : True}
        }

    def create(self, validated_data):
        email = validated_data['email']
        username = validated_data['username']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        password = validated_data['password']
        profile_picture = validated_data.get('profile_picture')
        channel_name = validated_data.get('channel_name')
        
        user = get_user_model()
        new_user = user.objects.create(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            profile_picture=profile_picture,
            channel_name=channel_name
        )
        new_user.set_password(password)
        new_user.save()
        return new_user

class SimpleAboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name","profile_picture","channel_name"]

class VideoSerializer(serializers.ModelSerializer):
    about = SimpleAboutSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = [
            'id', 'title', 'slug', 'about', 'categeory', 'description',
            'thumbnail', 'published_date', 'created_at', 'updated_at',
            'is_draft', 'upload_video', 'likes_count', 'is_liked',
            'views',  

        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        user = getattr(request, 'user', None)
        if user and user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False
    
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # returns the username

    class Meta:
        model = Comment
        fields = ['id', 'user', 'video', 'text', 'created_at']
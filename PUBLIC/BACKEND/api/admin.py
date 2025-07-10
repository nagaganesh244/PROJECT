from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Video
# Register your models here.

class CustomUserAdmin(UserAdmin):
    list_display = ("username","email", "first_name","last_name" , "profile_picture", "channel_name")

admin.site.register(CustomUser,CustomUserAdmin)

class VideoAdmin(admin.ModelAdmin):
    list_display= ("title","is_draft","created_at","categeory","thumbnail","upload_video")

admin.site.register(Video, VideoAdmin)
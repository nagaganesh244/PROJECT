


from django.utils import timezone
from django.contrib.auth import get_user_model

from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify


# Create your models here.

CATEGEORY = (
    ('education', 'Education'),
    ('entertainment', 'Entertainment'),
    ('sports', 'Sports'),
    ('news', 'News'),
    ('other', 'Other'),
)

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    channel_name = models.TextField(blank=True, null=True)
    profile_picture= models.ImageField(upload_to='profile_img', blank= True)

    def __str__(self):
        return self.username
    
User = get_user_model()
class Video(models.Model):
    title=models.CharField(max_length=255)
    slug= models.SlugField(max_length=255,unique=True,blank=True)
    description= models.TextField()
    about= models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.SET_NULL , related_name="video", null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_date = models.DateTimeField(blank=True, null=True)
    is_draft = models.BooleanField(default=True)
    categeory = models.CharField(max_length=255, choices= CATEGEORY, blank=True, null=True  )
    thumbnail= models.ImageField( upload_to='thumbnail_img', blank= True , null = True)
    upload_video= models.FileField( upload_to='uploaded_video', blank= True , null = True)
    likes = models.ManyToManyField(User, related_name='liked_videos', blank=True, default=0)
    views = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ["-published_date"]

    def likes_count(self):
        return self.likes.count()

    def is_liked_by(self, user):
        return self.likes.filter(id=user.id).exists()

    def __str__(self) :
        return self.title
    
    def save(self , *args, **kwargs):
        base_slug = slugify(self.title)
        slug = base_slug
        num = 1 
        while Video.objects.filter(slug=slug).exists():
            slug = f'{base_slug}-{num}'
            num += 1
        self.slug = slug

        if not self.is_draft and self.published_date is None:
            self.published_date = timezone.now()

        super().save(*args, **kwargs)


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)

User = get_user_model()

class Comment(models.Model):
    
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='comment_set')
   
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at'] 

    def __str__(self):
        return f"Comment by {self.author.username} on {self.video.title}"
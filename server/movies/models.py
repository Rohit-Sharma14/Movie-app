from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200,blank=False, default='')
    year = models.CharField(max_length=4)
    like = models.IntegerField(default=0)
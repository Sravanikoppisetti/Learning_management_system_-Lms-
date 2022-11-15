from django.db import models
from datetime import datetime, date

# Create your models here.

class Signup(models.Model):
    first_namr = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date = models.DateField(auto_now=False)
    email = models.CharField(max_length=30, blank=True)
    password = models.CharField(max_length=30, blank=True)
    confirm_password = models.CharField(max_length=30, blank=True)
    user_name = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.user_name
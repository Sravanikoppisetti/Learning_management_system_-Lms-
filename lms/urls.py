from django.urls import path

from . import views
 
urlpatterns = [
   path('',views.signin, name="login"),
   path('signup/',views.signup, name="signup"),
   path('logged/',views.logged, name="logged"),
   path('register/',views.register, name="register")
]
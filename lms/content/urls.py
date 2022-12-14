from django.urls import path

from . import views
 
urlpatterns = [
   path('',views.signin, name="login"),
   path('signup/',views.signup, name="signup"),
   path('logged/',views.logged, name="logged"),
   path('register/',views.register, name="register"),
   path('course/', views.courses, name="course"),
   path("coursesearch", views.search),
   path("<int:course_id>", views.coursecontent, name="coursecontent"),
   path("<int:courseid>/<int:chapid>/<str:content>/", views.contentdisplay, name="contentdispaly"),
   path('help', views.help, name="help")
]
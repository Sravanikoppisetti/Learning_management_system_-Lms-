
from django.http import HttpResponse,HttpResponseRedirect
from ssl import AlertDescription
from django.shortcuts import redirect, render
from . models import Signup
from django.contrib import auth
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.
def signin(request):
    if request.method == 'POST':
        try:
            Username = request.POST.get('user_name')
            password = request.POST.get('password')
            print("hii")
            uid = Signup.objects.get(user_name=Username)
            pid= Signup.objects.get(password=password)

            if Signup.objects.filter(user_name=Username).exists():
                print("hello")
                if Signup.objects.filter(password=password).exists():
                    print("ok")
                    if uid==pid:
                        context={
                            "user_name":Username
                        }
                        return render(request, 'lms/logged.html',context)
                    else:
                        return HttpResponse("The password you entered does not match to this username")
                else:
                    return HttpResponse("Wrong password")
            else:
                return HttpResponse("Invalid username")
        except:
            return HttpResponse("something is wrong")
    else:
        return render(request, 'lms/login.html')
        
def signup(request):
    if request.method=='POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        birthday_date = request.POST['date']
        user_name = request.POST['user_name']
        if password == confirm_password:
            if Signup.objects.filter(email=email).exists():
                return HttpResponse("Email is already in use")
            if Signup.objects.filter(user_name=user_name).exists():
                return HttpResponse("User Name is already in use enter a New One")
            else:
                register = Signup(first_namr= first_name, last_name=last_name,email=email, password=password, confirm_password=confirm_password,date=birthday_date, user_name=user_name)
                register.save()
                context={
                    "first_name":first_name,
                    "last_name":last_name
                }
                return render(request, 'lms/register.html', context)
        else:
            return HttpResponse("password do not match")
    else:
        return render(request, 'lms/signup.html')

def logged(request):
    return render(request, 'lms/logged.html')

def register(request):
    return render(request, 'lms/register.html')

    



from django.http import HttpResponse,HttpResponseRedirect
from ssl import AlertDescription
from django.shortcuts import redirect, render
from django.contrib import auth
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from .models import Signup, Courses, Chapters,Lesson,Assignmenttopic,MCQtopic,lessncontent



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



def courses(request):
    return render(request, "lms/courses.html",{
        "courses": Courses.objects.all()
    })


def search(request):
    searchedcourse=request.GET['searchcourse']
    coursecard=Courses.objects.filter(coursename__icontains=searchedcourse)

    return render(request, "lms/coursessearch.html",{
        "searchedcourse": coursecard
    })


def cont(course_id):
    X=Chapters.objects.filter(course__courseid=course_id)
    # print("CC",course_id)
    dicc={}
    dic={}
    for chapters in X:
        y=chapters.chaptername
        idd=chapters.chapterid
        cx= Lesson.objects.filter(chapter__chaptername=y)
        ass= Assignmenttopic.objects.filter(chapter__chaptername=y)
        mcqqq= MCQtopic.objects.filter(chapter__chaptername=y)
        l=[]
        for lessn in cx:
            V=lessn.lessonname
            l.append(V)
        for assignment in ass:
            a=assignment.Assignmnetname
            l.append(a)
        for m in mcqqq:
            a=m.MCQtopicname
            l.append(a)
        dicc[y]=l
        dic[idd]=dicc
        dicc={}
    return dic


def coursecontent(request, course_id):
    data=cont(course_id)
    return render(request, "lms/coursedefaultpage.html",{
        "courseid": course_id,
        "lessondic":data
    })


def contentdisplay(request,courseid,chapid, content):
    # print("courseid",courseid,chapid, content)
    data=cont(courseid)
    if (lessncontent.objects.filter(lesson__chapter__course__courseid=courseid,lesson__chapter__chapterid=chapid,lesson__lessonname=content).exists()):
        content=lessncontent.objects.filter(lesson__chapter__course__courseid=courseid,lesson__chapter__chapterid=chapid,lesson__lessonname=content)
        return render(request,"lms/lesson.html",{
            "courseid": courseid,
            "lessondic":data,
            "content":content
        })
   
    elif (mcqansw.objects.filter(mcqs__chapter__course__courseid=courseid,mcqs__chapter__chapterid=chapid,mcqs__MCQtopicname=content).exists()):
        content=mcqansw.objects.filter(mcqs__chapter__course__courseid=courseid,mcqs__chapter__chapterid=chapid,mcqs__MCQtopicname=content)  
        return render(request,"lms/mcq.html",{
            "courseid": courseid,
            "lessondic":data,
            "content":content
        })

    elif (assignmenttask.objects.filter(assignment__chapter__course__courseid=courseid,assignment__chapter__chapterid=chapid,assignment__Assignmnetname=content).exists()):
            task=assignmenttask.objects.filter(assignment__chapter__course__courseid=courseid,assignment__chapter__chapterid=chapid,assignment__Assignmnetname=content) 
            return render(request,"lms/assignment.html",{
                "courseid": courseid,
                "lessondic":data,
                "task":task
            })

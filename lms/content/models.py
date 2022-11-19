from django.db import models
from datetime import datetime, date
from ckeditor.fields import RichTextField

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


class Courses(models.Model):
    courseid=models.IntegerField(primary_key=True)
    coursename=models.CharField(max_length=100,blank=True, default="draftname")
    coursecredits=models.IntegerField(blank=True, default=0)
    courseimg=models.CharField(max_length=100)

    def __str__(self):
        return  self.coursename
    
   

class Chapters(models.Model):
    chapterid=models.IntegerField(primary_key=True)
    chaptername=models.CharField(max_length=100,blank=True, default="draftchaptername")
    course=models.ForeignKey(Courses,on_delete=models.CASCADE )

    

    def __str__(self):
        return self.chaptername

   

class Lesson(models.Model):
    lessonid=models.IntegerField(primary_key=True)
    lessonname=models.CharField(max_length=100,blank=True, default="Lessonname")
    chapter=models.ForeignKey(Chapters, on_delete=models.CASCADE)


    def __str__(self):
        return self.lessonname


class Assignmenttopic(models.Model):
    Assignmenttopicid=models.IntegerField(primary_key=True)
    Assignmnetname=models.CharField(max_length=100,blank=True, default="Lessonname")
    chapter=models.ForeignKey(Chapters, on_delete=models.CASCADE)


    def __str__(self):
        return self.Assignmnetname

class MCQtopic(models.Model):
    MCQtopicid=models.IntegerField(primary_key=True)
    MCQtopicname=models.CharField(max_length=100,blank=True, default="Lessonname")
    chapter=models.ForeignKey(Chapters, on_delete=models.CASCADE)


    def __str__(self):
        return self.MCQtopicname






class lessncontent(models.Model):
    contentid=models.IntegerField(primary_key=True)
    video=models.CharField(max_length=100,blank=True, default="")
    text= RichTextField(blank=True,null=True)
    lesson=models.ForeignKey(Lesson, on_delete=models.CASCADE)

    def __str__(self):
        return  self.video
    
class mcqansw(models.Model):
    mcqid=models.IntegerField(primary_key=True)
    question= RichTextField(blank=True,null=True)
    option1=RichTextField(blank=True,null=True)
    opt1answ=models.BooleanField(default=False)
    option2=RichTextField(blank=True,null=True)
    opt2answ=models.BooleanField(default=False)
    option3=RichTextField(blank=True,null=True)
    opt3answ=models.BooleanField(default=False)
    option4=RichTextField(blank=True,null=True)
    opt4answ=models.BooleanField(default=False)
    mcqs=models.ForeignKey(MCQtopic, on_delete=models.CASCADE)

    def __str__(self):
        return  self.question

class assignmenttask(models.Model):
    taskid=models.IntegerField(primary_key=True)
    task= RichTextField(blank=True,null=True)
    assignment=models.ForeignKey(Assignmenttopic, on_delete=models.CASCADE)
    score=models.IntegerField(default=0)
    Feedback=models.TextField(default="Enter here")

    def __str__(self):
        return  self.task
    
from django.contrib import admin

# Register your models here....
from . models import Signup,Courses,Chapters,Lesson,Assignmenttopic,MCQtopic,lessncontent,mcqansw,assignmenttask
admin.site.register(Signup)
admin.site.register(Courses)
admin.site.register(Chapters)
admin.site.register(Lesson)
admin.site.register(Assignmenttopic)
admin.site.register(MCQtopic)
admin.site.register(lessncontent)
admin.site.register(mcqansw)
admin.site.register(assignmenttask)
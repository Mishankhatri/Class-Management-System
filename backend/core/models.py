from distutils.command.upload import upload
from tkinter.tix import Tree
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
CMS_Users = settings.AUTH_USER_MODEL

def upload_to(instance,filename):
    return f'admin_annoucements/{filename}'

announcement_choices= (
    ('all', 'all'),
    ('teachers','teachers'),
)

# gender_choices=(
#     ('Male', 'Male'),
#     ('Female', 'Female'),
#     ('Other','Other'),
# )

# class Grade(models.Model):
#     class_name = models.PositiveIntegerField()
#     section = models.CharField(max_length=50)

#     class Meta:
#         verbose_name_plural = 'grades'

#     def __str__(self):
#         return '%s: %s' % (self.class_name, self.section)
    


# class Student(models.Model):
#     SRN = models.CharField(primary_key='True', max_length=100)
#     user = models.OneToOneField(CMS_Users, on_delete=models.CASCADE, null=True)
#     first_name = models.CharField(max_length=200,null=False,blank=False)
#     middle_name = models.CharField(max_length=200,null=True,blank=True)
#     last_name = models.CharField(max_length=200,null=False,blank=False)
#     DOB = models.DateField(default='2000-01-01',null=False)
#     email= models.EmailField(_('email address'),null=False,blank=False)
#     address = models.CharField(max_length=100,null=False,blank=False)
#     # photo = models.ImageField(default='default.png',upload_to='student_profile_pics')
#     contact_no= models.IntegerField(null=False,blank=False)
#     current_grade = models.ForeignKey(Grade,related_name='students',on_delete=models.SET_DEFAULT, default='1')
#     gender = models.CharField(max_length=50, choices=gender_choices, default='Male')
#     father_name= models.CharField(max_length=200,null=False,blank=False)
#     mother_name= models.CharField(max_length=200,null=False,blank=False)
#     parent_address=models.CharField(max_length=100,null=False,blank=False)
#     parent_state=models.CharField(max_length=100,null=False,blank=False)
#     parent_contact_no=models.IntegerField(null=False,blank=False)
#     parent_additional_contact_no=models.IntegerField(null=False,blank=True)
#     parent_email=models.EmailField(_('email address'),null=False,blank=False)

#     def __str__(self):
#         return '%s %s %s' % (self.firstname, self.middlename,self.lastname) 


# class Teacher(models.Model):
#     SRN = models.CharField(primary_key='True', max_length=100)
#     user = models.OneToOneField(CMS_Users, on_delete=models.CASCADE, null=True)
#     first_name = models.CharField(max_length=200,null=False,blank=False)
#     middle_name = models.CharField(max_length=200,null=True,blank=True)
#     last_name = models.CharField(max_length=200,null=False,blank=False)
#     DOB = models.DateField(default='2000-01-01',null=False)
#     email= models.EmailField(_('email address'),null=False,blank=False)
#     address = models.CharField(max_length=100,null=False,blank=False)
#     # photo = models.ImageField(default='default.png',upload_to='teachers_profile_pics')
#     contact_no= models.IntegerField(null=False,blank=False)
#     gender = models.CharField(max_length=50, choices=gender_choices, default='Male')


#     def __str__(self):
#         return '%s %s %s' % (self.firstname, self.middlename,self.lastname)
    
class AdminAnnouncement(models.Model):
    title = models.CharField(max_length=150,null=False,blank=False)
    details = models.TextField(null=False,blank=False)
    created_by= models.ForeignKey(CMS_Users,related_name='adminannouncements',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True,editable=False)
    announcement_for = models.CharField(max_length=50,choices=announcement_choices,default='all')
    files = models.FileField(upload_to=upload_to,null=True,blank=True)

    def __str__(self):
        return self.title
    

# class TeachersAnnouncement(models.Model):
#     title = models.CharField(max_length=150)
#     details = models.TextField()
#     created_by_teachers = models.ForeignKey(CMS_Users,on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add= True,editable=False)
#     announcement_for_class = models.ForeignKey(Grade,related_name='announcements',on_delete=models.CASCADE)
    # files = models.FileField(upload_to=upload_to,null=True,blank=True)

#     def __str__(self):
#         return self.title


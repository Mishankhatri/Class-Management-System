from datetime import date as datetime_date
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.conf import settings
CMS_Users = settings.AUTH_USER_MODEL

announcement_choices= (
    ('all', 'all'),
    ('teachers','teachers'),
)

gender_choices=(
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other','Other'),
)

announcement_types=(
    ('Academic', 'Academic'),
    ('Admistration', 'Admistration'),
    ('Admission', 'Admission'),
    ('Other', 'Other'),
)
section_choices = (
    ('A','A'),
    ('B','B'),
    ('C','C'),
    ('D','D'),
    ('E','E'),
    ('F','F'),
)

attendance_choices = (
    ('ABSENT','A'),
    ('PRESENT','P'),
)
day_choices = (
    ('Sunday','Sunday'),
    ('Monday','Monday'),
    ('Tuesday','Tuesday'),
    ('Wednesday','Wednesday'),
    ('Thrusday','Thrusday'),
    ('Friday','Friday'),
    ('Saturday','Saturday'),
)
class Grade(models.Model):
    class_name = models.PositiveIntegerField()
    section = models.CharField(max_length=15,choices=section_choices,default='A')
    class Meta:
        verbose_name_plural = 'grades'
        
    def __str__(self):
        return '%s: %s' % (self.class_name, self.section)
    
class Subject(models.Model):
    subject_name = models.CharField(max_length=55)
    subject_code = models.CharField(max_length=255,unique=True)
    grade = models.ForeignKey(Grade,related_name='class_subjects',on_delete=models.CASCADE)
    description = models.TextField(null=False,blank=False)

    def __str__(self):
        return '%s: %s' % (self.subject_name, self.subject_code)

    
class Student(models.Model):
    SRN = models.CharField(unique=True, max_length=100) #studentid
    user = models.OneToOneField(CMS_Users, on_delete=models.CASCADE,related_name='student_user')
    first_name = models.CharField(max_length=200,null=False,blank=False)
    middle_name = models.CharField(max_length=200,null=True,blank=True)
    last_name = models.CharField(max_length=200,null=False,blank=False)
    DOB = models.DateField(default='2000-01-01',null=False)
    address = models.CharField(max_length=100,null=False,blank=False)
    contact_no= models.CharField(max_length=1024,null=False,blank=False)
    current_grade = models.ForeignKey(Grade,related_name='students',on_delete=models.SET_NULL, null=True)
    gender = models.CharField(max_length=50, choices=gender_choices, default='Male')

    def __str__(self):
        if self.middle_name is not None:
            return '%s %s %s' % (self.first_name, self.middle_name,self.last_name)
        return '%s %s' % (self.first_name,self.last_name)
    
class Parent(models.Model):
    student = models.OneToOneField(Student,on_delete=models.CASCADE,related_name='parent_info')   
    father_name= models.CharField(max_length=200,null=False,blank=False)
    mother_name= models.CharField(max_length=200,null=False,blank=False)
    parent_address=models.CharField(max_length=100,null=False,blank=False)
    parent_state=models.CharField(max_length=100,null=False,blank=False)
    parent_contact_no= models.CharField(max_length=1024,null=False,blank=False)
    parent_additional_contact_no= models.CharField(max_length=1024,null=False,blank=False)
    parent_email=models.EmailField(_('email address'),null=False,blank=False)
    
    def __str__(self):
        return '%s %s %s' % (self.student,self.father_name,self.mother_name)

class Teacher(models.Model):
    TRN = models.CharField(max_length=100) #teacherid
    user = models.OneToOneField(CMS_Users, on_delete=models.CASCADE,related_name='teacher_user')
    first_name = models.CharField(max_length=200,null=False,blank=False)
    middle_name = models.CharField(max_length=200,null=True,blank=True)
    last_name = models.CharField(max_length=200,null=False,blank=False)
    DOB = models.DateField(default='1998-01-01',null=False)
    address = models.CharField(max_length=100,null=False,blank=False)
    contact_no=models.CharField(max_length=1024,null=False,blank=False)
    gender = models.CharField(max_length=50, choices=gender_choices, default='Male')

    def __str__(self):
        if self.middle_name is not None:
            return '%s %s %s' % (self.first_name, self.middle_name,self.last_name)
        return '%s %s' % (self.first_name,self.last_name)
class AssignTeacherToSubjects(models.Model):
    teacher = models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name='teachers_assigned_subjects')
    grade = models.ForeignKey(Grade,on_delete=models.CASCADE,related_name='teacher_grade')
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE,related_name='subjects_assigned')
    
    def __str__(self):
        return '%s %s %s' % (self.teacher, self.subject,self.grade)

class AdminAnnouncement(models.Model):
    type = models.CharField(max_length=50,choices=announcement_types,default='Academic')
    title = models.CharField(max_length=150,null=False,blank=False)
    details = models.TextField(null=False,blank=False)
    created_by= models.ForeignKey(CMS_Users,related_name='adminannouncements',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True,editable=False)
    announcement_for = models.CharField(max_length=50,choices=announcement_choices,default='all')
    files_by_admin = models.FileField(upload_to='admin_announcements',null=True,blank=True)

    def __str__(self):
        return '%s for %s' % (self.title, self.announcement_for)

class TeachersAnnouncement(models.Model):
    title = models.CharField(max_length=150)
    details = models.TextField(null=False,blank=False)
    created_by = models.ForeignKey(CMS_Users,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True,editable=False)
    announcement_for_class = models.ForeignKey(Grade,related_name='teacher_announcements',on_delete=models.CASCADE)
    files_by_teachers = models.FileField(upload_to='teacher_announcements',null=True,blank=True)

    def __str__(self):
        return '%s for %s' % (self.title, self.announcement_for_class)

class GivenAssignments(models.Model):
    title = models.CharField(max_length=150,null=False,blank=False)
    subject = models.ForeignKey(Subject, related_name='subjects', on_delete=models.CASCADE)
    instructions = models.TextField(null=False,blank=False)
    created_by= models.ForeignKey(CMS_Users,related_name='created_assignments',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True,editable=False)
    date_due = models.DateField()
    time_due= models.TimeField()
    for_grade= models.ForeignKey(Grade, related_name='assignments_grades', on_delete=models.CASCADE)
    related_files = models.FileField(upload_to='given_assignments',null=True,blank=True)

    def __str__(self):
            return '%s: %s,%s' % (self.subject,self.title,self.for_grade)
        
class SubmittedAssignments(models.Model):
    student= models.ForeignKey(CMS_Users,related_name='submitted_assignments',on_delete=models.CASCADE)
    assignment = models.ForeignKey(GivenAssignments,related_name='assigned',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True,editable=False)
    submitted_files = models.FileField(upload_to='submitted_assignments',null=True,blank=True)

    def __str__(self):
            return '%s: %s' % (self.student,self.created_at)

class LectureNotes(models.Model):
    title = models.CharField(max_length=150,null=False,blank=False)
    description = models.TextField(null=False,blank=False)
    grade = models.ForeignKey(Grade,on_delete=models.CASCADE,related_name='grades')
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE,related_name='lectures_notes')
    notes_files = models.FileField(upload_to='lecture_notes',null=True,blank=True)
    teacher= models.ForeignKey(Teacher,related_name='teachers_name',on_delete=models.CASCADE)

    def __str__(self):
            return '%s: %s,%s,%s' % (self.grade,self.title,self.subject,self.teacher)

def is_future_date(value):
    if value > datetime_date.today():
        raise ValidationError('Future date is not valid in attendances.')
class Attendance(models.Model):
    student= models.ForeignKey(Student,related_name='attendances',on_delete=models.CASCADE)
    teacher= models.ForeignKey(Teacher,related_name='attendances_teachers',on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject,related_name='attendance_subject',on_delete=models.CASCADE)
    date = models.DateField(validators=[is_future_date])
    grade = models.ForeignKey(Grade,on_delete=models.CASCADE,related_name='attendance_grade')
    attendance_status = models.CharField(max_length=55,choices=attendance_choices,default='ABSENT',null=False,blank=False)
    
    def __str__(self):
        return '%s,%s,%s:%s' % (self.student,self.subject,self.date,self.attendance_status)

    def clean(self):
        student = self.student
        teacher = self.teacher
        subject = self.subject
        grade = self.grade
        date = self.date
        if self.objects.filter(student=student).filter(teacher = teacher).filter(subject=subject).filter(grade=grade).filter(date=date).exists():
            raise ValidationError('Data already exists.')

class TimeTable(models.Model):
    day = models.CharField(max_length=255,choices=day_choices,null=False,blank=False)
    startTime = models.TimeField()
    endTime = models.TimeField()
    assigned = models.ForeignKey(AssignTeacherToSubjects,related_name='assigned_teachers',on_delete=models.CASCADE)

    def __str__(self):
        return '%s,%s,%s:%s' % (self.day,self.startTime,self.endTime,self.assigned)

    def clean(self):
        assigned = self.assigned
        startTime = self.startTime
        endTime = self.endTime
        day = self.day
        if self.objects.filter(assigned = assigned).filter(day=day).filter(startTime=startTime).filter(endTime=endTime).exists():
            raise ValidationError('Data already exists.')
        if startTime > endTime:
            raise ValidationError('startTime cannot be after endTime.')
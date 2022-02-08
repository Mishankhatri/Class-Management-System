from django.contrib import admin
from .models import AdminAnnouncement, Section,Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes

@admin.register(Section)
class Admin(admin.ModelAdmin):
    list_display = ('section',)

@admin.register(Grade)
class Admin(admin.ModelAdmin):
    list_display = ('class_name', 'section', )
    
@admin.register(Subject)
class Admin(admin.ModelAdmin):
    list_display =('subject_name', 'subject_code', 'grade', 'description', )

@admin.register(Student)
class Admin(admin.ModelAdmin):
    list_display = ('SRN', 'user', 'first_name', 'middle_name', 'last_name', 'DOB', 'email', 'photo', 'contact_no', 'current_grade', 'gender', )

@admin.register(Parent)
class Admin(admin.ModelAdmin):
    list_display = ('student', 'gender', 'father_name', 'mother_name', 'parent_address', 'parent_state','parent_contact_no','parent_additional_contact_no','parent_email', )

@admin.register(Teacher)
class Admin(admin.ModelAdmin):
    list_display = ('TRN', 'user', 'first_name', 'middle_name', 'last_name', 'DOB', 'email', 'photo', 'contact_no', 'gender', )

@admin.register(AssignTeacherToSubjects)
class Admin(admin.ModelAdmin):
    list_display = ('teacher', 'grade', 'subject', )

@admin.register(AdminAnnouncement)
class Admin(admin.ModelAdmin):
    list_display = ('title', 'details', 'created_by', 'created_at', 'announcement_for','files_by_admin' )

@admin.register(TeachersAnnouncement)
class Admin(admin.ModelAdmin):
    list_display = ('title', 'details', 'created_by', 'created_at', 'announcement_for_class', 'files_by_teachers', )
    
@admin.register(GivenAssignments)
class Admin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'instructions', 'created_by', 'created_at', 'date_due', 'time_due', 'for_grade', )

@admin.register(SubmittedAssignments)
class Admin(admin.ModelAdmin):
    list_display = ('student', 'assignment', 'created_at', 'submitted_files', )
@admin.register(LectureNotes)
class Admin(admin.ModelAdmin):
    list_display = ('title', 'description', 'grade', 'subject', 'notes_files', )
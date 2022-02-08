from core.models import  Section,Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,AdminAnnouncement,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes
from rest_framework import serializers
from users.serializers import CMS_UsersSerializer

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Section
        fields = '__all__'
        
class GradeSerializer(serializers.ModelSerializer):
    section = SectionSerializer()
    class Meta:
        model= Grade
        fields = '__all__'
        
class SubjectsSerializer(serializers.ModelSerializer):
    grade = GradeSerializer()
    class Meta:
        model= Subject
        fields = '__all__'
        
class StudentSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer()
    class Meta:
        model= Student
        fields = '__all__'
        
class ParentSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    class Meta:
        model= Parent
        fields = '__all__'
        
class TeacherSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer()
    class Meta:
        model= Teacher
        fields = '__all__'
        
class AssignTeacherToSubjectsSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    grade = GradeSerializer()
    subject = SubjectsSerializer()
    class Meta:
        model= AssignTeacherToSubjects
        fields = '__all__'
        
class AdminAnnoucementSerializer(serializers.ModelSerializer):
    created_by = CMS_UsersSerializer()
    class Meta:
        model= AdminAnnouncement
        fields = '__all__'
        
class TeacherAnnoucementSerializer(serializers.ModelSerializer):
    created_by = CMS_UsersSerializer()
    announcement_for_class = GradeSerializer()
    class Meta:
        model= TeachersAnnouncement
        fields = '__all__'
        
class GivenAssignmentSerializer(serializers.ModelSerializer):
    created_by = CMS_UsersSerializer()
    for_grade = GradeSerializer()
    class Meta:
        model= GivenAssignments
        fields = '__all__'
        
class SubmittedAssignmentSerializer(serializers.ModelSerializer):
    student = CMS_UsersSerializer()
    assignment = GivenAssignmentSerializer()
    class Meta:
        model= SubmittedAssignments
        fields = '__all__'
        
class LectureNotesSerializer(serializers.ModelSerializer):
    grade = GradeSerializer()
    subject = SubjectsSerializer()
    class Meta:
        model= LectureNotes
        fields = '__all__'
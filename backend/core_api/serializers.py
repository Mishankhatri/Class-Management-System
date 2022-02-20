from core.models import  Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,AdminAnnouncement,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes,Attendance,TimeTable
from rest_framework import serializers
from users.serializers import CMS_UsersSerializer
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Grade
        fields = '__all__'
        
class SubjectsLISTSerializer(serializers.ModelSerializer):
    grade = GradeSerializer(read_only=True)
    class Meta:
        model= Subject
        fields = '__all__'
        
class SubjectsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Subject
        fields = '__all__'
        
class StudentLISTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    current_grade = GradeSerializer(read_only=True)
    class Meta:
        model= Student
        fields = '__all__'
        
class StudentPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Student
        fields = '__all__'
        
class ParentLISTSerializer(serializers.ModelSerializer):
    student = StudentLISTSerializer(read_only=True)
    class Meta:
        model= Parent
        fields = '__all__'
        
class ParentPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Parent
        fields = '__all__'
        
class TeacherLISTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    class Meta:
        model= Teacher
        fields = '__all__'
        
class TeacherPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Teacher
        fields = '__all__'
        
class AssignTeacherToSubjectsLISTSerializer(serializers.ModelSerializer):
    subject= SubjectsLISTSerializer(read_only=True)
    grade = serializers.StringRelatedField()
    teacher= TeacherLISTSerializer(read_only=True)
    class Meta:
        model= AssignTeacherToSubjects
        fields = '__all__'
        
class AssignTeacherToSubjectsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= AssignTeacherToSubjects
        fields = '__all__'
        
class AdminAnnoucementLISTSerializer(serializers.ModelSerializer):
    created_by = CMS_UsersSerializer(read_only=True)
    class Meta:
        model= AdminAnnouncement
        fields = '__all__'
        
class AdminAnnoucementPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= AdminAnnouncement
        fields = '__all__'
        
class TeacherAnnoucementLISTSerializer(serializers.ModelSerializer):
    created_by = CMS_UsersSerializer(read_only=True)
    announcement_for_class = GradeSerializer(read_only=True)
    class Meta:
        model= TeachersAnnouncement
        fields = '__all__'
        
class TeacherAnnoucementPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= TeachersAnnouncement
        fields = '__all__'
        
class GivenAssignmentLISTSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    for_grade = serializers.StringRelatedField()
    subject = serializers.StringRelatedField()
    class Meta:
        model= GivenAssignments
        fields = '__all__'
        
class GivenAssignmentPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= GivenAssignments
        fields = '__all__'
        
class SubmittedAssignmentLISTSerializer(serializers.ModelSerializer):
    student = CMS_UsersSerializer(read_only=True)
    assignment = GivenAssignmentLISTSerializer(read_only=True)
    class Meta:
        model= SubmittedAssignments
        fields = '__all__'
        
class SubmittedAssignmentPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= SubmittedAssignments
        fields = '__all__'
        
class LectureNotesLISTSerializer(serializers.ModelSerializer):
    grade = serializers.StringRelatedField()
    subject = serializers.StringRelatedField()
    teacher = serializers.StringRelatedField()
    class Meta:
        model= LectureNotes
        fields = '__all__'
        
class LectureNotesPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= LectureNotes
        fields = '__all__'
        
class AttendanceListSerializer(serializers.ModelSerializer):
    grade = serializers.StringRelatedField()
    subject = serializers.StringRelatedField()
    teacher = serializers.StringRelatedField()
    student = serializers.StringRelatedField()
    class Meta:
        model= Attendance
        fields = '__all__'
        
class AttendancePOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Attendance
        fields = '__all__'

class TimeTableLISTSerializer(serializers.ModelSerializer):
    assigned = AssignTeacherToSubjectsLISTSerializer(read_only=True)
    class Meta:
        model= TimeTable
        fields = '__all__'
        
class TimeTablePOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= TimeTable
        fields = '__all__'
    
    def validate(self,data):
        assigned = data.get('assigned')
        startTime = data.get('startTime')
        endTime = data.get('endTime')
        day = data.get('day')
        if self.Meta.model.objects.filter(assigned = assigned).filter(day=day).filter(startTime=startTime).filter(endTime=endTime):
            raise serializers.ValidationError('Data already exists.')
        return data
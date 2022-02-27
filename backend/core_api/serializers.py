from core.models import  Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,AdminAnnouncement,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes,Attendance,TimeTable
from datetime import date as datetime_date
from rest_framework import serializers
from users.serializers import CMS_UsersSerializer
from django.contrib.auth import get_user_model

CMS_Users = get_user_model()
class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Grade
        fields = '__all__'
        
class SubjectsLISTSerializer(serializers.ModelSerializer):
    grade = GradeSerializer(read_only=True)
    class Meta:
        model= Subject
        fields ='__all__'
        
class SubjectsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Subject
        fields = '__all__'
        
class StudentSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    current_grade = GradeSerializer(read_only=True)
    class Meta:
        model= Student
        fields = '__all__'
class StudentPOSTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    class Meta:
        model= Student
        fields = '__all__'
        
class StudentUserLISTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    current_grade = GradeSerializer(read_only=True)
    class Meta:
        model= Student
        fields = '__all__'
        
class StudentUserPOSTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer()
    current_grade = GradeSerializer()
    class Meta:
        model= Student
        fields = '__all__'
        
    def create(self, validated_data):
        user = self.context['request'].user
        if not user.admin:
            raise serializers.ValidationError({"Authorization": "You dont have permission to this api."})
        user_data = validated_data.pop('user')
        grade_data = validated_data.pop('current_grade')
        user = CMS_Users.objects.create_student(**user_data)
        current_grade,created = Grade.objects.get_or_create(**grade_data)
        student = Student.objects.create(user=user, current_grade=current_grade,**validated_data)
        return student

class ParentLISTSerializer(serializers.ModelSerializer):
    student = StudentUserLISTSerializer(read_only=True)
    class Meta:
        model= Parent
        fields = '__all__'
        
class ParentPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= Parent
        fields = '__all__'
class ParentUPDATESerializer(serializers.ModelSerializer):
    student = StudentUserLISTSerializer(read_only=True)
    class Meta:
        model= Parent
        fields = '__all__'
        
class TeacherSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    class Meta:
        model= Teacher
        fields = '__all__'
        
class TeacherUserLISTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer(read_only=True)
    class Meta:
        model= Teacher
        fields = '__all__'
        
class TeacherUserPOSTSerializer(serializers.ModelSerializer):
    user = CMS_UsersSerializer()
    class Meta:
        model= Teacher
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        if not user.admin:
            raise serializers.ValidationError({"Authorization": "You dont have permission to this api."})
        user_data = validated_data.pop('user')
        user = CMS_Users.objects.create_teacher(**user_data)
        teacher = Teacher.objects.create(user=user,**validated_data)
        return teacher
class AssignTeacherToSubjectsLISTSerializer(serializers.ModelSerializer):
    teacher= TeacherSerializer()
    subject= SubjectsLISTSerializer()
    grade = GradeSerializer()
    class Meta:
        model= AssignTeacherToSubjects
        fields = '__all__'
    
        
class AssignTeacherToSubjectsPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model= AssignTeacherToSubjects
        fields = '__all__'
        
    def validate(self,data):
        teacher = data.get('teacher')
        subject = data.get('subject')
        grade = data.get('grade')
        if self.Meta.model.objects.filter(teacher = teacher).filter(subject=subject).filter(grade=grade).exists():
            raise serializers.ValidationError('Data already exists.')
        return data
    
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
    created_by = CMS_UsersSerializer(read_only=True)
    for_grade = GradeSerializer(read_only=True)
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

    def validate(self,data):
        student = data.get('student')
        teacher = data.get('teacher')
        subject = data.get('subject')
        grade = data.get('grade')
        date = data.get('date')
        if date > datetime_date.today():
            raise serializers.ValidationError('Invalid date: Future date is not valid.')
        if self.Meta.model.objects.filter(student=student).filter(teacher = teacher).filter(subject=subject).filter(grade=grade).filter(date=date).exists():
            raise serializers.ValidationError('Data already exists.')
        return data

class BulkAttendancePOSTSerializer(serializers.Serializer):
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    grade = serializers.PrimaryKeyRelatedField(queryset=Grade.objects.all())
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())
    date = serializers.DateField()
    students = serializers.ListField(child = serializers.ListField(),write_only=True)
    class Meta:
        fields = ['teacher,grade,subject,date,students']
    # example of data from frontend
    # {
    # 	"date": "2024-04-02",
    # 	"teacher": 2,
    # 	"subject": 1,
    # 	"grade": 1,
    # 	"students": [
    # 		[3, "ABSENT"],
    # 		[5, "PRESENT"]
    # 	]
    # }
    # 'Data must be of format:{"date":"DDDD-MM-DD","teacher":teacher_id,"subject":subject_id,"grade":grade_id,"students":[[student_id, "ABSENT"],[student_id, "PRESENT"]...]}'
    def save(self):
        teacher = self.validated_data.get('teacher')
        grade = self.validated_data.get('grade')
        subject = self.validated_data.get('subject')
        date = self.validated_data.get('date')
        if date > datetime_date.today():
            raise serializers.ValidationError('Future date is not valid in attendances.')
        students_list = self.validated_data.get('students')
        for std in students_list:
            std_id,attendance_status = std
            student = Student.objects.get(id = int(std_id))
            if Attendance.objects.filter(teacher=teacher).filter(grade=grade).filter(subject=subject).filter(student=student).filter(date=date).exists():
                raise serializers.ValidationError('Data already exits.')
            else:
                Attendance.objects.get_or_create(teacher=teacher,grade=grade,subject=subject,student=student,attendance_status=attendance_status,date=date)
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
        if self.Meta.model.objects.filter(assigned = assigned).filter(day=day).filter(startTime=startTime).filter(endTime=endTime).exists():
            raise serializers.ValidationError('Data already exists.')
        return data
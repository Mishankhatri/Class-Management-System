from rest_framework import viewsets,permissions,parsers
from backend.core.models import Attendance
from core.models import Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,AdminAnnouncement,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes,Attendance
from .serializers import AdminAnnoucementSerializer, AssignTeacherToSubjectsSerializer, GivenAssignmentSerializer, GradeSerializer, LectureNotesSerializer, ParentSerializer,  StudentSerializer, SubjectsSerializer, SubmittedAssignmentSerializer, TeacherAnnoucementSerializer,AttendanceSerializer

class GradeAPI(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permissions_classes= [permissions.IsAuthenticated,]

class SubjectAPI(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectsSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    
class StudentAPI(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]
    permissions_classes= [permissions.IsAuthenticated,]
    
class ParentAPI(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    
class TeacherAPI(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = StudentSerializer
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]
    permissions_classes= [permissions.IsAuthenticated,]

class AssignTeacherToSubjectsAPI(viewsets.ModelViewSet):
    queryset = AssignTeacherToSubjects.objects.all()
    serializer_class = AssignTeacherToSubjectsSerializer
    permissions_classes= [permissions.IsAuthenticated,]

class AdminAnnoucementAPI(viewsets.ModelViewSet):
    queryset= AdminAnnouncement.objects.all()
    serializer_class= AdminAnnoucementSerializer
    permissions_classes= [permissions.IsAdminUser,]
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]

class TeacherAnnoucementAPI(viewsets.ModelViewSet):
    queryset= TeachersAnnouncement.objects.all()
    serializer_class= TeacherAnnoucementSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]

class GivenAssignmentsAPI(viewsets.ModelViewSet):
    queryset= GivenAssignments.objects.all()
    serializer_class= GivenAssignmentSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]

class SubmittedAssignmentsAPI(viewsets.ModelViewSet):
    queryset= SubmittedAssignments.objects.all()
    serializer_class= SubmittedAssignmentSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]

class LectureNotesAPI(viewsets.ModelViewSet):
    queryset= LectureNotes.objects.all()
    serializer_class= LectureNotesSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]

class AttendanceAPI(viewsets.ModelViewSet):
    serializer_class= AttendanceSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    
    def get_queryset(self):
        queryset = Attendance.objects.all()
        grade = self.request.query_params.get('grade')
        subject = self.request.query_params.get('subject')
        student = self.request.query_params.get('student')
        teacher = self.request.query_params.get('teacher')
        if grade is not None:
            queryset = queryset.filter(grade=grade)
        if subject is not None:
            queryset = queryset.filter(subject=subject)
        if student is not None:
            queryset = queryset.filter(student=student)
        if teacher is not None:
            queryset = queryset.filter(teacher=teacher)
        return queryset
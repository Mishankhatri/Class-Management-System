from rest_framework  import viewsets,permissions,parsers
from core.models import Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,AdminAnnouncement,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes,Attendance,TimeTable
from .serializers import AdminAnnoucementSerializer, AssignTeacherToSubjectsSerializer, GivenAssignmentSerializer, GradeSerializer, LectureNotesSerializer, ParentSerializer,  StudentSerializer, SubjectsSerializer, SubmittedAssignmentSerializer, TeacherAnnoucementSerializer,AttendanceSerializer, TeacherSerializer, TimeTableSerializer

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
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]
    permissions_classes= [permissions.IsAuthenticated,]
    
class ParentAPI(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    
class TeacherAPI(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]
    permissions_classes= [permissions.IsAuthenticated,]

class AssignTeacherToSubjectsAPI(viewsets.ModelViewSet):
    queryset = AssignTeacherToSubjects.objects.all()
    serializer_class = AssignTeacherToSubjectsSerializer
    permissions_classes= [permissions.IsAuthenticated,]

class AdminAnnoucementAPI(viewsets.ModelViewSet):
    queryset= AdminAnnouncement.objects.all()
    serializer_class= AdminAnnoucementSerializer
    permissions_classes= [permissions.IsAdminUser,]
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]

class TeacherAnnoucementAPI(viewsets.ModelViewSet):
    queryset= TeachersAnnouncement.objects.all()
    serializer_class= TeacherAnnoucementSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]

class GivenAssignmentsAPI(viewsets.ModelViewSet):
    queryset= GivenAssignments.objects.all()
    serializer_class= GivenAssignmentSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]

class SubmittedAssignmentsAPI(viewsets.ModelViewSet):
    queryset= SubmittedAssignments.objects.all()
    serializer_class= SubmittedAssignmentSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]

class LectureNotesAPI(viewsets.ModelViewSet):
    queryset= LectureNotes.objects.all()
    serializer_class= LectureNotesSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    parser_classes = [parsers.MultiPartParser,parsers.FileUploadParser,parsers.FormParser]

class AttendanceAPI(viewsets.ModelViewSet):
    serializer_class= AttendanceSerializer
    permissions_classes= [permissions.IsAuthenticated,]
    
    def get_queryset(self):
        queryset = Attendance.objects.all()
        grade_id = self.request.query_params.get('grade')
        subject_id = self.request.query_params.get('subject')
        student_id = self.request.query_params.get('student')
        teacher_id = self.request.query_params.get('teacher')
        if grade_id is not None:
            queryset = queryset.filter(grade__id=grade_id)
        if subject_id is not None:
            queryset = queryset.filter(subject__id=subject_id)
        if student_id is not None:
            queryset = queryset.filter(student__id=student_id)
        if teacher_id is not None:
            queryset = queryset.filter(teacher__id=teacher_id)
        return queryset

class TimeTableAPI(viewsets.ModelViewSet):
    queryset = TimeTable.objects.all()
    serializer_class = TimeTableSerializer
    permissions_classes= [permissions.IsAuthenticated,]
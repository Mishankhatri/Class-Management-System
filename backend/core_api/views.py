from rest_framework  import viewsets,permissions,parsers,filters
from .permissions import *
from core.models import Grade,Subject,Student,Parent,Teacher,AssignTeacherToSubjects,AdminAnnouncement,TeachersAnnouncement,GivenAssignments,SubmittedAssignments,LectureNotes,Attendance,TimeTable
from .serializers import *

class GradeAPI(viewsets.ModelViewSet):
    serializer_class = GradeSerializer
    permissions_classes= [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['class_name','section']
    ordering_fields = ['id','class_name','section']
    ordering=['class_name','section']

    def get_queryset(self):
        queryset = Grade.objects.all()
        class_name = self.request.query_params.get('classname')
        section = self.request.query_params.get('section')
        if class_name is not None:
            queryset = queryset.filter(class_name=class_name)
        if section is not None:
            queryset = queryset.filter(section=section)
        return queryset

class SubjectAPI(viewsets.ModelViewSet):
    serializer_class = SubjectsLISTSerializer
    permissions_classes= [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['subject_code','subject_name']
    ordering_fields = ['id','subject_code','subject_name','grade__id']
    ordering=['subject_name']
    
    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST', 'PUT','PATCH'):
                return SubjectsPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset = Subject.objects.all()
        grade_id = self.request.query_params.get('grade')
        class_name = self.request.query_params.get('classname')
        section = self.request.query_params.get('section')
        subject_name = self.request.query_params.get('subject_name')
        subject_code = self.request.query_params.get('subject_code')
        if grade_id is not None:
            queryset = queryset.filter(grade__id=grade_id)
        if class_name is not None:
            queryset = queryset.filter(grade__class_name=class_name)
        if section is not None:
            queryset = queryset.filter(grade__section=section)
        if subject_name is not None:
            queryset = queryset.filter(subject_name=subject_name)
        if subject_code is not None:
            queryset = queryset.filter(subject_code=subject_code)
        return queryset
    
class StudentAPI(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    permissions_classes= [IsStudentOrAdminOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['first_name','last_name','email','SRN']
    ordering_fields = ['id','first_name','SRN']
    ordering=['SRN']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST', 'PUT','PATCH'):
                return StudentPOSTSerializer
        else:
            return self.serializer_class

    def get_queryset(self):
        queryset = Student.objects.all()
        user_id = self.request.query_params.get('user')
        first_name = self.request.query_params.get('first_name')
        middle_name = self.request.query_params.get('middle_name')
        last_name = self.request.query_params.get('last_name')
        email = self.request.query_params.get('email')
        address = self.request.query_params.get('address')
        srn = self.request.query_params.get('SRN')
        gender = self.request.query_params.get('gender')
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        if first_name is not None:
            queryset = queryset.filter(first_name=first_name)
        if middle_name is not None:
            queryset = queryset.filter(middle_name=middle_name)
        if last_name is not None:
            queryset = queryset.filter(last_name=last_name)
        if email is not None:
            queryset = queryset.filter(email=email)
        if address is not None:
            queryset = queryset.filter(address=address)
        if srn is not None:
            queryset = queryset.filter(SRN=srn)
        if gender is not None:
            queryset = queryset.filter(gender=gender)
        return queryset
    
class StudentUserAPI(viewsets.ModelViewSet):
    serializer_class = StudentUserLISTSerializer
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    permissions_classes= [permissions.IsAdminUser,]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['first_name','last_name','email','SRN']
    ordering_fields = ['id','first_name','SRN']
    ordering=['SRN']
    
    
    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST'):
                return StudentUserPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset = Student.objects.all()
        user_id = self.request.query_params.get('user')
        first_name = self.request.query_params.get('first_name')
        middle_name = self.request.query_params.get('middle_name')
        last_name = self.request.query_params.get('last_name')
        email = self.request.query_params.get('email')
        address = self.request.query_params.get('address')
        srn = self.request.query_params.get('SRN')
        gender = self.request.query_params.get('gender')
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        if first_name is not None:
            queryset = queryset.filter(first_name=first_name)
        if middle_name is not None:
            queryset = queryset.filter(middle_name=middle_name)
        if last_name is not None:
            queryset = queryset.filter(last_name=last_name)
        if email is not None:
            queryset = queryset.filter(email=email)
        if address is not None:
            queryset = queryset.filter(address=address)
        if srn is not None:
            queryset = queryset.filter(SRN=srn)
        if gender is not None:
            queryset = queryset.filter(gender=gender)
        return queryset
    
class ParentAPI(viewsets.ModelViewSet):
    serializer_class = ParentLISTSerializer
    permissions_classes= [IsStudentOrAdminOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['father_name','mother_name','parent_email','student__first_name','student__last_name','parent_address']
    ordering_fields = ['id','father_name','student__first_name']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST'):
                return ParentPOSTSerializer
        elif self.request.method in ('PUT','PATCH'):
            return ParentUPDATESerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset = Parent.objects.all()
        student_id = self.request.query_params.get('student')
        father_name = self.request.query_params.get('father_name')
        mother_name = self.request.query_params.get('mother_name')
        email = self.request.query_params.get('email')
        if student_id is not None:
            queryset = queryset.filter(student__id=student_id)
        if father_name is not None:
            queryset = queryset.filter(father_name=father_name)
        if mother_name is not None:
            queryset = queryset.filter(mother_name=mother_name)
        if email is not None:
            queryset = queryset.filter(parent_email=email)
        return queryset
        
class TeacherAPI(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    permissions_classes= [IsTeacherOrAdminOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['first_name','last_name','email','TRN']
    ordering_fields = ['id','first_name','TRN']
    ordering=['TRN']

    def get_queryset(self):
        queryset = Teacher.objects.all()
        user_id = self.request.query_params.get('user')
        first_name = self.request.query_params.get('first_name')
        middle_name = self.request.query_params.get('middle_name')
        last_name = self.request.query_params.get('last_name')
        email = self.request.query_params.get('email')
        trn = self.request.query_params.get('TRN')
        gender = self.request.query_params.get('gender')
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        if first_name is not None:
            queryset = queryset.filter(first_name=first_name)
        if middle_name is not None:
            queryset = queryset.filter(middle_name=middle_name)
        if last_name is not None:
            queryset = queryset.filter(last_name=last_name)
        if email is not None:
            queryset = queryset.filter(email=email)
        if trn is not None:
            queryset = queryset.filter(TRN=trn)
        if gender is not None:
            queryset = queryset.filter(gender=gender)
        return queryset

class TeacherUserAPI(viewsets.ModelViewSet):
    serializer_class = TeacherUserLISTSerializer
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    permissions_classes= [permissions.IsAdminUser,]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['first_name','last_name','email','TRN']
    ordering_fields = ['id','first_name','TRN']
    ordering=['TRN']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST'):
                return TeacherUserPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset = Teacher.objects.all()
        user_id = self.request.query_params.get('user')
        first_name = self.request.query_params.get('first_name')
        middle_name = self.request.query_params.get('middle_name')
        last_name = self.request.query_params.get('last_name')
        email = self.request.query_params.get('email')
        trn = self.request.query_params.get('TRN')
        gender = self.request.query_params.get('gender')
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        if first_name is not None:
            queryset = queryset.filter(first_name=first_name)
        if middle_name is not None:
            queryset = queryset.filter(middle_name=middle_name)
        if last_name is not None:
            queryset = queryset.filter(last_name=last_name)
        if email is not None:
            queryset = queryset.filter(email=email)
        if trn is not None:
            queryset = queryset.filter(TRN=trn)
        if gender is not None:
            queryset = queryset.filter(gender=gender)
        return queryset

class AssignTeacherToSubjectsAPI(viewsets.ModelViewSet):
    serializer_class = AssignTeacherToSubjectsLISTSerializer
    permissions_classes= [permissions.IsAdminUser,]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['teacher__first_name','teacher__last_name','subject__subject_name','subject__subject_code','grade__class_name','grade__section']
    ordering_fields = ['id','teacher__first_name','teacher__id']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return AssignTeacherToSubjectsPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset = AssignTeacherToSubjects.objects.all()
        subject_id = self.request.query_params.get('subject')
        teacher_id = self.request.query_params.get('teacher')
        grade_id = self.request.query_params.get('grade')
        class_name = self.request.query_params.get('classname')
        section = self.request.query_params.get('section')
        user = self.request.query_params.get('user')
        
        if subject_id is not None:
            queryset = queryset.filter(subject__id=subject_id)
        if teacher_id is not None:
            queryset = queryset.filter(teacher__id=teacher_id)
        if grade_id is not None:
            queryset = queryset.filter(grade__id=grade_id)
        if class_name is not None:
            queryset = queryset.filter(grade__class_name=class_name)
        if section is not None:
            queryset = queryset.filter(grade__section=section)
        if user is not None:
            queryset = queryset.filter(teacher__user__id=user)

        return queryset

class AdminAnnoucementAPI(viewsets.ModelViewSet):
    serializer_class= AdminAnnoucementLISTSerializer
    permissions_classes= [permissions.IsAdminUser,]
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['announcement_for','created_by__username','title']
    ordering_fields = ['id','announcement_for']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return AdminAnnoucementPOSTSerializer
        else:
            return self.serializer_class

    def get_queryset(self):
        queryset= AdminAnnouncement.objects.all()
        created_by = self.request.query_params.get('admin')
        title = self.request.query_params.get('title')
        created_at = self.request.query_params.get('created_at')
        announcement_for = self.request.query_params.get('for')
        if title is not None:
            queryset = queryset.filter(title=title)
        if created_by is not None:
            queryset = queryset.filter(created_by__username=created_by)
        if created_at is not None:
            queryset = queryset.filter(created_at=created_at)
        if announcement_for is not None:
            queryset = queryset.filter(announcement_for=announcement_for)
        return queryset

class TeacherAnnoucementAPI(viewsets.ModelViewSet):
    serializer_class= TeacherAnnoucementLISTSerializer
    permissions_classes= [IsTeacherOrReadOnly]
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['announcement_for_class__class_name','announcement_for_class__section','created_by__username','title']
    ordering_fields = ['id','announcement_for_class__class_name']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return TeacherAnnoucementPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset= TeachersAnnouncement.objects.all()
        created_by = self.request.query_params.get('teacher')
        title = self.request.query_params.get('title')
        created_at = self.request.query_params.get('created_at')
        announcement_for_class = self.request.query_params.get('classname')
        if title is not None:
            queryset = queryset.filter(title=title)
        if created_by is not None:
            queryset = queryset.filter(created_by__username=created_by)
        if announcement_for_class is not None:
            queryset = queryset.filter(announcement_for_class__id=announcement_for_class)

        return queryset

class GivenAssignmentsAPI(viewsets.ModelViewSet):
    serializer_class= GivenAssignmentLISTSerializer
    permissions_classes= [IsTeacherOrReadOnly]
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['subject__subject_name','for_grade__class_name','created_by__username']
    ordering_fields = ['id','subject__subject_name','for_grade__class_name']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return GivenAssignmentPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset= GivenAssignments.objects.all()
        subject_id = self.request.query_params.get('subject')
        created_by = self.request.query_params.get('teacher')
        created_by_id = self.request.query_params.get('user')
        title = self.request.query_params.get('title')
        grade = self.request.query_params.get('grade')
        created_at = self.request.query_params.get('created_at')
        if subject_id is not None:
            queryset = queryset.filter(subject__id=subject_id)
        if title is not None:
            queryset = queryset.filter(title=title)
        if created_by is not None:
            queryset = queryset.filter(created_by__username=created_by)
        if created_by_id is not None:
            queryset = queryset.filter(created_by__id=created_by_id)
        if created_at is not None:
            queryset = queryset.filter(created_at=created_at)
        if grade is not None:
            queryset = queryset.filter(for_grade__id=grade)
        return queryset

class SubmittedAssignmentsAPI(viewsets.ModelViewSet):
    serializer_class= SubmittedAssignmentLISTSerializer
    permissions_classes= [IsStudentOrReadOnly]
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['assignment__subject__subject_name','student__username','assginment__for_grade__class_name']
    ordering_fields = ['id','assignment__subject__subject_name','student__username','assginment__for_grade__class_name']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST'):
                return SubmittedAssignmentPOSTSerializer
        else:
            return self.serializer_class
        
    def get_queryset(self):
        queryset= SubmittedAssignments.objects.all()
        student_id = self.request.query_params.get('student')
        subject_id = self.request.query_params.get('subject')
        created_by = self.request.query_params.get('teacher')
        title = self.request.query_params.get('title')
        created_at = self.request.query_params.get('created_at')
        if student_id is not None:
            queryset = queryset.filter(student__id=student_id)
        if subject_id is not None:
            queryset = queryset.filter(assignment__subject__id=subject_id)
        if title is not None:
            queryset = queryset.filter(assignment__title=title)
        if created_by is not None:
            queryset = queryset.filter(assignment__created_by__username=created_by)
        if created_at is not None:
            queryset = queryset.filter(created_at=created_at)
        return queryset

class LectureNotesAPI(viewsets.ModelViewSet):
    serializer_class= LectureNotesLISTSerializer
    permissions_classes= [IsTeacherOrReadOnly]
    parser_classes = [parsers.MultiPartParser,parsers.FormParser,parsers.FileUploadParser]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['teacher__first_name', 'teacher__last_name','grade__class_name','grade__section','subject__subject_name','title']
    ordering_fields = ['id','teacher_id','grade__class_name']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return LectureNotesPOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset= LectureNotes.objects.all()
        grade_id = self.request.query_params.get('grade')
        class_name = self.request.query_params.get('classname')
        section = self.request.query_params.get('section')
        subject_id = self.request.query_params.get('subject')
        teacher_id = self.request.query_params.get('teacher')
        title = self.request.query_params.get('title')
        if grade_id is not None:
            queryset = queryset.filter(grade__id=grade_id)
        if class_name is not None:
            queryset = queryset.filter(grade__class_name=class_name)
        if section is not None:
            queryset = queryset.filter(grade__section=section)
        if subject_id is not None:
            queryset = queryset.filter(subject__id=subject_id)
        if title is not None:
            queryset = queryset.filter(title=title)
        if teacher_id is not None:
            queryset = queryset.filter(teacher__id=teacher_id)
        return queryset
    
class AttendanceAPI(viewsets.ModelViewSet):
    serializer_class= AttendanceListSerializer
    permissions_classes= [IsTeacherOrReadOnly]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['student__first_name', 'student__last_name','grade__class_name','grade__section','teacher__first_name','subject__subject_name']
    ordering_fields = ['student__first_name', 'student__last_name','grade__class_name','grade__section','teacher__first_name','subject__subject_name']
    ordering=['id']
    
    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return AttendancePOSTSerializer
        else:
            return self.serializer_class
        
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
    serializer_class = TimeTableLISTSerializer
    permissions_classes= [permissions.IsAdminUser,]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['assigned__teacher__first_name', 'assigned__teacher__last_name','assigned__grade__class_name','assigned__grade__section','assigned__subject__subject_name','day']
    ordering_fields = ['id','day','assigned__teacher_id','assigned__grade__class_name']
    ordering=['id']

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        if self.request.method in ('POST','PUT','PATCH'):
                return TimeTablePOSTSerializer
        else:
            return self.serializer_class
    
    def get_queryset(self):
        queryset = TimeTable.objects.all()
        assign_id = self.request.query_params.get('assign')
        subject_id = self.request.query_params.get('subject')
        grade_id = self.request.query_params.get('grade')
        teacher_id = self.request.query_params.get('teacher')
        day = self.request.query_params.get('day')
        start = self.request.query_params.get('start')
        end = self.request.query_params.get('end')
        if assign_id is not None:
            queryset = queryset.filter(assigned__id=assign_id)
        if subject_id is not None:
            queryset = queryset.filter(assigned__subject__id=subject_id)
        if grade_id is not None:
            queryset = queryset.filter(assigned__grade__id=grade_id)
        if teacher_id is not None:
            queryset = queryset.filter(assigned__teacher__id=teacher_id)
        if day is not None:
            queryset = queryset.filter(day=day)
        if start is not None:
            queryset = queryset.filter(startTime=start)
        if end is not None:
            queryset = queryset.filter(endTime=end)
        return queryset
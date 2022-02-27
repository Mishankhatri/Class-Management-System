from .views import AdminAnnoucementAPI, AssignTeacherToSubjectsAPI, AttendanceAPI, BulkAttendanceAPI, GivenAssignmentsAPI, GradeAPI, LectureNotesAPI, ParentAPI, StudentAPI, StudentUserAPI, SubjectAPI, SubmittedAssignmentsAPI, TeacherAnnoucementAPI, TeacherAPI,TeacherUserAPI, TimeTableAPI
from rest_framework.routers import DefaultRouter

app_name = 'core_api'

router = DefaultRouter()
router.register('grades', GradeAPI, basename='grades')
router.register('subjects', SubjectAPI, basename='subjects')
router.register('student', StudentAPI, basename='student')
router.register('student_user', StudentUserAPI, basename='student_user')
router.register('parent', ParentAPI, basename='parent')
router.register('teacher', TeacherAPI, basename='teacher')
router.register('teacher_user', TeacherUserAPI, basename='teacher_user')
router.register('AssignTeacherToSubjectsAPI', AssignTeacherToSubjectsAPI, basename='AssignTeacherToSubjects')
router.register('adminnotices', AdminAnnoucementAPI, basename='adminannouncements')#?makesure you have no empty prefix or change urls routes distinct from jwt's routes 
router.register('teachernotices', TeacherAnnoucementAPI, basename='teacherannouncements')
router.register('givenassignments', GivenAssignmentsAPI, basename='givenassignments')
router.register('submittedassignments', SubmittedAssignmentsAPI, basename='submittedassignments')
router.register('lecturenotes', LectureNotesAPI, basename='lecturenotes')
router.register('attendance', AttendanceAPI, basename='attendance')
router.register('blukattendance', BulkAttendanceAPI, basename='bulkattendance')
router.register('timetable', TimeTableAPI, basename='timetable')
urlpatterns = router.urls
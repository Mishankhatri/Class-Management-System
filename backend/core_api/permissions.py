from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class IsTeacherOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and request.user.is_authenticated and
            request.user.is_teacher
        )
        
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        print(request.user,request.user.is_admin)
        return bool(
            request.method in SAFE_METHODS or
            request.user and request.user.is_authenticated and
            request.user.is_admin
        )
        
class IsStudentOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and request.user.is_authenticated and
            request.user.is_student
        )
        
class IsTeacherOrAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and request.user.is_authenticated and
            (request.user.is_teacher or request.user.is_admin)
        )
        
class IsStudentOrAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and request.user.is_authenticated and
            (request.user.is_student or request.user.is_admin)
        )
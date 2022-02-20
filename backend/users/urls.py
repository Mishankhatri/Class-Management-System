from django.urls import path
from .views import ChangePasswordView, RegisterAdminAPI,UpdateUserProfileAPI,BlacklistTokenUpdateView,UserProfileAPI

app_name = 'users'

urlpatterns = [
    path('profile/', UserProfileAPI.as_view(), name="user"),
    path('profile/update/', UpdateUserProfileAPI.as_view(), name="updateprofile"),
    path('changepassword/', ChangePasswordView.as_view(), name="changepassword"),
    path('register/admin/', RegisterAdminAPI.as_view(), name="register_admin"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name="blacklist"),
]
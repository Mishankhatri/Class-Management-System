from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models
from django.contrib.auth import get_user_model

CMS_Users = get_user_model()



class UserAdminConfig(UserAdmin):
    model = CMS_Users
    search_fields = ('email', 'username', 'fullname',)
    list_filter = ('admin', 'teacher','student',)
    ordering = ('-account_created',)
    list_display = ('email','id', 'username', 'fullname',
                    'is_active', 'is_staff','admin','teacher','student',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'fullname','password','profile_image')}),
        ('Permissions', {'fields': ('is_staff','is_active', 'admin','teacher','student','groups', 'user_permissions')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'fullname', 'password1', 'password2', 'is_active','admin', 'teacher','student')}
         ),
    )

admin.site.register(CMS_Users,UserAdminConfig)
from django.contrib import admin

from .models import AdminAnnouncement

# Register your models here.


@admin.register(AdminAnnouncement)
class Admin(admin.ModelAdmin):
    list_display = ('title', 'details', 'created_by', 'created_at', 'announcement_for', )
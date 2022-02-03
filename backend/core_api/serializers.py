from core.models import AdminAnnouncement
from rest_framework import serializers
from users.serializers import CMS_UsersSerializer


class AdminAnnoucementSerializer(serializers.ModelSerializer):
    created_by = CMS_UsersSerializer(read_only=True)
    class Meta:
        model= AdminAnnouncement
        fields = ('id','title', 'details',  'created_at','created_by','files','announcement_for',) 
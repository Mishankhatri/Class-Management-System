from email import parser
from rest_framework import viewsets,permissions,parsers
from core.models import AdminAnnouncement
from .serializers import AdminAnnoucementSerializer

class AdminAnnoucementView(viewsets.ModelViewSet):
    serializer_class= AdminAnnoucementSerializer
    parser_clases = [parsers.FileUploadParser,parsers.FormParser]
    def get_queryset(self):
        return AdminAnnouncement.objects.all()

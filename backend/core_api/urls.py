from .views import AdminAnnoucementView
from rest_framework.routers import DefaultRouter

app_name = 'core_api'

router = DefaultRouter()
router.register('adminnotices', AdminAnnoucementView, basename='adminannouncements')#?makesure you have no empty prefix or change urls routes distinct from jwt's routes 
urlpatterns = router.urls
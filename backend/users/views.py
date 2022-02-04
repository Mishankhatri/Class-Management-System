from rest_framework import generics,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CMS_UsersSerializer, ChangePasswordSerializer,RegisterAdminSerializer,RegisterTeacherSerializer,RegisterStudentSerializer, UpdateUserSerializer

class UserProfileAPI(generics.RetrieveAPIView):
    serializer_class = CMS_UsersSerializer
    permissions_class= [permissions.IsAuthenticated,]
    
    def get_object(self):
        if(self.request.user):
            return self.request.user
        
class UpdateUserProfileAPI(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permissions_class= [permissions.IsAuthenticated,]
    
    def get_object(self):
        if(self.request.user):
            return self.request.user
    

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permissions_class= [permissions.IsAuthenticated,]
    
    def get_object(self):
        if(self.request.user):
            return self.request.user

class BlacklistTokenUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
class RegisterAdminAPI(generics.GenericAPIView):
    serializer_class = RegisterAdminSerializer
    permissions_classes =[permissions.IsAuthenticated,]
    parser_classes = [MultiPartParser,FormParser]

    def post(self,request,format=None,*args,**kwargs,):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({"user":CMS_UsersSerializer(user,context=self.get_serializer_context()).data,"status":status.HTTP_201_CREATED})
    
class RegisterTeacherAPI(generics.GenericAPIView):
    serializer_class = RegisterTeacherSerializer
    permissions_classes =[permissions.IsAuthenticated,]

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({"user":CMS_UsersSerializer(user,context=self.get_serializer_context()).data,"status":status.HTTP_201_CREATED})

class RegisterStudentAPI(generics.GenericAPIView):
    serializer_class = RegisterStudentSerializer
    permissions_classes =[permissions.IsAuthenticated,]

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({"user":CMS_UsersSerializer(user,context=self.get_serializer_context()).data,"status":status.HTTP_201_CREATED})
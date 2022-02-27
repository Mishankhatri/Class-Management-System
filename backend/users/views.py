from rest_framework import generics,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser,FileUploadParser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CMS_UsersSerializer, ChangePasswordSerializer,RegisterAdminSerializer,UpdateUserSerializer,ResetPasswordEmailRequestSerializer,SetNewPasswordSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import Util
from django.contrib.auth import get_user_model
CMS_Users = get_user_model()
import environ

env = environ.Env()
environ.Env.read_env()
class UserProfileAPI(generics.RetrieveAPIView):
    serializer_class = CMS_UsersSerializer
    permissions_class= [permissions.IsAuthenticated,]
    
    def get_object(self):
        if(self.request.user):
            return self.request.user
        
class UpdateUserProfileAPI(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permissions_class= [permissions.IsAuthenticated,]
    parser_classes = [MultiPartParser,FormParser,FileUploadParser]
    
    def get_object(self):
        if(self.request.user):
            return self.request.user
    

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permissions_class= [permissions.IsAuthenticated,]
    
    def get_object(self):
        if(self.request.user):
            return self.request.user
        
class RegisterAdminAPI(generics.GenericAPIView):
    serializer_class = RegisterAdminSerializer
    permissions_classes =[permissions.IsAuthenticated,]
    parser_classes = [MultiPartParser,FormParser,FileUploadParser]

    def post(self,request,format=None,*args,**kwargs,):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        return Response({"user":CMS_UsersSerializer(user,context=self.get_serializer_context()).data,"status":status.HTTP_201_CREATED})

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
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        email = request.data.get('email', '')
        if CMS_Users.objects.filter(email=email).exists():
            user = CMS_Users.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            frontendurl = env('FRONTEND_URL')
            reset_url = f'{frontendurl}/setpassword/{uidb64}/{token}'
            email_body = f'Dear {user.username},\n Use link below to reset your password  \n' + \
                reset_url
            data = {'email_body': email_body, 'to_email': email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({'not found': 'No such user exits with given email address'}, status=status.HTTP_404_NOT_FOUND)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CMS_Users.objects.get(id=id)
            if PasswordResetTokenGenerator().check_token(user, token):
                return Response({'success': True, 'message': 'Valid token'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': True, 'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request):
        try:
            uidb64 = request.data.get('uidb64','')
            id = smart_str(urlsafe_base64_decode(uidb64))
            email = CMS_Users.objects.filter(id=id).values('email')
            user_email = list(email)[0].get('email')
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            email_body = f'Password Reset Successfull,\n Your password has been sucessfully changed. \n' 
            data = {'email_body': email_body, 'to_email': user_email,
                        'email_subject': 'Your Account: Reset passsword success.'}
            Util.send_email(data)
            return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': True, 'message': 'Password reset failure'}, status=status.HTTP_400_BAD_REQUEST)
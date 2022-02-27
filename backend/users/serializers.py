from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.exceptions import AuthenticationFailed
from .utils import Util
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import  force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model
CMS_Users = get_user_model()



class CMS_UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CMS_Users
        fields = ('id','username','password','email','admin','teacher','student','profile_image',)
        extra_kwargs = {'password':{'write_only':True,}}
        validators = [
            UniqueTogetherValidator(
                queryset=CMS_Users.objects.all(),
                fields=['username','email'],
                message="Email and Username must be unique"
            )]

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CMS_Users
        fields = ('username','email','profile_image')
        validators = [
            UniqueTogetherValidator(
                queryset=CMS_Users.objects.all(),
                fields=['username','email'],
                message="Email and Username must be unique"
            )]
    
    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.id:
            raise serializers.ValidationError({"Authorization": "You dont have permission for this user."})
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.profile_image = validated_data.get('profile_image',instance.profile_image)
        instance.save()
        return instance

class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CMS_Users
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        if not self.context['request'].user.id == instance.id:
            raise serializers.ValidationError({"Authorization": "You dont have permissions for this user "})
        instance.set_password(validated_data['password'])
        instance.save()
        user = CMS_Users.objects.get(id=instance.id)
        email = self.Meta.model.objects.filter(id = instance.id).values('email')
        email = list(email)[0].get('email')
        email_body = f'Dear {user.username},\n Your password has been changed. If you did not changed password contact administration for password reset.\n'
        data = {'email_body': email_body, 'to_email': email,
                    'email_subject': 'Password has been changed.'}
        Util.send_email(data)
        return instance
    
class RegisterAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = CMS_Users
        fields = ('email','username','password','profile_image',)
        extra_kwargs = {'email':{'required':True},'username':{'required':True},'password':{'write_only':True}}
        validators = [
            UniqueTogetherValidator(
                queryset=CMS_Users.objects.all(),
                fields=['email', 'username'],
                message="Email and Username must be unique"
            )]
    
    def create(self,validated_data):
        user = CMS_Users.objects.create_superuser(**validated_data)
        return user

class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=5)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=8, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, data):
        try:
            password = data.get('password')
            token = data.get('token')
            uidb64 = data.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = CMS_Users.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()
            return data

        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
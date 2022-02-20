from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueTogetherValidator
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
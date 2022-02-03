from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from PIL import Image
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings

CMS_Users = settings.AUTH_USER_MODEL

def upload_to(instance,filename):
    return f'profile_pics/{filename}'

class CMSUserManager(BaseUserManager):
    
    def create_user(self, email, username, fullname, password=None,**extrafields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        if not username:
            raise ValueError(_('You must provide an username '))
        if not fullname:
            raise ValueError(_('You must provide a first name'))
        if not password:
            raise ValueError(_('You must provide a password'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,fullname=fullname,**extrafields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, fullname, password,**extra_fields):

        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('admin', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Admin must be assigned to is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError(
                'Admin must be assigned to is_staff=True.')
        if extra_fields.get('admin') is not True:
            raise ValueError(
                'Admin must be assigned to admin=True.')
        if extra_fields.get('is_active') is not True:
            raise ValueError(
                'Admin must be assigned to is_active=True.')
        user = self.create_user(
            email, username, fullname, password,**extra_fields
        )
        return user

    def create_teacher(self, email, username, fullname, password, **extra_fields):
        """
        Creates and saves a teacher user with the given email and password.
        """
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('teacher', True)
        
        if extra_fields.get('is_active') is not True:
            raise ValueError(
                'User must be assigned to is_active=True.')
        if extra_fields.get('teacher') is not True:
            raise ValueError(
                'User(Teacher) must be assigned to teacher=True.')
        user = self.create_user(
            email, username, fullname, password,**extra_fields
        )

        return user
            
    def create_student(self, email, username, fullname, password, **extra_fields):
        """
        Creates and saves a student user with the given email and password.
        """
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('student', True)
        
        if extra_fields.get('is_active') is not True:
            raise ValueError(
                'User must be assigned to is_active=True.')
        if extra_fields.get('student') is not True:
            raise ValueError(
                'User(Student) must be assigned to student=True.')
        user = self.create_user(
            email, username, fullname, password, **extra_fields)
        return user



class CMS_Users(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)
    fullname = models.CharField(max_length=255, blank=False,null=False)
    profile_image = models.ImageField(upload_to=upload_to,default='default.jpg')
    is_active = models.BooleanField(_('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    admin = models.BooleanField(_('admin status'),
        default=False,
        help_text=_(
            'Designates that this user has all permissions without '
            'explicitly assigning them.'
        ),)
    teacher = models.BooleanField(_('teacher status'),
        default=False,
        help_text=_(
            'Designates that this user has all permissions of a teacher '
        ),)
    student = models.BooleanField(_('student status'),
        default=False,
        help_text=_(
            'Designates that this user has all permissions of a student '
        ),)
    account_created = models.DateTimeField(default=timezone.now)

    objects = CMSUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'username', 'fullname' ,'password',]
    
    def save(self, *args, **kwargs):
        super(CMS_Users, self).save(*args, **kwargs)
        img = Image.open(self.profile_image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.profile_image.path)

    def __str__(self):
        return self.username
    
    @property
    def is_admin(self):
        return self.admin

    @property
    def is_teacher(self):
        return self.teacher
    
    @property
    def is_student(self):
        return self.student


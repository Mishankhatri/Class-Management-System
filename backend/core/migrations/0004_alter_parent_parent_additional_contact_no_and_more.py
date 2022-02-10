# Generated by Django 4.0.1 on 2022-02-09 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_remove_parent_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parent',
            name='parent_additional_contact_no',
            field=models.BigIntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='parent',
            name='parent_contact_no',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='student',
            name='contact_no',
            field=models.BigIntegerField(),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='contact_no',
            field=models.BigIntegerField(),
        ),
    ]
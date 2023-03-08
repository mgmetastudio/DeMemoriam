# Generated by Django 3.2.12 on 2023-03-08 11:47

from django.db import migrations
import django_resized.forms


class Migration(migrations.Migration):

    dependencies = [
        ('nfts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postnft',
            name='image',
            field=django_resized.forms.ResizedImageField(blank=True, crop=['middle', 'center'], force_format=None, keep_meta=True, null=True, quality=-1, size=[1000, 1000], upload_to='images'),
        ),
    ]

# Generated by Django 3.2.12 on 2023-03-13 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nfts', '0002_alter_postnft_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postnft',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]

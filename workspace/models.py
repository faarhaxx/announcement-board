from django.db import models
from django.contrib.auth.models import User


class Workspace(models.Model):

    name = models.CharField(max_length=255)

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Membership(models.Model):

    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('member', 'Member'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='member'
    )

    def __str__(self):
        return f"{self.user.username} - {self.workspace.name}"
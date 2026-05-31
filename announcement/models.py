from django.db import models
from django.contrib.auth.models import User
from workspace.models import Workspace


class Announcement(models.Model):

    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=255)
    content = models.TextField()
    workspace = models.ForeignKey(
    Workspace,
    on_delete=models.CASCADE,
    null=True,
    blank=True
)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )

    is_pinned = models.BooleanField(default=False)
    created_by = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    null=True,
    blank=True
)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
# Create your models here.

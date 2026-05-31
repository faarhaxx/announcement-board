from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Announcement
from .serializers import AnnouncementSerializer


class AnnouncementListCreateView(generics.ListCreateAPIView):

    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class AnnouncementDeleteView(generics.DestroyAPIView):

    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticated]
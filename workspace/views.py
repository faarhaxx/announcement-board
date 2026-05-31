from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Workspace, Membership
from .serializers import WorkspaceSerializer, MembershipSerializer


class WorkspaceListCreateView(generics.ListCreateAPIView):

    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MembershipListCreateView(generics.ListCreateAPIView):

    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    permission_classes = [IsAuthenticated]
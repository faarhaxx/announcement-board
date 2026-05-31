from rest_framework import serializers
from .models import Workspace, Membership


class WorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields = "__all__"
        read_only_fields = ['owner']


class MembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Membership
        fields = "__all__"
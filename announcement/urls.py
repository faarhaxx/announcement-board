from django.urls import path

from .views import (
    AnnouncementListCreateView,
    AnnouncementDeleteView
)

urlpatterns = [

    path(
        '',
        AnnouncementListCreateView.as_view()
    ),

    path(
        'delete/<int:pk>/',
        AnnouncementDeleteView.as_view()
    ),

]
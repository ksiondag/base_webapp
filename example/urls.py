from django.urls import path

from . import views

urlpatterns = [
    path("", views.FundList.as_view()),
    path("<str:name>/", views.FundDetail.as_view()),
]

from django.urls import path

from . import views

urlpatterns = [
    path("", views.crud_fund, name="crud_fund"),
]

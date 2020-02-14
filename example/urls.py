from django.urls import path

from . import views

urlpatterns = [
    path("", views.FundList.as_view(), name="fund_list"),
    path("<int:pk>/", views.FundDetail.as_view(), name="fund_detail"),
]

from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APITestCase


class BaseTestCase(APITestCase):
    def setUp(self):
        password = "top_secret"
        self.user = User.objects.create_user(
            username="foo", email="foo@bar.com", password=password
        )

        url = reverse("token_obtain_pair")

        response = self.client.post(
            url, {"username": self.user.username, "password": password}
        )

        self.token = response.json()
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token["access"])

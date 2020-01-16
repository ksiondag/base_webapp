from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse


class FundTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            "test", email="testuser@example.com", password="testpassword"
        )
        self.client.login(username="test", password="testpassword")

    def test_post(self):
        self.client.post(
            reverse("crud_fund"), {"name": "Test Fund", "balance": 1200.00}
        )

        return {"status": "SUCCESS"}

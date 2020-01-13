from django.test import TestCase, Client
from django.urls import reverse


class FundTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_post(self):
        self.client.post(
            reverse("crud_fund"), {"name": "Test Fund", "balance": 1200.00}
        )

        return {"status": "SUCCESS"}

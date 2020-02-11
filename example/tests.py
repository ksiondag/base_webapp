from django.urls import reverse

from server.test_case import BaseTestCase


class TestFundAPI(BaseTestCase):
    def test_get_funds(self):
        url = reverse("fund_list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

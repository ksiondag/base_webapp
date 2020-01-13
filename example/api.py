from contextlib import contextmanager
from datetime import date

from example.models import Fund


class FundAPI:
    def get(self):
        return {
            "funds": [fund.to_json() for fund in Fund.objects.all()],
        }

    def post(self, name, balance, balance_date=None):
        if balance_date is None:
            balance_date = date.today()
        Fund.objects.create(name=name, balance=balance, balance_date=balance_date)


@contextmanager
def fund_api():
    yield FundAPI()

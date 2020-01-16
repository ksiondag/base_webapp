from datetime import date

from django.db import models
from django.contrib.auth.models import User


def _today():
    return date.today()


class FundManager(models.Manager):
    def create_empty_fund(self, name):
        return self.create(
            name=name, balance=0, threshold_date=date.today(), balance_date=_today(),
        )


class Fund(models.Model):
    objects = FundManager()

    name = models.CharField(unique=True, max_length=255)
    balance = models.IntegerField(default=0)
    balance_date = models.DateField(null=False)

    # TODO: It might make sense to make this a many-to-many relationship so that funds can be shared between users
    # (Think joint checking accounts)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

    def to_json(self):
        return {
            "name": self.name,
            "balance": self.balance,
            "last_updated": self.balance_date,
        }

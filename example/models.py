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

    # TODO: unique-together with user
    name = models.CharField(unique=True, max_length=255)
    balance = models.IntegerField(default=0)
    balance_date = models.DateField(default=date.today, null=False)

    # TODO: It might make sense to make this a many-to-many relationship so that funds can be shared between users
    # (Think joint checking accounts)
    # TODO: Make this "owner" and also have a list of users that are allowed to view fund
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)

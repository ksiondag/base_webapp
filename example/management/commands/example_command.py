from django.core.management.base import BaseCommand

from example.models import Fund


def list_funds(fundname):
    if fundname:
        queryset = Fund.objects.filter(name__in=fundname)
    else:
        queryset = Fund.objects.all()
    print("Funds:")
    for fund in queryset:
        print("  {}".format(fund.name))
    print()


class Command(BaseCommand):
    help = "Import transaction history from Betterment export csv"

    def add_arguments(self, parser):
        parser.add_argument("fundname", nargs="*")

    def handle(self, fundname, *args, **kwargs):
        print(fundname)
        list_funds(*fundname)

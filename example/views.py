from example.models import Fund
from example.serializers import FundSerializer
from rest_framework import generics


class FundList(generics.ListCreateAPIView):
    queryset = Fund.objects.all()
    serializer_class = FundSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FundDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fund.objects.all()
    serializer_class = FundSerializer

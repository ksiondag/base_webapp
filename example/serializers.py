from rest_framework import permissions, serializers

from example.models import Fund


class FundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = ["id", "name", "balance", "balance_date", "user_id"]

    user_id = serializers.ReadOnlyField()
    permission_classes = [permissions.IsAuthenticated]

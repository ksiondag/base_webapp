from django.http import JsonResponse

from example.api import fund_api


def crud_fund(request):
    with fund_api() as api:
        if request.method == "GET":
            response = api.get()
        elif request.method == "POST":
            import pdb

            pdb.set_trace()
            params = request.POST
            response = api.post(
                user=request.user,
                name=params["name"],
                balance=int(float(params["balance"]) * 1000),
            )

        return JsonResponse(response, safe=False)

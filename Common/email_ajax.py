from django.http import JsonResponse
from django.views.decorators.http import require_POST
from Common.forms import EmailListForm


@require_POST
def email_list_ajax(request):
    form = EmailListForm(request.POST)
    if form.is_valid():
        form.save()
        return JsonResponse({
            'status': 'success',
            'message': "You’ve been subscribed successfully!"
        })
    else:
        error_message = "There was an error with your submission."
        if 'email' in form.errors:
            error_message = form.errors['email'][0]  # Simple extraction

        return JsonResponse({
            'status': 'error',
            'message': error_message
        }, status=400)

from Common.forms import EmailListForm


def email_form_processor(request):
    return {'email_list_form': EmailListForm()}


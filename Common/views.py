from django.shortcuts import render, redirect
from django.db import IntegrityError
from Common.forms import EmailListForm
from django.utils import timezone
from datetime import datetime, time


# @ login_not_required
def error_404(request, exception):
    if request.method == "POST":
        email_form = EmailListForm(request.POST)
        if email_form.is_valid():
            try:
                email_form.save()
                return redirect(error_404)  # URL / function name
            except IntegrityError:
                email_form.add_error('email', 'This email is already subscribed.')

            context = {'email_list_form': email_form,}

            # If form has errors, render with this form (with errors)
            return render(request, 'errors/404.html', context)

    context = {}
    return render(request, 'errors/404.html', context)


# @ login_not_required
def error_500(request):
    if request.method == "POST":
        email_form = EmailListForm(request.POST)
        if email_form.is_valid():
            try:
                email_form.save()
                return redirect(error_500)  # URL / function name
            except IntegrityError:
                email_form.add_error('email', 'This email is already subscribed.')

            context = {'email_list_form': email_form,}

            # If form has errors, render with this form (with errors)
            return render(request, 'errors/500.html', context)

    context = {}
    return render(request, 'errors/500.html', context, status=500)


def plain_view(request):

    context = { }

    return render(request, 'common/plain.html', context)

# @ login_not_required
def home_view(request):

    if request.method == "POST":
        email_form = EmailListForm(request.POST)
        if email_form.is_valid():
            try:
                email_form.save()
                return redirect(home_view)  # URL / function name
            except IntegrityError:
                email_form.add_error('email', 'This email is already subscribed.')

            context = {'email_list_form': email_form,}

            # If form has errors, render with this form (with errors)
            return render(request, 'common/home.html', context)

    context = { }

    return render(request, 'common/home.html', context)

# @ login_not_required
def about_us_view(request):
    if request.method == "POST":
        email_form = EmailListForm(request.POST)
        if email_form.is_valid():
            try:
                email_form.save()
                return redirect(about_us_view)  # URL / function name
            except IntegrityError:
                email_form.add_error('email', 'This email is already subscribed.')

            context = {'email_list_form': email_form,}

            # If form has errors, render with this form (with errors)
            return render(request, 'common/about.html', context)

    # GET request or no POST data; no need to add email_list_form explicitly
    return render(request, 'common/about.html')



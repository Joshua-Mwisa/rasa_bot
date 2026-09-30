from django.urls import path
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings
from .email_ajax import email_list_ajax
from . import views



urlpatterns = [
    path('', views.plain_view, name='plain'),
    path('about', views.about_us_view, name='about'),

    # email ajax
    path('ajax/subscribe', email_list_ajax, name='email_list_ajax'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

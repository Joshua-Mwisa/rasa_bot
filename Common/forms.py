from django import forms
from .models import EmailList


class EmailListForm(forms.ModelForm):
    class Meta:
        model = EmailList
        fields = ('email',)

        widgets = {'email': forms.TextInput(attrs={'class': 'form-control',
                                                   'placeholder': 'Your email',
                                                   'style': 'border: 1px solid #000;'}), }

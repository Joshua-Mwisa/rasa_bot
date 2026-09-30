from django.db import models


class EmailList(models.Model):
    email = models.CharField(max_length=250, unique=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('pk', )

    def __str__(self):
        return self.email


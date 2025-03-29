from django.urls import path
from .views import process_requirement

urlpatterns = [
    path('process/', process_requirement, name="process-requirement"),
]

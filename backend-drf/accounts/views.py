from django.shortcuts import render
from . serializers import UserSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
# Create your views here.


class Register(generics.CreateAPIView):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []

# @api_view(['GET'])
# def get_current_user(request):
    
#     if not request.user.is_authenticated:
#         return Response({'username':'Anonymous'},status=401)
    
#     user = request.user
#     return Response({
#         'id':user.id,
#         'username':user.username
#     })

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser

@api_view(['GET'])
def current_user(request):
    if not request.user.is_authenticated:
        return Response({'username': 'Anonymous'}, status=401)

    user = request.user
    return Response({
        'id':user.id,
        'username': user.username,
        'email': user.email,
        # Add any other user details you need
    })
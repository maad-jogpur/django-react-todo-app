from django.shortcuts import render
from . models import Task
from . serializers import TaskSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

@api_view(['GET'])
def list_tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def post_tasks(request):
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def update_tasks(request,pk):
    if request.method == 'PUT':
        task = Task.objects.get(pk=pk)
        serializer = TaskSerializer(task,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
@api_view(['DELETE'])
def delete_tasks(request,pk):
    if request.method == 'DELETE':
        task = Task.objects.get(pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_tasks(request,pk):
    tasks = Task.objects.filter(user=pk)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)
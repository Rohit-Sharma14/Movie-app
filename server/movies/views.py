from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from movies.models import Movie
from movies.serializers import MovieSerializer
from rest_framework.decorators import api_view


@api_view(['GET','POST','DELETE'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()

        title = request.query_params.get('title',None)
        if title is not None:
            movies = movies.filter(title__icontains=title)

        movies_serializer = MovieSerializer(movies, many=True)
        return JsonResponse(movies_serializer.data, safe=False)

    elif request.method == 'POST':
        movie_data = JSONParser().parse(request)
        movie_serializer = MovieSerializer(data=movie_data)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return JsonResponse(movie_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Movie.objects.all().delete()
        return JsonResponse({'message': '{} all movies were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET','PUT','DELETE'])
def movie_detail(request,pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExists:
        return JsonResponse({'message':'Try different name'},status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        movie_serializer = MovieSerializer(movie) 
        return JsonResponse(movie_serializer.data) 

    elif request.method == 'PUT':
        movie_data = JSONParser().parse(request)
        movie_serializer = MovieSerializer(movie,data=movie_data)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return JsonResponse(movie_serializer.data)
        return JsonResponse(movie_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        movie.delete() 
        return JsonResponse({'message': 'Movie was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)  
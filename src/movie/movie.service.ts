import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
     private movies = [
            {id: 1, title: 'Movie 1', description: 'Description of Movie 1', genre: 'Action'},
            {id: 2, title: 'Movie 2', description: 'Description of Movie 2', genre: 'Comedy'},
            {id: 3, title: 'Movie 3', description: 'Description of Movie 3', genre: 'Action'},
        ];

    findAll(genre?: string) {
       

        if(genre) {
            return this.movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase())
        }


        return this.movies
    }


    create(dto: CreateMovieDto) {
        const {id, title, description, genre} = dto
        const newMovie = {id, title, description, genre}
        this.movies.push(newMovie)
        return {message: 'Movie created successfully', movies: this.movies}
    }

}

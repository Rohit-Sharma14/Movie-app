import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model'
import { MovieService } from 'src/app/services/movie.service'


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie: Movie = {
    title: '',
    description: '',
    year: '',
    like: 0
  };
  submitted = false;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  saveMovie(): void {
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      year: this.movie.year
    }

    this.movieService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error)
        }
      )
  }

  newMovie(): void {
    this.submitted = false;
    this.movie = {
      title: '',
      description: '',
      year: '',
      like: 0
    };
  }

}

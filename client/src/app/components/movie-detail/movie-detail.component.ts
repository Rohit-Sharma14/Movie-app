import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model'
import { MovieService } from 'src/app/services/movie.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  currentMovie: Movie = {
    title: '',
    description: '',
    year: '',
    like: 0
  };
  message = '';
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getMovie(this.route.snapshot.params.id)

  }

  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }

  updateMovie(): void {
    this.movieService.update(this.currentMovie.id, this.currentMovie)
      .subscribe(
        response => {
          console.log(response);
          alert('Movie updated sucesfully');
          this.message = response.message;
        },
        error => {
          console.log(error)
        }
      )
  }

  likeMovie(): void {
      if (this.currentMovie.like != null) {
        this.currentMovie.like++;
    }
    // console.log(this.currentMovie.like++)
    this.movieService.update(this.currentMovie.id, this.currentMovie).subscribe(
        response => {
            console.log(response);
            this.message = response.message;
        },
        error => {
            console.log(error)
        }
    )
    console.log(window.navigator.appName, window.navigator.appCodeName, window.navigator.product, window.navigator.userAgent)
    console.log(window.navigator)


    // let IExplorerAgent =
    //   window.navigator.userAgent.indexOf("MSIE") > -1 ||
    //   window.navigator.userAgent.indexOf("rv:") > -1;
    // console.log(IExplorerAgent)
    // let safariAgent =
    //   window.navigator.userAgent.indexOf("Safari") > -1;
    // console.log(safariAgent)
  }

  deleteMovie(): void {
    this.movieService.delete(this.currentMovie.id)
    .subscribe(
        response => {
        console.log(response);
        alert('Movie deleted successfully');
        this.router.navigate(['/movies'])
        },
        error => {
        console.log(error)
        }
    )
  }
}

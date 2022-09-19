export class MoviesComponent {

    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    addMovie(newMovie) {
        console.log("Adding new movie...", newMovie);
        this.moviesRepository.addMovie(newMovie);
        return 101;
    }

    searchMovies(duration, genres) {
        console.log("Searching movies...", duration, genres);
        return [];
    }
}
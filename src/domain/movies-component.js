export class MoviesComponent {

    addMovie(newMovie) {
        console.log("Adding new movie...", newMovie);
        return 101;
    }

    searchMovies(duration, genres) {
        console.log("Searching movies...", duration, genres);
        return [];
    }
}
export class MoviesRepository {

    constructor(moviesFile) {
        this.moviesFile = moviesFile;
        this.movies = [];
    }

    init() {
        //TODO init
    }

    getAllowedGenres() {
        return [];
    }

    addMovie(movie) {
        return 1;
    }
}
import { AppError, AppErrors } from "./errors.js";

export class MoviesComponent {

    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    addMovie(newMovie = {}) {
        this._validateNewMovie(newMovie);
        return this.moviesRepository.addMovie(newMovie);
    }

    _validateNewMovie(newMovie) {
        const errors = [];

        const validGenres = this.moviesRepository.getAllowedGenres();
        if (!this._areGenresValid(newMovie, validGenres)) {
            errors.push(AppErrors.invalidMovieGenres(validGenres));
        }


        if (errors.length > 0) {
            throw new AppError(errors);
        }
    }

    _areGenresValid(newMovie, validGenres) {
        try {
            const genres = newMovie.genres;
            const uniqueGenres = [...new Set(genres)];
            if (uniqueGenres.length != genres.length) {
                return false;
            }

            if (uniqueGenres.length == 0) {
                return false;
            }
            
            for (const g of uniqueGenres) {
                if (!validGenres.includes(g)) {
                    return false;
                }
            }

            return true;
        } catch (e) {
            return false;
        }
    }

    searchMovies(duration, genres) {
        console.log("Searching movies...", duration, genres);
        return [];
    }
}
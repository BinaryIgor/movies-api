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

        if (!this._isNonEmptyStringShorterThan(newMovie.title, 255)) {
            errors.push(AppErrors.invalidMovieTitle());
        }

        if (!this._isValidPositiveNumber(newMovie.year)) {
            errors.push(AppErrors.invalidMovieYear());
        }

        if (!this._isValidPositiveNumber(newMovie.runtime)) {
            errors.push(AppErrors.invalidMovieRuntime());
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


    _isNonEmptyStringShorterThan(string, maxLength) {
        return string
            && string instanceof String
            && string.trim().length > 0
            && string.length <= maxLength;
    }

    _isValidPositiveNumber(number) {
        try {
            const int = parseInt(number);
            return int != NaN && int > 0;
        } catch (e) {
            return false;
        }
    }

    searchMovies(duration, genres) {
        console.log("Searching movies...", duration, genres);
        return [];
    }
}
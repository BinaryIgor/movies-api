import { AppError, AppErrors } from "./errors.js";

const MAX_TITLE_LENGTH = 255;
const MAX_DIRECTOR_LENGTH = 255;

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

        if (!this._isNonEmptyStringShorterThan(newMovie.title, MAX_TITLE_LENGTH)) {
            errors.push(AppErrors.invalidMovieTitle());
        }

        if (!this._isValidPositiveNumber(newMovie.year)) {
            errors.push(AppErrors.invalidMovieYear());
        }

        if (!this._isValidPositiveNumber(newMovie.runtime)) {
            errors.push(AppErrors.invalidMovieRuntime());
        }

        if (!this._isNonEmptyStringShorterThan(newMovie.director, MAX_DIRECTOR_LENGTH)) {
            errors.push(AppErrors.invalidMovieDirector());
        }

        if (!this._isStringIfDefined(newMovie.actors)) {
            errors.push(AppErrors.invalidMovieActors());
        }

        if (!this._isStringIfDefined(newMovie.plot)) {
            errors.push(AppErrors.invalidMoviePlot());
        }

        if (!this._isStringIfDefined(newMovie.posterUrl)) {
            errors.push(AppErrors.invalidMoviePosterUrl());
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
            && typeof string === 'string'
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

    _isStringIfDefined(string) {
        if (string == undefined || string == null) {
            return true;
        }
        return typeof string === 'string';
    }

    searchMovies(duration, genres) {
        console.log("Searching movies...", duration, genres);
        return [];
    }
}
import { AppError, AppErrors } from "./errors.js";

const MAX_TITLE_LENGTH = 255;
const MAX_DIRECTOR_LENGTH = 255;

export class MoviesComponent {

    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    async addMovie(newMovie = {}) {
        await this._validateNewMovie(newMovie);
        return await this.moviesRepository.addMovie(newMovie);
    }

    async _validateNewMovie(newMovie) {
        const errors = [];

        const validGenres = await this.moviesRepository.getAllowedGenres();
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
        return this._isValidNumber(number) && parseInt(number) > 0;
    }

    _isValidNumber(number) {
        try {
            const int = parseInt(number);
            return !isNaN(int);
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

    async searchMovies(duration, genres) {
        const validDuration = this._validateDuration(duration);
        const validGenres = this._validateGenres(genres);

        if (!validDuration && !validGenres) {
            const movies = await this.moviesRepository.getAllMovies();
            return this._getRandomMovie(movies);
        }

        console.log("Searching movies...", validDuration, validGenres);
        const movies = await this.moviesRepository.getAllMovies();

        if (validDuration && !validGenres) {
            return this._findMatchingByDurationMovies(movies, validDuration);
        }

        console.log("ALL movies...", movies);
        return movies;
    }

    _validateDuration(duration) {
        if (!duration || !this._isValidNumber(duration)) {
            return null;
        }
        return parseInt(duration);
    }

    _validateGenres(genres) {
        if (!genres) {
            return genres;
        }
        try {
            genres.length;
            return genres;
        } catch (e) {
            return genres;
        }
    }

    _findMatchingByDurationMovies(movies, duration) {
        const minDuration = duration - 10;
        const maxDuration = duration + 10;

        const filteredMovies = movies.filter(m => {
            const runtime = parseInt(m.runtime);
            return runtime >= minDuration && runtime <= maxDuration;
        });

        return this._getRandomMovie(filteredMovies);
    }

    async _getRandomMovie(movies) {
        if (movies.length > 0) {
            return [movies[this._randomInt(movies.length)]];
        }
        return [];
    }

    _randomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
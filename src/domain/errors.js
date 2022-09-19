export class AppError extends Error {
    constructor(errors) {
        super(`There were some errors: ${errors.map(e => e.code)}`);
        this.errors = errors;
    }
};

class AppErrorData {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
};

export const AppErrors = {
    invalidMovieGenres(validGenres) {
        return new AppErrorData("INVALID_MOVIE_GENRES",
            `At least one movie genre is required. Genres must also be unique. Valid genres are: ${validGenres}`);
    },
    invalidMovieTitle() {
        return new AppErrorData("INVALID_MOVIE_TITLE",
            "Movie title needs to be not empty and have max 255 characters");
    },
    invalidMovieYear() {
        return new AppErrorData("INVALID_MOVIE_YEAR", "Year is required and it needs to be a positive integer");
    },
    invalidMovieRuntime() {
        return new AppErrorData("INVALID_MOVIE_RUNTIME", "Runtime is required and it needs to be a positive integer");
    },
    invalidMovieDirector() {
        return new AppErrorData("INVALID_MOVIE_DIRECTOR",
            "Movie needs to be not empty and have max 255 characters");
    },
    invalidMovieActors() {
        return new AppErrorData("INVALID_MOVIE_ACTORS", "Actors should be a string");
    },
    invalidMoviePlot() {
        return new AppErrorData("INVALID_MOVIE_PLOT", "Plot should be a string");
    },
    invalidPosterUrl() {
        return new AppErrorData("INVALID_MOVIE_POSTER", "Poster should be a string");
    },
    unknown() {
        return new AppErrorData("UNKNOWN_ERROR");
    }
};
export class AppError extends Error {
    constructor(errors) {
        super(`There were some errors..`);
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
    unknown() {
        return new AppErrorData("UNKNOWN_ERROR")
    }
};
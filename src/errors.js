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
    INVALID_MOVIE_GENRE: new AppErrorData("INVALID_MOVIE_GENRE",
        "Movie genre need to be on of the..."),
    UNKNOWN: new AppErrorData("UNKNOWN_ERROR")
};
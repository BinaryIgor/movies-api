import { expect } from "chai";
import { MoviesComponent } from "../src/domain/movies-component.js";
import { AppError, AppErrors } from "../src/domain/errors.js";


describe("Movies component tests", () => {

    let repository;
    let component;

    beforeEach(() => {
        repository = new FakeMoviesRepository();
        component = new MoviesComponent(repository);
    });

    it('addMovie given newMovie without genre throws proper AppException', () => {
        const newMovie = {};
        const allowedGenres = ['A', 'b'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            [AppErrors.invalidMovieGenres(allowedGenres)]);
    });

    it('addMovie given newMovie with invalid genres throws proper AppException', () => {
        const newMovie = {
            genres: ['a', 'b']
        };
        const allowedGenres = ['A'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            [AppErrors.invalidMovieGenres(allowedGenres)]);
    });

    it('addMovie given newMovie without genres throws proper AppException', () => {
        const newMovie = {
            genres: []
        };
        const allowedGenres = ['A'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            [AppErrors.invalidMovieGenres(allowedGenres)]);
    });

    it('addMovie given newMovie with duplicated genres throws proper AppException', () => {
        const newMovie = {
            genres: ['a', 'a', 'b', 'b', 'A']
        };
        const allowedGenres = ['A', 'B'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            [AppErrors.invalidMovieGenres(allowedGenres)]);
    });
})

function assertThrowsExpectedAppError(func, errors) {
    expect(func)
        .to.throw(AppError)
        .with.property('errors')
        .deep.equals(errors);
}

class FakeMoviesRepository {

    constructor() {
        this.allowedGenres = [];
    }

    getAllowedGenres() {
        return this.allowedGenres;
    }

    addMovie(movie) {
        return 1;
    }
}
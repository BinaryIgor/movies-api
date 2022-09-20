import { expect } from "chai";
import { MoviesComponent } from "../src/domain/movies-component.js";
import { AppError, AppErrors } from "../src/domain/errors.js";

const DEFAULT_ALLOWED_GENRES = ['First genre', 'second genre'];
const TOO_LONG_TITLE = "T".repeat(256);
const TOO_LONG_DIRECTOR = "D".repeat(256);

describe("Movies component tests", () => {

    let repository;
    let component;

    beforeEach(() => {
        repository = new FakeMoviesRepository();
        repository.allowedGenres = DEFAULT_ALLOWED_GENRES;

        component = new MoviesComponent(repository);
    });

    it('addMovie given newMovie without genres throws expected AppError', () => {
        const newMovie = buildNewMovie({ genres: [] });
        const allowedGenres = ['A', 'b'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            AppErrors.invalidMovieGenres(allowedGenres));
    });

    it('addMovie given newMovie with invalid genres throws expected AppError', () => {
        const newMovie = buildNewMovie({ genres: ['a', 'b'] });
        const allowedGenres = ['A'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            AppErrors.invalidMovieGenres(allowedGenres));
    });

    it('addMovie given newMovie with duplicated genres throws expected AppError', () => {
        const newMovie = buildNewMovie({ genres: ['a', 'a', 'b', 'b', 'A'] });
        const allowedGenres = ['A', 'B'];
        repository.allowedGenres = allowedGenres;

        assertThrowsExpectedAppError(() => component.addMovie(newMovie),
            AppErrors.invalidMovieGenres(allowedGenres));
    });

    [null, '', TOO_LONG_TITLE].forEach(t =>
        it(`addMovie given newMovie with invalid ${t} title throws expected AppError`, () => {
            const newMovie = buildNewMovie({ title: t });
            assertThrowsExpectedAppError(() => component.addMovie(newMovie),
                AppErrors.invalidMovieTitle());
        }));
})

function assertThrowsExpectedAppError(func, ...errors) {
    expect(func)
        .to.throw(AppError)
        .with.property('errors')
        .deep.equals(errors);
}


function buildNewMovie({ genres = DEFAULT_ALLOWED_GENRES,
    title = "some title",
    year = 2000,
    runtime = 100,
    director = "Some Briliant Guy",
    actors = "Gladiator" } = {}) {
    return {
        genres: genres,
        title: title,
        year: year,
        runtime: runtime,
        director: director,
        actors: actors
    };
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
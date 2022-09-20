import { expect } from "chai";
import { MoviesComponent } from "../src/domain/movies-component.js";
import { AppError, AppErrors } from "../src/domain/errors.js";

const DEFAULT_ALLOWED_GENRES = ['First genre', 'second genre'];
const TOO_LONG_TITLE = "T".repeat(256);
const TOO_LONG_DIRECTOR = "D".repeat(256);

let repository;
let component;

describe("Movies component tests", () => {

    beforeEach(() => {
        repository = new FakeMoviesRepository();
        repository.allowedGenres = DEFAULT_ALLOWED_GENRES;

        component = new MoviesComponent(repository);
    });

    it('addMovie, given newMovie without genres, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ genres: [] });
        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMovieGenres(DEFAULT_ALLOWED_GENRES));
    });

    it('addMovie, given newMovie with invalid genres, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ genres: ['a', 'b'] });
        const allowedGenres = ['A'];
        repository.allowedGenres = allowedGenres;

        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMovieGenres(allowedGenres));
    });

    it('addMovie, given newMovie with duplicated genres, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ genres: ['a', 'a', 'b', 'b', 'A'] });
        const allowedGenres = ['A', 'B'];
        repository.allowedGenres = allowedGenres;

        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMovieGenres(allowedGenres));
    });

    [null, '', 22, TOO_LONG_TITLE].forEach(t =>
        it(`addMovie, given newMovie with invalid ${t} title, throws expected AppError`, async () => {
            const newMovie = buildNewMovie({ title: t });
            assertAddMovieThrowsExpectedAppError(newMovie,
                AppErrors.invalidMovieTitle());
        }));

    ['A', -1, null].forEach(y => {
        it(`addMovie, given newMovie with invalid ${y} year, throws expected AppError`, async () => {
            const newMovie = buildNewMovie({ year: y });
            assertAddMovieThrowsExpectedAppError(newMovie,
                AppErrors.invalidMovieYear());
        });
    });

    ['some runtime', -99, null].forEach(r => {
        it(`addMovie, given newMovie with invalid ${r} runtime, throws expected AppError`, async () => {
            const newMovie = buildNewMovie({ runtime: r });
            assertAddMovieThrowsExpectedAppError(newMovie,
                AppErrors.invalidMovieRuntime());
        });
    });

    [null, '', 1, TOO_LONG_DIRECTOR].forEach(d => {
        it(`addMovie, given newMovie with invalid ${d} director, throws expected AppError`, async () => {
            const newMovie = buildNewMovie({ director: d });
            assertAddMovieThrowsExpectedAppError(newMovie,
                AppErrors.invalidMovieDirector());
        });
    });

    it('addMovie, given newMovie with invalid actors, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ actors: 123 });
        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMovieActors());
    });

    it('addMovie, given newMovie with invalid plot, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ plot: 88 });
        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMoviePlot());
    });

    it('addMovie, given newMovie with invalid posterUrl, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ posterUrl: 101 });
        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMoviePosterUrl());
    });

    it('addMovie, given newMovie with various invalid fields, throws expected AppError', async () => {
        const newMovie = buildNewMovie({ genres: ['A'], title: 22, year: -1, posterUrl: 202 });

        assertAddMovieThrowsExpectedAppError(newMovie,
            AppErrors.invalidMovieGenres(DEFAULT_ALLOWED_GENRES),
            AppErrors.invalidMovieTitle(),
            AppErrors.invalidMovieYear(),
            AppErrors.invalidMoviePosterUrl());
    });

    it('addMovie, given valid newMovie with all fields, adds it to repository and returns id', async () => {
        const newMovie = buildNewMovie();
        const newMovieId = 99;

        repository.nextMovieId = newMovieId;

        expect(await component.addMovie(newMovie)).to.eq(newMovieId);
        expect(repository.addedMovie).to.deep.equal(newMovie);
    });

    it('addMovie, given valid newMovie without optional fields, adds it to repository and returns id', async () => {
        const newMovie = buildNewMovie();
        newMovie.actors = undefined;
        newMovie.plot = undefined;
        newMovie.posterUrl = undefined;

        const newMovieId = 101;

        repository.nextMovieId = newMovieId;

        expect(await component.addMovie(newMovie)).to.eq(newMovieId);
        expect(repository.addedMovie).to.deep.equal(newMovie);
    });
})

async function assertAddMovieThrowsExpectedAppError(newMovie, ...errors) {
    expect(async () => await component.addMovie(newMovie))
        .to.throw(AppError)
        .with.property('errors')
        .deep.equals(errors);
}


function buildNewMovie({ genres = DEFAULT_ALLOWED_GENRES,
    title = "some title",
    year = 2000,
    runtime = 100,
    director = "Some Briliant Guy",
    actors = "Gladiator",
    plot = "some plot",
    posterUrl = "some url" } = {}) {
    return {
        genres: genres,
        title: title,
        year: year,
        runtime: runtime,
        director: director,
        actors: actors,
        plot: plot,
        posterUrl: posterUrl
    };
}

class FakeMoviesRepository {

    constructor() {
        this.allowedGenres = [];
        this.addedMovie = null;
        this.nextMovieId = 1;
    }

    getAllowedGenres() {
        return this.allowedGenres;
    }

    addMovie(movie) {
        this.addedMovie = movie;
        return this.nextMovieId;
    }
}
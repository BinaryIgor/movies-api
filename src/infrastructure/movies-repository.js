import fs from "fs";

export class MoviesRepository {

    constructor(moviesFile) {
        this.moviesFile = moviesFile;
    }

    async getAllowedGenres() {
        return await this._loadMoviesDb().genres;
    }

    async addMovie(movie) {
        const db = await this._loadMoviesDb();
        const nextId = await this._nextMovieId(db.movies);

        movie.id = nextId;
        await this._saveNewMovie(movie);

        return nextId;
    }

    _nextMovieId(movies) {
        let nextId;
        if (movies.length > 0) {
            nextId = movies[movies.length - 1];
        } else {
            nextId = 1;
        }
        return nextId;
    }

    async _saveNewMovie(db, newMovie) {
        db.movies.push(newMovie);
        await fs.promises.writeFile(this.moviesFile, JSON.stringify(db));
    }

    async _loadMoviesDb() {
        const dbJson = await fs.promises.readFile(this.moviesFile, 'utf8');
        return JSON.parse(dbJson);
    }

    async getAllMovies() {
        const db = await this._loadMoviesDb();
        return db.movies;
    }
}
import fs from "fs";

export class MoviesRepository {

    constructor(moviesFile) {
        this.moviesFile = moviesFile;
        this.movies = [];
    }

    async getAllowedGenres() {
        return await this._loadMoviesDb().genres;
    }

    async addMovie(movie) {
        return 1;
    }

    async _loadMoviesDb() {
        console.log("Movies file...", this.moviesFile);
        const dbJson = await fs.promises.readFile(this.moviesFile, 'utf8');
        return JSON.parse(dbJson);
    }

    async getAllMovies() {
        const db = await this._loadMoviesDb();
        return db.movies;
    }
}
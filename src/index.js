import express from "express";
import { ApiResponse } from "./api-response.js";
import { handleError } from "./errors-handler.js";
import { MoviesRepository } from "./infrastructure/movies-repository.js";
import { MoviesComponent } from "./domain/movies-component.js";

const app = express();
const port = process.env.PORT || 5050;
const moviesFile = process.env.MOVIES_FILE || "../data/db.json";

const moviesRepository = new MoviesRepository(moviesFile);
const moviesComponent = new MoviesComponent(moviesRepository);

app.use(express.json());

app.post("/movies", async (req, res, next) => {
    try {
        const movie = req.body;
        const movieId = await moviesComponent.addMovie(movie);

        res.status(201)
            .json(ApiResponse.success(movieId));
    } catch (e) {
        next(e);
    }
});

app.get("/movies", async (req, res, next) => {
    try {
        const duration = req.query.duration;
        const genres = req.query.genres;

        const movies = await moviesComponent.searchMovies(duration, genres);

        res.status(200)
            .json(ApiResponse.success(movies));
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    console.error("Handling error...", err);
    const statusResponse = handleError(err);

    res.status(statusResponse.status)
        .json(statusResponse.response);
});


app.listen(port, () => console.log(`Movies api has started on ${port} port!`));
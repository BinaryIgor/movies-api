import express from "express";
import { Response } from "./response.js";
import * as errors from "./errors.js";
import { handleError } from "./errors-handler.js";

const app = express();
const port = process.env.PORT | 5050;

app.use(express.json());

app.get("/", (req, res) => {
    throw new errors.AppError([errors.AppErrors.INVALID_MOVIE_GENRE]);
    const response = Response.success({
        "id": 1,
        "createdAt": Date.now()
    });
    res.json(response);
});

app.use((err, req, res, next) => {
    console.error("Handling error...", err);
    
    const statusResponse = handleError(err);

    res.status(statusResponse.status)
        .json(statusResponse.response);
});


app.listen(port, () => console.log(`Movies api has started on ${port} port!`));
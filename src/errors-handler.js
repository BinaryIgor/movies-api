import { AppError, AppErrors } from "./domain/errors.js";
import { Response } from "./response.js";

export function handleError(error) {
    if (error instanceof AppError) {
        return {
            status: 400,
            response: Response.failure(error.errors) 
        };
    }
    return {
        status: 500,
        response: Response.failure([AppErrors.unknown])
    };
}
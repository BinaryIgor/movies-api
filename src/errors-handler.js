import { AppError, AppErrors } from "./domain/errors.js";
import { ApiResponse } from "./api-response.js";

export function handleError(error) {
    if (error instanceof AppError) {
        return {
            status: 400,
            response: ApiResponse.failure(error.errors) 
        };
    }
    return {
        status: 500,
        response: ApiResponse.failure([AppErrors.unknown])
    };
}
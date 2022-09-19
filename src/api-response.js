export class ApiResponse {
    constructor(success, data, errors) {
        this.success = success;
        this.data = data;
        this.errors = errors;
    }

    static success(data = {}) {
        return new ApiResponse(true, data, []);
    }

    static failure(errors) {
        return new ApiResponse(false, null, errors);
    }
}
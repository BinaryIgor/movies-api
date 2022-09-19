export class Response {
    constructor(success, data, errors) {
        this.success = success;
        this.data = data;
        this.errors = errors;
    }

    static success(data) {
        return new Response(true, data, []);
    }

    static failure(errors) {
        return new Response(false, null, errors);
    }
}
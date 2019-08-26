'use strict'
class APIResponse {
    constructor(ok, data = null, message = null) {
        this.ok = ok;
        this.data = data;
        this.message = message;
    }

    static ok(data = null, message = null) {
        return new APIResponse(true, data, message);
    }

    static error(data = null, message = null) {
        return new APIResponse(false, data, message);
    }
}

module.exports = APIResponse;
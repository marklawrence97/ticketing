import {CustomError} from "./custom-error";

export class badRequestError extends CustomError {
    statusCode = 400;

    constructor() {
        super();

        Object.setPrototypeOf(this, CustomError.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: ""
        }];
    }

}
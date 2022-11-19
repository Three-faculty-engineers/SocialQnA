import ApplicationError from "./application.error";
import { httpErrorTypes } from "./types.error"

export function createError(/* error */) { 
    return new ApplicationError(httpErrorTypes.INTERNAL_SERVER_ERROR);
}
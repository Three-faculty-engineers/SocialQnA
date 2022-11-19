import { NextFunction } from "express";
import ApplicationError from "../utils/error/application.error";
import { createError } from "../utils/error/factory.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { formatError, sendResponse } from "../utils/response";


export function errorHandler(err: any, req: any, res: any, next: NextFunction) {
    if (err instanceof ApplicationError) {
        const code = err.statusCode || 500
        return res.status(code).json(formatError(err))
    }
    
    if (err instanceof Error) {
        console.log(err);
        const newError = createError();
        const code = newError.statusCode || 500
        return res.status(code).json(formatError(newError))
    }
    
    const unknownError = new ApplicationError(httpErrorTypes.UNKNOWN_ERROR);
    
    return sendResponse(res, unknownError);
}
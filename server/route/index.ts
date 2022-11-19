import { Express, NextFunction } from "express";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import * as ErrorController from "../controller/error.controller"
import { sendResponse } from "../utils/response";

export default function (app: Express) { 
    app.use("/desi", (req, res, next) => {
        sendResponse(res, {message: "Dobar sam"});
    })
    app.use((req, res, next) => {
        next(new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND));
    });
    app.use(ErrorController.errorHandler); //da se rute ne pozivaju u kontroleru vec zasebno odvojeno.otprilike
}
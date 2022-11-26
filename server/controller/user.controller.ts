import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";
import { UserService } from "../service/user.service";
import { sendResponse } from "../utils/response";

const userService = new UserService();

export class UserController {
    
    async create(req: Request, res: Response, next: NextFunction)
    {
        try {
            const user = req.body as User;

            return sendResponse(res, await userService.create(user));
        } catch (error) {
            next(error);
        }
    }
}
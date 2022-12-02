import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";
import { UserService } from "../service/user.service";
import { compareValues } from "../utils/crypt";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { signToken } from "../utils/jwt";
import { sendResponse } from "../utils/response";
import { loginSchema, registerSchema, updateUserSchema } from "../utils/validation";

const userService = new UserService();

export class UserController {
    
    async create(req: Request, res: Response, next: NextFunction)
    {
        try {
            const user = req.body as User;

            await registerSchema.parseAsync(user);

            const payload = await userService.create(user);

            return sendResponse(res, payload);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction)
    {
        try {
            await loginSchema.parseAsync(req.body);
            const user = req.body as User;

            const userFromDB = (await userService.get(user.email))[0] as User;

            if(!userFromDB) {
                throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);
            }

            if(!(await compareValues(user.password, userFromDB.password))) {
                throw new ApplicationError(httpErrorTypes.UNAUTHORIZED);
            }

            const token = signToken(userFromDB, "1d");

            return sendResponse(res, token);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;
            if(!id) throw new ApplicationError({...httpErrorTypes.BAD_REQUEST, message: "ID is required"});

            await userService.delete(id);

            return sendResponse(res, {message: "User deleted!"});
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction)
    {
        try {
            const user = req.body as User;

            user.id = req.params.id;

            await updateUserSchema.parseAsync(user);

            const result = await userService.update(user);

            return sendResponse(res, result);
        } catch (error) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = req.params.id;

            const result = await userService.get(id);
            
            if(!result.length) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);

            return sendResponse(res, result[0]);
        } catch (error) {
            next(error);
        }
    }
}
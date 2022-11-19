import { IModel } from "./IModel";

export class User implements IModel
{
    id: number;
    username: string;
    password: string;
    constructor(private id: number, username: string, password: string)
    {
        this.id = id;
        this.username = username;
        this.password = password;
    }

}
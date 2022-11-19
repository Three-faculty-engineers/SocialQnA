import { IModel } from "./IModel";

export class Community implements IModel
{
    id: number;
    title: string;

    constructor(id: number, title: string)
    {
        this.id = id;
        this.title = title;
    }
}
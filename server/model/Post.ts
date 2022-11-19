import { IModel } from "./IModel";

export class Post implements IModel
{
    id: number;
    text: string;
    likesCount: number;
    timeStamp: Date;

    constructor(id: number, text: string, likesCount: number, timeStamp: Date)
    {
        this.id = id;
        this.text = text;
        this.likesCount = likesCount;
        this.timeStamp = timeStamp;
    }
}
import { IModel } from "./IModel";
import { Post } from "./Post";
import { User } from "./User";

export interface Comment extends IModel
{
    text: string;
    timeStamp: Date;
    post: Post;
    user: User;
    likes?: User[];
    dislikes?: User[];
}
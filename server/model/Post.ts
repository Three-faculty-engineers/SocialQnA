import { Comment } from "./Comment";
import { Community } from "./Community";
import { IModel } from "./IModel";
import { User } from "./User";

export interface Post extends IModel
{
    title: string;
    text: string;
    timeStamp: Date;
    author: User;
    community: Community;
    userLikes?: User[];
    userDislikes?: User[];  
    comments?: Comment[];
}
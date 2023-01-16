
export interface CommentDto
{
    id: string;
    text: string;
    timeStamp: Date;
    userID: string;
    postID: string;    
    likes?: number;
    dislikes?: number;  
}
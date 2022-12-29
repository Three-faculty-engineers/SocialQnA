import { CreatePostDto, UpdatePostDto } from "../dto/post.dto";
import { Post } from "../model/Post";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { BaseService } from "./base.service";

export class PostService extends BaseService {
    async create(post: CreatePostDto)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH 
            (n: Users {id: $userID}), 
            (c: Communities {id: $communityID})
        CREATE (n) -[r: posted]-> 
        (p: Posts {id:randomUUID(), title: $title, text: $text, timeStamp: dateTime()}) 
        <-[h: has_post]- (c)
        RETURN p;`

        const result = this.getRecordDataFromNeo(await session.run(query, post));

        if(!result.length) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);

        session.close();

        return result;
    }

    async get(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n: Posts) WHERE n.id = $id RETURN n`

        const result = this.getRecordDataFromNeo(await session.run(query, {id}))

        session.close();

        return result;
    }

    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n: Posts {id: $id}) DETACH DELETE n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async update(post: UpdatePostDto)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n: Posts {id: $id})
        CREATE (n) - [eh:edit_history {editedAt: dateTime(), value: n.text}] -> (n) 
        SET ${Object.getOwnPropertyNames(post).map(prop => `n.${prop} = $${prop}`)}
        RETURN n
        `

        const result = this.getRecordDataFromNeo(await session.run(query, post));

        session.close();

        return result;
    }

    async getByUserID(userID: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (u: Users {id: $userID}) -[:posted]-> (p: Posts) RETURN p`

        const result = this.getRecordDataFromNeo(await session.run(query, {userID}));

        session.close();

        return result as Post[];
    }

    async getByCommunityID(communityID: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (c: Communities {id: $communityID}) -[:has]-> (p: Posts) RETURN p`

        const result = this.getRecordDataFromNeo(await session.run(query, {communityID}));

        session.close();

        return result as Post[];
    }

    async incrementInSortedSet(id: string)
    {
        await this.redisDriver.connect();

        const result = await this.redisDriver.zIncrBy("post:visit", 1, id);

        await this.redisDriver.disconnect();

        return result;
    }
}
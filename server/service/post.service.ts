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

        const query = `
        MATCH (c: Communities) -[:has_post]-> (n: Posts {id: $id}) <-[:posted]- (u: Users)
        OPTIONAL MATCH (n: Posts {id: $id}) <-[l:likes]- (ul:Users)
        OPTIONAL MATCH (n: Posts {id: $id}) <-[d:dislikes]- (ud:Users) 
        WITH n, count(d) as dislikeCount, count(l) as likeCount, u, collect(ul.id) as userLikes, collect(ud.id) as userDislikes, c
        RETURN n{.*, likes: likeCount, dislikes: dislikeCount, user: u{.username, .id}, userLikes: userLikes, userDislikes: userDislikes, community: c{.id, .title}}`

        let result = (await session.run(query, {id})).records;

        if(result.length !== 1) throw new ApplicationError(httpErrorTypes.RESOURCE_NOT_FOUND);
        
        result = result[0]["_fields"][0];

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
        CREATE (n) - [eh:edit_history {editedAt: dateTime(), title: n.title, text: n.text}] -> (n) 
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

        const query = `
        MATCH (u: Users {id: $userID}) -[:posted]-> (p: Posts) <-[:has_post]- (c: Communities)
        OPTIONAL MATCH (p) <-[l:likes]- (ul:Users)
        OPTIONAL MATCH (p) <-[d:dislikes]- (ud:Users)
        WITH p, count(d) as dislikeCount, count(l) as likeCount, u, collect(ul.id) as userLikes, collect(ud.id) as userDislikes, c
        RETURN p{.*, likes: likeCount, dislikes: dislikeCount, user: u{.username, .id}, userLikes: userLikes, userDislikes: userDislikes, community: c{.id, .title}}`

        const result = (await session.run(query, {userID})).records.map(record => record["_fields"][0]);

        session.close();

        return result;
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
        if(!this.redisDriver.isOpen)
        {
            await this.redisDriver.connect();
        }

        const result = await this.redisDriver.zIncrBy("post:visit", 1, id);

        if(this.redisDriver.isOpen)
        {
            await this.redisDriver.disconnect();
        }

        return result;
    }

    async getEditHistory(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (p: Posts {id: $id}) -[r:edit_history]-> (p: Posts {id: $id}) RETURN r`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async getByFollowingUsers(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH (u: Users {id: $id}) 
        -[:follows]-> (uf: Users) 
        -[:posted]-> (p: Posts) <-[:has_post]- (c: Communities)
        OPTIONAL MATCH (p) <-[l:likes]- (ul:Users)
        OPTIONAL MATCH (p) <-[d:dislikes]- (ud:Users)
        WITH p, count(d) as dislikeCount, count(l) as likeCount, uf, collect(ul.id) as userLikes, collect(ud.id) as userDislikes, c
        RETURN p{.*, likes: likeCount, dislikes: dislikeCount, user: uf{.username, .id}, userLikes: userLikes, userDislikes: userDislikes, community: c{.id, .title}}`;

        const result = (await session.run(query, {id})).records.map(record => record["_fields"][0]);

        session.close();

        return result;
    }

    async getTop10()
    {
        if(!this.redisDriver.isOpen)
        {
            await this.redisDriver.connect();
        }

        const top10IDs = await this.redisDriver.zRange("post:visit", 0 , 9, {REV: true});

        const top10 = await this.redisDriver.hmGet("posts", top10IDs);
        
        if(this.redisDriver.isOpen)
        {
            await this.redisDriver.disconnect();
        }


        return top10.filter(post => !!post).map(post => JSON.parse(post)).map(post => ({id: post.id, title: post.title}));
    }

    async setInRedis(post: any)
    {
        if(!this.redisDriver.isOpen)
        {
            await this.redisDriver.connect();
        }

        await this.redisDriver.hSet("posts", post.id, JSON.stringify(post));

        if(this.redisDriver.isOpen)
        {
            await this.redisDriver.disconnect();
        }
    }

    async getFromRedis(id: string)
    {
        if(!this.redisDriver.isOpen)
        {
            await this.redisDriver.connect();
        }

        const result = await this.redisDriver.hGet("posts", id);

        if(this.redisDriver.isOpen)
        {
            await this.redisDriver.disconnect();
        }

        return result ? JSON.parse(result) : null;
    }
}
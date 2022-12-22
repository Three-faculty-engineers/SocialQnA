import { UserFollowCommunityDto, UserFollowUserDto, UserLikeCommentDto, UserLikePostDto } from "../dto/user.dto";
import { User } from "../model/User";
import { hashValue } from "../utils/crypt";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { BaseService } from "./base.service";

export class UserService extends BaseService {
    async create(user: User)
    {
        const session = this.neo4jDriver.session();

        user.password = await hashValue(user.password);

        const query = `CREATE (n:Users {id:randomUUID(), username:$username, email:$email, password:$password}) RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, user));

        if(!result.length) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);

        session.close();

        return result;
    }

    async get(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users) WHERE n.id = $id RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, { id }));

        session.close();

        return result;
    }

    async getFromEmail(email: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users) WHERE n.email = $email RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, { email }));

        session.close();

        return result;
    }

    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users {id: $id}) DELETE n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async update(user: User)
    {
        const session = this.neo4jDriver.session();

        if(user.password) {
            user.password = await hashValue(user.password);
        }

        const query = `MATCH (n: Users {id: $id})
        SET ${Object.getOwnPropertyNames(user).map(prop => `n.${prop} = $${prop}`)}
        RETURN n
        `
        const result = this.getRecordDataFromNeo(await session.run(query, user));

        session.close();

        return result;
    }

    async likePost(payload: UserLikePostDto)
    {
        const session = this.neo4jDriver.session();

        // const query = `
        // MATCH
        //     (u: Users),
        //     (p: Posts)
        // WHERE u.id = $userID AND p.id = $postID
        // CREATE (u)-[r:like]->(ulp: UserLikePost{id: randomUUID(), createdAt: dateTime()})<-[l:like]-(p)
        // RETURN type(r)
        // `
        const query = `
        MATCH
            (u: Users),
            (p: Posts)
        WHERE u.id = $userID AND p.id = $postID
        CREATE (u)-[r:likes {createdAt: dateTime()}]->(p)
        RETURN type(r)
        `
        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async dislikePost(payload: UserLikePostDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (p: Posts)
        WHERE u.id = $userID AND p.id = $postID
        CREATE (u)-[r:dislikes {createdAt: dateTime()}]->(p)
        RETURN type(r)
        `
        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async likeComment(payload: UserLikeCommentDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (c: Comments)
        WHERE u.id = $userID AND c.id = $commentID
        CREATE (u)-[r:likes {createdAt: dateTime()}]->(c)
        RETURN type(r)
        `
        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async dislikeComment(payload: UserLikeCommentDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (c: Comments)
        WHERE u.id = $userID AND c.id = $commentID
        CREATE (u)-[r:dislikes {createdAt: dateTime()}]->(c)
        RETURN type(r)
        `
        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async followCommunity(payload: UserFollowCommunityDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (c: Communities)
        WHERE u.id = $userID AND c.id = $communityID
        CREATE (u)-[r:follows {createdAt: dateTime()}]->(c)
        RETURN type(r)
        `
        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }

    async followUser(payload: UserFollowUserDto)
    {
        const session = this.neo4jDriver.session();

        const query = `
        MATCH
            (u: Users),
            (uf: Users)
        WHERE u.id = $userFollowID AND uf.id = $userFollowingID
        CREATE (u)-[r:follows {createdAt: dateTime()}]->(uf)
        RETURN type(r)
        `
        const result = this.getRecordDataFromNeo(await session.run(query, payload));

        session.close();

        return result;
    }
}
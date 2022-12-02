import { Post } from "../model/Post";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { BaseService } from "./base.service";

export class PostService extends BaseService {
    async create(post: Post)
    {
        const session = this.neo4jDriver.session();

        const query = `CREATE (n:Posts {id:randomUUID(), title: $title, text: $text, timeStamp: dateTime()}) RETURN n`;

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

        const query = `MATCH (n: Posts {id: $id}) DELETE n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async update(post: Post)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n: Posts {id: $id})
        SET ${Object.getOwnPropertyNames(post).map(prop => `n.${prop} = $${prop}`)}
        RETURN n
        `

        const result = this.getRecordDataFromNeo(await session.run(query, post));

        session.close();

        return result;
    }
}
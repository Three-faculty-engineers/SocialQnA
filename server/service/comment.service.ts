import { Graph } from "redis";
import { BaseService } from "./base.service";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/comment.dto";

export class CommentService extends BaseService
{

    async get(id: string)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `MATCH (n)
        WHERE n.id = $id
        RETURN n
        `;
        
        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }

    async create(com:CreateCommentDTO)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `
        MATCH
        (u:USER {id: $userID}),
        (p:POST {id: $postID})
        MERGE(c:COMMENT {id: randomUUID(), text: $text, timeStamp: dateTime()}) 
        MERGE (u)-[:USER_HAS_COMMENT]->(c)    
        MERGE (c)-[:COMMENT_HAS_USER]->(u)
        MERGE (c)-[:COMMENT_HAS_POST]->(p)
        MERGE (p)-[:POST_HAS_COMMENT]->(c)
        RETURN c
        `; //Veze su napravljenje u oba smera. Ako bespotrebno usloznjava podatke, onda jedan smer.(za kasnije)
        const result = this.getRecordDataFromNeo(await session.run(query, com));

        session.close();

        return result;
    }


    async update(comment: UpdateCommentDTO)
    {
        const session = this.neo4jDriver.session();

        const query = 
        `MATCH (n: COMMENT {id: $id})
        SET n.text = $text
        RETURN n
        `
        //${Object.getOwnPropertyNames(comment).map(prop => `n.${prop} = $${prop}`)}
        const result = this.getRecordDataFromNeo(await session.run(query, comment));

        session.close();

        return result;
    }



    async delete(id: string)
    {
        const session = this.neo4jDriver.session();

        const query =
        `
        MATCH (n)
        WHERE n.id = $id
        DETACH DELETE n
        RETURN n
        `;

        const result = this.getRecordDataFromNeo(await session.run(query, {id}));

        session.close();

        return result;
    }
}
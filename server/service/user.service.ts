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

        const query = `CREATE (n:Users {username:$username, email:$email, password:$password}) RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, user));

        if(!result.length) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);

        session.close();

        return result;
    }

    async get(email: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users) WHERE n.email =~ $email RETURN n`;

        const result = this.getRecordDataFromNeo(await session.run(query, { email }));

        session.close();

        return result;
    }

    async delete(email: string)
    {
        const session = this.neo4jDriver.session();

        const query = `MATCH (n:Users {email: $email}) DELETE n`;

        const result = this.getRecordDataFromNeo(await session.run(query, {email}));

        session.close();

        return result;
    }

    async update(user: User)
    {
        const session = this.neo4jDriver.session();

        if(user.password) {
            user.password = await hashValue(user.password);
        }

        const query = `MATCH (n: Users {email: $email})
        SET ${Object.getOwnPropertyNames(user).map(prop => `n.${prop} = $${prop}`)}
        RETURN n
        `
        const result = this.getRecordDataFromNeo(await session.run(query, user));

        session.close();

        return result;
    }
}
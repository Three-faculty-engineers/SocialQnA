import { User } from "../model/User";
import ApplicationError from "../utils/error/application.error";
import { httpErrorTypes } from "../utils/error/types.error";
import { BaseService } from "./base.service";

export class UserService extends BaseService {

    async create(user: User)
    {
        const session = this.neo4jDriver.session();

        const query = `CREATE (n:Users {username:$username, password:$password}) RETURN n`;

        const result = (await session.run(query, user)).records;

        if(!result) throw new ApplicationError(httpErrorTypes.BAD_REQUEST);

        session.close();

        return result;
    }
}
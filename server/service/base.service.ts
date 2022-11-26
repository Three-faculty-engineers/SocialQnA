import { Driver } from "neo4j-driver";
import { RedisClientType } from "redis";
import { neo4jDB, redisDB } from "../db";

export class BaseService {
    neo4jDriver: Driver;
    redisDriver: RedisClientType;

    constructor()
    {
        this.neo4jDriver = neo4jDB.driver;
        this.redisDriver = redisDB.client;
    }
}
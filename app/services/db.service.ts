import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { PostDb } from './db/post.db';
import { CategoryDb } from './db/category.db';

export interface DbServiceConfig {
    connectionString: string;
    mongodbOptions: MongoClientOptions;
    databaseName: string;
    postCollection: string;
    categoryCollection: string;
}

class DbServiceClass {
    public name = 'dbService';

    private _config: DbServiceConfig;
    private _client: MongoClient;
    private _db: Db;

    constructor(config: DbServiceConfig) {
        this._config = config;
        this._client = new MongoClient(config.connectionString, config.mongodbOptions);
        this._db = this._client.db(config.databaseName);
    }

    async connect() {
        try {
            console.log('[DbService] Connecting to mongo DB');
            await this._client.connect();
        } catch (error) {
            console.error('[DbService] Unable to connect to mongodb');
            console.error(error);
            throw error;
        }
    }

    async close() {
        if (this._client) {
            return this._client.close();
        }
    }

    get post() {
        return new PostDb(this._db, this._config.postCollection);
    }

    get category() {
        return new CategoryDb(this._db, this._config.categoryCollection);
    }
}

const db = new DbServiceClass({
    connectionString: process.env.DB_CONNECTION_STRING || '',
    databaseName: 'keep-nothing',
    postCollection: 'posts',
    categoryCollection: 'categories',
    mongodbOptions: {}
});

export const DbService = db;
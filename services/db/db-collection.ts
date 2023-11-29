import { Collection, Db, Document } from 'mongodb';

export abstract class DbCollection<T extends Document> {
    protected collection: Collection<T>;

    constructor(client: Db, collectionName: string) {
        this.collection = client.collection<T>(collectionName);
    }
}
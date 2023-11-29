import { Filter, ObjectId } from 'mongodb';
import { DbCollection } from './db-collection';
import { PostDto } from '../../model/post.model';

export class PostDb extends DbCollection<PostDto> {
    async search(category?: string, postIds?: string, limit: number = 999) {
        const filter: Filter<PostDto> = {};

        const _postIds = postIds ? postIds.split(',') : [];
        if (_postIds.length > 0) {
            filter._id = {
                $in: _postIds.map(id => new ObjectId(id))
            }
        }

        if (category) {
            filter.category = category;
        }

        try {
            const posts = await this.collection.find(filter).sort({ _id: -1 }).limit(limit).toArray();
            return posts;
        } catch (error) {
            console.log(error);
        }

        return [];
    }

    async create(data: PostDto) {
        const post: PostDto = {
            ...data,
            createdDate: new Date().toString()
        };

        const insertResult = await this.collection.insertOne(post);
        return insertResult.insertedId;
    }

    async byId(postId: string) {
        try {
            return await this.collection.findOne({ _id: new ObjectId(postId) });
        } catch (error) {
            return null;
        }
    }
}
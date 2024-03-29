import { Filter, ObjectId } from 'mongodb';
import { DbCollection } from './db-collection';
import { PostDto } from '../../model/post.model';

export class PostDb extends DbCollection<PostDto> {
    async search(category?: string, postIds?: string, limit: number = 999, includeExpired: boolean = false) {
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

        if (!includeExpired) {
            filter.isExpired = { $ne: true };
        }

        try {
            const posts = await this.collection.find(filter).sort({ _id: -1 }).limit(limit).toArray();
            return posts;
        } catch (error) {
            console.log(error);
        }

        return [];
    }

    async create(data: Omit<PostDto, '_id' | 'createdDate'>) {
        const post: PostDto = {
            ...data,
            createdDate: new Date()
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

    async getListOfImages() {
        try {
            const result = await this.collection.find({}).project({ imageUrls: 1 }).toArray();
            const flattenedArray = result.flatMap((item) => item.imageUrls);
            return flattenedArray;
        } catch (error) {
            return [];
        }
    }

    async setOldPostsExpired(olderThanDays: number) {
        const daysAgoTime = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);

        const result = await this.collection.updateMany(
            { createdDate: { $lt: daysAgoTime } },
            { $set: { isExpired: true } }
        );

        return result.modifiedCount;
    }
}
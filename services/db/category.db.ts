import { CategoryDto, CategoryWithCount } from '@/model/category.model';
import { DbCollection } from './db-collection';

export class CategoryDb extends DbCollection<CategoryDto> {
    async all() {
        return this.collection.find().toArray();
    }

    async withCounts() {
        return this.collection.aggregate<CategoryWithCount>([
            {
                $lookup: {
                    from: 'posts',
                    localField: 'shortName',
                    foreignField: 'category',
                    as: 'posts'
                }
            },
            {
                $project: {
                    _id: 1,
                    label: 1,
                    shortName: 1,
                    description: 1,
                    postCount: { $size: "$posts" }
                }
            }
        ]).toArray();
    }

    async byShortName(shortName: string) {
        return this.collection.findOne({ shortName });
    }

    async byLabel(label: string) {
        return this.collection.findOne({ label });
    }
}
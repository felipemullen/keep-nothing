import { CategoryDto, CategoryWithCount } from '@/model/category.model';
import { DbCollection } from './db-collection';

export class CategoryDb extends DbCollection<CategoryDto> {
    async all() {
        return this.collection.find().toArray();
    }

    async withCounts(includeConditions: boolean = false) {
        const projection: any = {
            _id: { $toString: "$_id" },
            label: 1,
            shortName: 1,
            description: 1,
            postCount: { $size: "$posts" }
        };

        if (includeConditions) {
            projection['conditions'] = 1;
        }

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
                $project: projection
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
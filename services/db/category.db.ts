import { CategoryDto } from '@/model/category.model';
import { DbCollection } from './db-collection';

export class CategoryDb extends DbCollection<CategoryDto> {
    async all() {
        return this.collection.find().toArray();
    }

    async byShortName(shortName: string) {
        return this.collection.findOne({ shortName });
    }

    async byLabel(label: string) {
        return this.collection.findOne({ label });
    }
}
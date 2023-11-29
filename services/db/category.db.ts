import { CategoryDto } from '@/model/category.model';
import { DbCollection } from './db-collection';

export class CategoryDb extends DbCollection<CategoryDto> {
    async all() {
        return this.collection.find().toArray();
    }
}
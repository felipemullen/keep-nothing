import { DbService } from '@/services/db.service';
import { NewPost } from './new-post';

export default async function NewPage() {
    const categories = await DbService.category.all();

    return (
        <div>
            <NewPost categories={categories} />
        </div>
    )
};
import { DbService } from '@/services/db.service';
import { PostCreate } from './post-create';

export default async function NewPage() {
    const categories = await DbService.category.all();

    return (
        <div>
            <PostCreate categories={categories} />
        </div>
    )
};
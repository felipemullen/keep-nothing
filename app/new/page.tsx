import { DbService } from '@/app/services/db.service';
import { NewPost } from './new-post';
import { SidebarMobile } from '../shared/sidebar';

export const dynamic = 'force-dynamic';

export default async function NewPage() {
    const categories = await DbService.category.withCounts(true);

    return (
        <div>
            <SidebarMobile categories={categories} />
            <NewPost categories={categories} />
        </div>
    )
};
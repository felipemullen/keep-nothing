import { Suspense } from 'react';
import { Sidebar } from '../shared/sidebar';
import { LikedPosts } from './liked-posts';
import { Spinner } from '../shared/spinner';
import { DbService } from '@/app/services/db.service';

export const dynamic = 'force-dynamic';

export default async function LikesPage() {
    const categories = await DbService.category.withCounts();

    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <Sidebar categories={categories} />
            </Suspense>
            <div className="px-4 pt-5 sm:ml-64">
                <LikedPosts />
            </div>
        </div>
    );
}
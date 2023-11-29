import { Suspense } from 'react';
import { Sidebar } from '../components/sidebar';
import { LikedPosts } from './liked-posts';
import { Spinner } from '../components/spinner';
import { DbService } from '@/services/db.service';

export default async function LikesPage() {
    const categories = await DbService.category.all();

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
import { PostList } from '@/app/components/post-list';
import { Sidebar } from '@/app/components/sidebar';
import { Spinner } from '@/app/components/spinner';
import { DbService } from '@/services/db.service';
import React, { Suspense } from 'react';

export default async function CategoryPage({ params }: any) {
    const category = params.category as string;
    const categories = await DbService.category.withCounts();
    const categoryDetails = categories.find((c) => c.shortName === category);

    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <Sidebar categories={categories} />
            </Suspense>
            <div className="p-4 sm:ml-64">
                <PostList loadRecent="true" category={categoryDetails} />
            </div>
        </div>
    );
}
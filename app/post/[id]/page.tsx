import { DbService } from '@/app/services/db.service';
import { PostView } from './post-view';
import { FeatherIcon } from '@/app/shared/icons/feather-icon';

import React, { Suspense } from 'react';
import { Spinner } from '@/app/shared/spinner';
import { ServerUtil } from '@/app/util/server-utils';
import { Sidebar } from '@/app/shared/sidebar';

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: any) {
    const { id } = params;

    const post = await DbService.post.byId(id);
    const categories = await DbService.category.withCounts();

    if (post) {
        // Converting id from ObjectId to avoid "Only plain objects can be passed to Client Components" error
        post._id = post._id.toString();

        const postCategory = categories.find((c) => c.shortName === post.category);
        const location = ServerUtil.getZipCoordinates(post.zipCode);

        return (
            <>
                <Sidebar categories={categories} />
                <Suspense fallback={<Spinner />}>
                    <div className="sm:ml-64">
                        <PostView data={post} postCategory={postCategory!} location={location} />
                    </div>
                </Suspense>
            </>
        );
    } else {
        return (
            <>
                <Sidebar categories={categories} />
                <div className="p-10 sm:ml-64 md:pt-36 flex flex-col items-center">
                    <FeatherIcon name="alert-octagon" />
                    <p className="mt-5 text-lg">Post not found</p>
                </div>
            </>
        );
    }
}

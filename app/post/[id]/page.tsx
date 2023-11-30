import { DbService } from '@/services/db.service';
import { PostView } from './post-view';
import { FeatherIcon } from '@/app/shared/icons/feather-icon';

import React, { Suspense } from 'react';
import { Spinner } from '@/app/shared/spinner';
import { ServerUtil } from '@/app/util/server-utils';
import { SidebarMobile } from '@/app/shared/sidebar';

export default async function PostPage({ params }: any) {
    const { id } = params;

    const post = await DbService.post.byId(id);

    if (post) {
        const categories = await DbService.category.withCounts();
        const postCategory = categories.find((c) => c.shortName === post.category);
        const location = ServerUtil.getZipCoordinates(post.zipCode);

        return (
            <>
                <SidebarMobile categories={categories} />
                <Suspense fallback={<Spinner />}>
                    <PostView data={post} postCategory={postCategory!} location={location} />
                </Suspense>
            </>
        );
    } else {
        return (
            <div className="p-10 md:p-36 flex flex-col items-center">
                <FeatherIcon name="alert-octagon" />
                <p className="mt-5 text-lg">Post not found</p>
            </div>
        );
    }
}

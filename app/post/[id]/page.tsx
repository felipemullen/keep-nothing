import { DbService } from '@/services/db.service';
import { PostView } from './post-view';
import { FeatherIcon } from '@/app/shared/icons/feather-icon';

import React, { Suspense } from 'react';
import { Spinner } from '@/app/shared/spinner';
import { ServerUtil } from '@/app/util/server-utils';

export default async function PostPage({ params }: any) {
    const { id } = params;

    const post = await DbService.post.byId(id);

    if (post) {
        const postCategory = await DbService.category.byShortName(post.category);
        const location = ServerUtil.getZipCoordinates(post.zipCode);

        return (
            <Suspense fallback={<Spinner />}>
                <PostView data={post} postCategory={postCategory!} location={location} />
            </Suspense>
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

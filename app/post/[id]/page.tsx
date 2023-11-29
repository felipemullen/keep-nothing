import { DbService } from '@/services/db.service';
import { PostView } from '../post-view';
import { FeatherIcon } from '@/app/components/icons/feather-icon';

import React, { Suspense } from 'react';
import { Spinner } from '@/app/components/spinner';

export default async function PostPage({ params }: any) {
    const { id } = params;

    const post = await DbService.post.byId(id);

    if (post) {
        return (
            <Suspense fallback={<Spinner />}>
                <PostView data={post} />
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

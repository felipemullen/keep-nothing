// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

// export default async function Home() {
//     const session = await getServerSession(options)

//     return (
//         <>
//             {session
//                 ? (<UserCard user={session?.user} pagetype={"Home"} />)
//                 : (
//                     <h1 className="text-5xl text-red-600 font-semibold">
//                         You are Not Authenticated !!
//                     </h1>
//                 )}
//         </>
//     )
// }p

import React, { Suspense } from 'react';
import { Sidebar } from './shared/sidebar';
import { PostList } from './shared/post-list';
import { DbService } from '@/app/services/db.service';
import { Spinner } from './shared/spinner';

export const dynamic = 'force-dynamic';

export default async function MainPage() {

    const categories = await DbService.category.withCounts();

    return (
        <div>
            <Suspense fallback={<Spinner />}>
                <Sidebar categories={categories} />
            </Suspense>
            <div className="p-4 sm:ml-64">
                <PostList loadRecent="true" />
            </div>
        </div>
    );
}
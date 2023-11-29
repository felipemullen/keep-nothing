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
import { Sidebar } from './components/sidebar';
import { PostList } from './components/post-list';
import { DbService } from '@/services/db.service';
import { Spinner } from './components/spinner';

export default async function MainPage() {

    const categories = await DbService.category.all();

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
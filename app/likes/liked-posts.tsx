'use client';

import React, { useEffect, useState } from 'react';
import { PostDto } from '@/model/post.model';
import { PostCard } from '../components/post-card';
import { FeatherIcon } from '../components/icons/feather-icon';
import { Spinner } from '../components/spinner';

interface PostListProps {
}

export function LikedPosts({ }: PostListProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PostDto[]>([]);
    const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});

    useEffect(() => {
        getLikes();
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [likedPosts]);

    function getLikes() {
        const likedPostsData = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        setLikedPosts(likedPostsData);
    };

    async function fetchPosts() {
        if (Object.keys(likedPosts).length > 0) {
            const url = `/api/post?ids=${Object.keys(likedPosts).join(',')}`;

            const response = await fetch(url);

            if (!response.ok) {
                console.log('Error fetching posts');
            } else {
                const postData = await response.json();
                setData(postData as PostDto[]);
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="max-w-72rem mx-auto">
            <div className="flex justify-between items-baseline text-sm">
                <p className="uppercase text-menu-caption-gray font-semibold text-xs mb-5">Liked Posts</p>
            </div>
            {isLoading &&
                <div className="p-5 w-full flex flex-col items-center">
                    <Spinner />
                </div>
            }
            {!isLoading && data.length === 0 &&
                <div className="p-5 w-full flex flex-col items-center">
                    <FeatherIcon name="frown" className="m-4 text-red-400" size={42} />
                    <p>You haven't liked anything yet!</p>
                    <a href="/" className="uppercase text-sm text-red-400 hover:text-white hover:bg-red-400 border rounded px-2 py-1 my-8">
                        Explore recent posts
                    </a>
                </div>
            }
            {!isLoading && data.length > 0 &&
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data.map((post) => (
                        <PostCard key={post._id?.toString()} post={post} liked={likedPosts[post._id?.toString() || '']} />
                    ))}
                </div>
            }
        </div>
    );
};

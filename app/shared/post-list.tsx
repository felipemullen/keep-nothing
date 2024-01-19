'use client';

import React, { useEffect, useState } from 'react';
import { PostCard } from '../post/post-card';
import { PostDto } from '@/app/model/post.model';
import { CategoryDto } from '@/app/model/category.model';
import { FeatherIcon } from './icons/feather-icon';
import { Spinner } from './spinner';

interface PostListProps {
    loadRecent?: string;
    category?: CategoryDto;
}

export function PostList({ loadRecent, category }: PostListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<PostDto[]>([]);
    const [sortedBy, setSortedBy] = useState('newest');

    useEffect(() => {
        async function fetchPosts() {
            let queryURL = '/api/post';
            let params = '';

            if (loadRecent) {
                params += 'loadrecent=8';
            }

            if (category?.shortName) {
                params += `&category=${category.shortName}`;
            }

            const url = `${queryURL}?${params}`;

            const response = await fetch(url);
            if (!response.ok) {
                console.log('Error fetching posts');
            } else {
                const postData = await response.json();
                setData(postData as PostDto[]);
            }

            setIsLoading(false);
        };

        fetchPosts();
    }, [category, loadRecent]);


    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let posts = [...data];

        if (event.target.value === 'lowest') {
            posts.sort((a, b) => (a.price > b.price ? 1 : -1));
        } else if (event.target.value === 'highest') {
            posts.sort((a, b) => (a.price < b.price ? 1 : -1));
        } else {
            posts.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        }

        setData(posts);
        setSortedBy(event.target.value);
    };

    const caption = 'Recently posted' + (category?.label ? ' in ' + category.label : '');

    return (
        <div className="max-w-72rem mx-auto">
            <div className="md:flex justify-between items-baseline text-sm  mb-5">
                <p className="uppercase text-menu-caption-gray font-semibold text-xs">{caption}</p>
                <div className="flex items-center mt-1">
                    <span className="mr-1">Sort by:</span>
                    <select value={sortedBy} onChange={handleSort} className="pl-1 text-md">
                        <option value="newest">Newest</option>
                        <option value="lowest">Lowest price</option>
                        <option value="highest">Highest price</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data.map((post) => (
                    <PostCard key={post._id?.toString()} post={post} />
                ))}
            </div>
            {isLoading &&
                <div className="p-5 w-full flex flex-col items-center">
                    <Spinner />
                </div>
            }
            {!isLoading && data.length === 0 &&
                <div className="p-5 w-full flex flex-col items-center">
                    <FeatherIcon name="frown" className="m-4 text-red-400" size={42} />
                    <p>There aren&apos;t any posts in this category!</p>
                    <a href="/" className="uppercase text-sm text-red-400 hover:text-white hover:bg-red-400 border rounded px-2 py-1 my-8">
                        View all categories
                    </a>
                </div>
            }
        </div>
    );
};

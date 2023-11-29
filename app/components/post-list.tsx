'use client';

import React, { useEffect, useState } from 'react';
import { PostCard } from './post-card';
import { PostDto } from '@/model/post.model';

interface PostListProps {
    loadRecent?: string;
    category?: string;
}

export function PostList({ loadRecent, category }: PostListProps) {
    const [data, setData] = useState<PostDto[]>([]);
    const [sortedBy, setSortedBy] = useState('newest');

    useEffect(() => {
        const fetchData = async () => {
            fetchPosts();
        };

        fetchData();
    }, [category]);


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

    async function fetchPosts() {
        let queryURL = '/api/post';
        let params = '';

        if (loadRecent) {
            params += 'loadrecent=8';
        }

        if (category) {
            params += `&category=${category}`;
        }

        const url = `${queryURL}?${params}`;

        const response = await fetch(url);
        if (!response.ok) {
            console.log('Error fetching posts');
        } else {
            const postData = await response.json();
            setData(postData as PostDto[]);
        }
    };

    const caption = loadRecent ? 'Recently posted' : category || '';

    return (
        <div className="max-w-72rem mx-auto">
            <div className="flex justify-between items-baseline text-sm">
                <p className="uppercase text-menu-caption-gray font-semibold text-xs mb-5">{caption}</p>
                <div className="flex items-center">
                    <span className="mr-4">Sort by:</span>
                    <select value={sortedBy} onChange={handleSort} className="pl-2 text-md">
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
        </div>
    );
};

'use client';

import { useEffect, useState } from 'react';
import { FeatherIcon } from './icons/feather-icon';

export interface LikeButtonProps {
    postId?: string;
}

export function LikeButton({ postId }: LikeButtonProps) {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});

    useEffect(() => {
        const likedPostsData = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        setLikedPosts(likedPostsData);
    }, []);

    useEffect(() => {
        if (postId) {
            setIsLiked(likedPosts[postId]);
        }
    }, [likedPosts]);

    function togglePostLike() {
        if (postId) {
            const newLikedPosts = { ...likedPosts };

            if (newLikedPosts[postId]) {
                delete newLikedPosts[postId];
            } else {
                newLikedPosts[postId] = true;
            }

            setLikedPosts(newLikedPosts);
            localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
            setIsLiked(!isLiked)
        }
    };

    return (
        <button className="px-2 hover:text-red-400" onClick={togglePostLike}>
            {isLiked
                ? <FeatherIcon name="heart" size={20} color='#FF0000' fillColor='#FF0000' />
                : < FeatherIcon name="heart" size={20} />
            }
        </button>
    );
}
import { ObjectId } from 'mongodb';

export interface PostDto {
    _id?: ObjectId | string;
    canDeliver: boolean;
    meetInChurch: boolean;
    category: string;
    condition: string;
    createdDate: string;
    description: string;
    email: string;
    phone: string;
    imageUrl: string[];
    location: string;
    price: number;
    title: string;
}

export function validatePost(post: { [key: string]: any }) {
    const errors = [];
    for (const key in post) {
        const value = post[key];
        if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
            errors.push(`Missing required field: ${key}`);
        }
    }

    return errors;
}
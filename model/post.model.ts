import { ObjectId } from 'mongodb';

export class PostCreateRequest {
    category: string = '';
    title: string = '';
    price: number = 0;
    phone: string = '';
    condition: string = '';
    email: string = '';
    description: string = '';
    canDeliver: boolean = false;
    meetInChurch: boolean = true;
    imageUrl: string[] = [];
    neighborhood: string = '';
    zipCode: number = 92101;
}

export interface PostDto {
    _id?: ObjectId | string;
    canDeliver: boolean;
    meetInChurch: boolean;
    /** Refers to @see {CategoryDto.shortName}  */
    category: string;
    condition: string;
    createdDate: string;
    description: string;
    email: string;
    phone: string;
    imageUrl: string[];
    neighborhood: string;
    price: number;
    title: string;
    zipCode: number;
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
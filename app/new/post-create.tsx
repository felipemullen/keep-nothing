'use client';

import { Alert } from '../components/alert';
import { CreateFieldHeader } from '../components/create/create-field-header';
import { ImageUploader } from '../components/create/image-uploader';
import { FieldError } from '../components/create/field-error';
import React, { useState } from 'react';
import { PostCreateRequest } from '@/model/post.model';
import { CategoryDto } from '@/model/category.model';

const initialErrors = {
    categoryError: '',
    titleError: '',
    priceError: '',
    conditionError: '',
    emailError: '',
    descriptionError: '',
    zipCodeError: '',
    neighborhoodError: ''
};

export interface PostCreateProps {
    categories: CategoryDto[];
}

export function PostCreate({ categories }: PostCreateProps) {
    const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
    const [newPost, setNewPost] = useState<PostCreateRequest>(new PostCreateRequest());
    const [errorMessages, setErrorMessages] = useState(initialErrors);
    const [conditionList, setConditionList] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const label = event.target.name;
        const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;

        if (label === 'category') {
            const selectedCategory = categories.find((category) => category.shortName === value);
            setConditionList(selectedCategory?.conditions || []);
        }

        setNewPost((prev) => ({
            ...prev,
            [label]: value
        }));
    };

    function validateForm() {
        const inputValues = { ...newPost };

        let categoryError = '';
        let titleError = '';
        let priceError = '';
        let conditionError = '';
        let emailError = '';
        let descriptionError = '';
        let zipCodeError = '';

        if (!inputValues.title) {
            titleError = 'title cannot be blank';
        }
        if (!inputValues.zipCode) {
            zipCodeError = 'zip code cannot be blank';
        } else if (inputValues.zipCode && inputValues.zipCode.toString().length !== 5) {
            zipCodeError = 'invalid zip code';
        }
        if (!inputValues.category) {
            categoryError = 'category cannot be blank';
        }

        const price = parseFloat(inputValues.price?.toString());
        if (price < 0) {
            priceError = 'price cannot be negative';
        } else if (isNaN(price)) {
            priceError = 'invalid price value';
        }

        if (!inputValues.condition) {
            conditionError = 'condition cannot be blank';
        }
        if (!inputValues.description) {
            descriptionError = 'description cannot be blank';
        }
        if (!inputValues.email) {
            emailError = 'email cannot be blank';
        } else if (inputValues.email && !inputValues.email.includes('@')) {
            emailError = 'not a valid email';
        }

        setErrorMessages({
            ...initialErrors,
            categoryError,
            titleError,
            priceError,
            conditionError,
            emailError,
            descriptionError,
            zipCodeError
        });

        if (categoryError || titleError || priceError || conditionError || emailError || descriptionError || zipCodeError) {
            return false;
        }

        return true;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessages(initialErrors);
        setIsFormValid(null);

        const isValid = validateForm();

        if (!isValid) {
            setIsFormValid(false);
            return;
        }

        try {
            const response = await fetch('/api/post/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newPost,
                    price: 0 + parseInt(newPost.price?.toString())
                })
            });

            const { id } = await response.json();
            document.location.href = `/post/${id}`;
        } catch (e) {
            // TODO add state key for submission failure
            setIsFormValid(false);
        }
    };

    const handleImageUpdate = (images: string[]) => {
        setNewPost((prev: any) => ({ ...prev, imageUrls: images }));
    };

    return (
        <div className="flex flex-col md:flex-row mt-5 justify-center">
            <div className="w-full border-b md:border-b-0 md:max-w-xs md:pt-5 px-4 md:border-r text-sm font-light text-neutral-700">
                <p className="mb-4">Fields marked with <span className="text-rose-400">*</span> symbol are required.</p>
                <p className="my-4">Your listing will show the approximate radius of the neighborhood you select.</p>
                <p className="my-4">You can also select that you are willing to <strong>meet in church</strong> as well, it might make things easier if you&apos;re not in a rush.</p>
                <p className="my-4"><strong>Avoid scams.</strong> Deal locally and meet in person. Beware of shipping, wire transfers, cashier checks.</p>
            </div>
            <div className="w-full md:max-w-2xl md:pt-5 px-4 pt-4">
                <div className="w-100">
                    {isFormValid === false ? <Alert className="my-1" strong="Uh oh!" text="Looks like we found some errors" /> : null}
                </div>
                <form onSubmit={handleSubmit} className="">
                    <div className="flex">
                        <div className="w-1/2">
                            <CreateFieldHeader label="Category" required />
                            <select value={newPost.category} onChange={handleChange} className="w-full rounded px-1 py-1 border border-neutral-400 text-sm font-light" name="category">
                                <option value="" disabled>Select...</option>
                                {categories.map((option) => (
                                    <option key={option.shortName} value={option.shortName}>{option.label}</option>
                                ))}
                            </select>
                            <FieldError error={errorMessages.categoryError} />
                        </div>
                        <div className="w-1/2 ml-2">
                            <CreateFieldHeader label="Condition" required />
                            <select value={newPost.condition} onChange={handleChange} className="w-full capitalize rounded px-1 py-1 border border-neutral-400 text-sm font-light" name="condition">
                                <option value="" disabled>Select...</option>
                                {conditionList.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <FieldError error={errorMessages.conditionError} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <CreateFieldHeader label="Neighborhood" />
                            <input className="w-full border border-neutral-400 w-50 rounded font-light pl-1" type="text" value={newPost.neighborhood} onChange={handleChange} name="neighborhood" placeholder="Downtown, Point Loma.." />
                            <FieldError error={errorMessages.neighborhoodError} />
                        </div>
                        <div className="w-1/2 ml-2">
                            <CreateFieldHeader label="Zip Code" required />
                            <input className="w-full border border-neutral-400 w-50 rounded font-light pl-1" type="number" value={newPost.zipCode} onChange={handleChange} name="zipCode" />
                            <FieldError error={errorMessages.zipCodeError} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <CreateFieldHeader label="Title" required />
                            <input className="w-full border border-neutral-400 w-50 rounded font-light pl-1" type="text" value={newPost.title} onChange={handleChange} name="title" placeholder="Fancy toaster" />
                            <FieldError error={errorMessages.titleError} />
                        </div>
                        <div className="w-1/2 ml-2">
                            <CreateFieldHeader label="Price" required />
                            <input className="w-full border border-neutral-400 w-50 rounded font-light pl-1" type="number" value={newPost.price} onChange={handleChange} name="price" />
                            <FieldError error={errorMessages.priceError} />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <CreateFieldHeader label="Email" required />
                            <input className="w-full border border-neutral-400 w-50 rounded font-light pl-1" type="email" value={newPost.email} onChange={handleChange} name="email" />
                            <FieldError error={errorMessages.emailError} />
                        </div>
                        <div className="w-1/2 ml-2">
                            <CreateFieldHeader label="Phone Number" />
                            <input className="w-full border border-neutral-400 w-50 rounded font-light pl-1" type="tel" value={newPost.phone} onChange={handleChange} name="phone" placeholder="619-123-4567" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CreateFieldHeader label="Description" required />
                        <textarea value={newPost.description} onChange={handleChange} className="w-full border border-neutral-400 rounded pl-1 font-light" name="description" rows={4} placeholder="It's my favorite toaster, but I am moving!" />
                        <FieldError error={errorMessages.descriptionError} />
                    </div>
                    <ImageUploader imageUrls={newPost.imageUrls} updateImages={handleImageUpdate} />
                    <label className="flex align-items-center mt-4">
                        <CreateFieldHeader label="Will deliver" />
                        <input className="ml-2 border border-neutral-400 rounded" type="checkbox" checked={newPost.canDeliver} onChange={handleChange} name="canDeliver" />
                    </label>
                    <label className="flex align-items-center mb-4">
                        <CreateFieldHeader label="Meet in church" />
                        <input className="ml-2 border border-neutral-400 rounded" type="checkbox" checked={newPost.meetInChurch} onChange={handleChange} name="meetInChurch" />
                    </label>
                    <input className="rounded uppercase text-sm py-1 px-3 font-bold bg-sky-700 hover:bg-sky-600 active:bg-sky-800 text-white" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

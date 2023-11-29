'use client'

import React, { useState } from 'react';
import { Spinner } from '../spinner';
import { ImageUploaderButtons } from './image-uploader-buttons';
import { ImageUploaderImages } from './image-uploader-images';
import { Alert } from '../alert';

interface ImageUploaderProps {
    imageUrl: string[];
    updateImages: (images: string[]) => void;
}

export function ImageUploader({ imageUrl, updateImages }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setUploading(true);

        try {
            setUploadError('');
            const images = await Promise.all(
                files.map(async (file) => {
                    const formData = new FormData();
                    formData.append('upload_preset', 'default-preset');
                    formData.append('file', file);

                    // const response = await fetch(`https://api.cloudinary.com/v1_1/keepnothing/image/upload`, {
                    const response = await fetch(`/api/image/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    const json = await response.json();
                    return json.url;
                })
            );
            updateImages(imageUrl.concat(images));
        } catch (error) {
            setUploadError('Unable to upload image');
        } finally {
            setUploading(false);
        }
    };

    function removeImage(id: string) {
        updateImages(imageUrl.filter((image) => image !== id));
    };

    function content() {
        switch (true) {
            case uploading:
                return <Spinner />;
            default:
                return (
                    <div>
                        <ImageUploaderButtons onChange={onChange} />
                        <ImageUploaderImages images={imageUrl} removeImage={removeImage} />
                        {uploadError &&
                            <Alert strong="Error:" text={uploadError} className="mt-4" />
                        }
                    </div>
                );
        }
    };

    return <div className="buttons">{content()}</div>;
};

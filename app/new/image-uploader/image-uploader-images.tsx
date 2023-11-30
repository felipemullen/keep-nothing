import Image from 'next/image';
import React from 'react';
import { FeatherIcon } from '../../shared/icons/feather-icon';

export interface ImageUploaderImagesProps {
    images: string[];
    removeImage: (id: string) => void;
}

export function ImageUploaderImages(props: ImageUploaderImagesProps) {
    return (
        props.images.map((image, i) =>
            <div key={i} className="relative m-2 inline-block border">
                <button onClick={() => props.removeImage(image)} className="absolute bg-white border-l border-b right-0 top-0">
                    <FeatherIcon name="x" size={20} fillColor="currentColor" />
                </button>
                <Image className="w-48 h-48 object-cover" src={image} alt={image} width={200} height={200} />
            </div>
        )
    );
}

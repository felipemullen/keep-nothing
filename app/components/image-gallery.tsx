'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export interface ImageCarouselProps {
    postImages: string[];
    className?: string;
}

export function ImageGallery({ className, postImages }: ImageCarouselProps) {

    const getThumbnails = () => {
        return postImages.map((image, i) => {
            return (
                <div key={`thumbnail-${i}`} className="w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt='' className="w-full h-full object-cover" />
                </div>
            )
        });
    }

    return (
        <div className={className}>
            <Carousel showArrows={true} infiniteLoop={true} useKeyboardArrows={true} renderThumbs={getThumbnails} >
                {postImages.map((image, i) => {
                    return (
                        <div key={`${image}-${i}`} className="h-full w-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="h-full w-full object-cover" src={image} alt='' />
                        </div>
                    )
                })}
            </Carousel>
            <style>{`
                .carousel .thumbs-wrapper {
                    margin: 0;
                    margin-top: 0.25rem;
                    margin-bottom: 0.25rem;
                }
                .carousel .thumbs-wrapper .thumb.selected {
                    border: 2px solid #CCC;
                }
                .carousel .thumbs-wrapper .thumb {
                    border: 2px solid transparent;
                    width: 100px;
                    height: 100px;
                }
            `}</style>
        </div>
    )
}
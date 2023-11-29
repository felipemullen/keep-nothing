import { ImageGallery } from '../components/image-gallery';
import { KeyValuePill } from '../components/key-value-pill.component';
import { PostDto } from '@/model/post.model';
import { PostHead } from './post-head';
import { Suspense } from 'react';
import { TimeAgo } from '../components/time-ago.component';
import dynamic from 'next/dynamic';
import { CategoryDto } from '@/model/category.model';

export interface PostViewProps {
    data: PostDto;
    postCategory: CategoryDto;
    location: [number, number];
}

export function PostView({ data, postCategory, location }: PostViewProps) {

    const Minimap = dynamic(() => import('../components/minimap'), { ssr: false });
    const hasImages = data.imageUrl?.length > 0;

    return (
        <div className="w-full md:mt-4 p-5 xl:p-0">
            <div className="xl:w-9/12 mx-auto">
                <PostHead data={data} />
                <div className="sm:flex xl:flex">
                    <div className="sm:w-8/12 sm:pr-3 md:w-7/12 xl:pr-5">
                        {hasImages && <ImageGallery className="mb-5" postImages={data.imageUrl} />}
                        <p className="font-light">{data.description}</p>

                        <ul className="my-5 px-5 font-light list-disc">
                            <li className="lisdisc">do NOT contact me with unsolicited services or offers</li>
                        </ul>

                        <div className="my-10 sm:flex justify-between items-center font-light text-xs">
                            <p className="mr-4">Post id: {data._id?.toString()}</p>
                            <p className="mr-4">posted <TimeAgo date={data.createdDate} /></p>
                        </div>
                    </div>
                    <div className="w-full sm:w-4/12 md:w-5/12">
                        <div className="mb-4 overflow-hidden">
                            <Suspense fallback={<p>Loading map...</p>}>
                                <Minimap center={location} zoom={13} />
                            </Suspense>
                        </div>
                        <div className="flex flex-col items-start">
                            <KeyValuePill className="mb-1" label="zip code" value={data.zipCode.toString()} />
                            <KeyValuePill className="mb-1" label="condition" value={data.condition} />
                            <KeyValuePill className="mb-1" label="will deliver" value={data.canDeliver ? 'yes' : 'no'} />
                            <KeyValuePill className="mb-1" label="Can meet in church" value={data.meetInChurch ? 'yes' : 'no'} />
                            <KeyValuePill className="mb-1" label="category" value={postCategory.label} />
                        </div>
                    </div>
                </div>
                <div className="my-10 p-5 text-center border font-light text-xs">
                    Avoid scams, deal locally Beware wiring (e.g. Western Union), cashier checks, money orders, shipping.
                </div>
            </div>
        </div>
    );
};

import { PostDto } from '@/model/post.model';
import { Util } from '../util/util';
import { FeatherIcon } from './icons/feather-icon';

export interface PostCardProps {
    post: PostDto;
    liked?: boolean;
}

export function PostCard({ post, liked }: PostCardProps) {
    const image = post.imageUrl?.length ? post.imageUrl[0] : null;
    const displayPrice = Util.formatPrice(post.price);
    const categoryLink = post.category ? '../../' : '';

    return (
        <div className="overflow-hidden bg-white shadow-md relative">
            <a href={categoryLink + 'post/' + post._id} key={post._id?.toString()}>
                {image
                    ? <img className="h-96 sm:h-40 lg:h-48 xl:h-56 w-full object-cover" src={image} alt="" />
                    : (<div className="h-96 sm:h-40 lg:h-48 xl:h-56 w-full flex items-center bg-neutral-200 justify-center">
                        <FeatherIcon name="image" size={48} color="#999" />
                    </div>)
                }
                <div className="p-2">
                    <h2 className="font-semibold text-md">{post.title}</h2>
                    <div className="flex justify-between items-center text-dark-gray mt-1">
                        <p className="font-light text-sm">{post.location}</p>
                        <p className="post-card-pricing">{displayPrice}</p>
                    </div>
                </div>
                {/* <i onClick={handleLike} className={`fa fa-heart${liked ? '' : '-o'}`} /> */}
            </a>
        </div>
    );
}

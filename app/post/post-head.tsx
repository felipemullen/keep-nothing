import { PostDto } from '@/model/post.model';
import { TimeAgo } from '../components/time-ago.component';
import { Util } from '../util/util';
import { PostReplyBtn } from './post-reply-btn';
import { ShareButton } from '../components/share-btn.component';
import { LikeButton } from '../components/like-btn.component';

export interface PostHeadProps {
    data: PostDto;
}

export function PostHead({ data }: PostHeadProps) {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex">
                    <PostReplyBtn data={data} />
                    <LikeButton postId={data._id?.toString()} />
                    {/* <button className="px-2 hover:text-red-600">
                        <FeatherIcon name="flag" size={20} />
                    </button> */}
                    <ShareButton title={data.title} />
                </div>
                <p className="text-xs ml-auto">Posted <TimeAgo date={data.createdDate} /></p>
            </div>
            <h1 className="text-2xl capitalize py-3">{data.title} - {Util.formatPrice(data.price)}{data.neighborhood && <span> ({data.neighborhood})</span>}</h1>
        </>
    );
}
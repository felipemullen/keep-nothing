import { PostDto } from '@/model/post.model';
import { TimeAgo } from '../../shared/time-ago';
import { Util } from '../../util/util';
import { PostReplyBtn } from './post-reply-btn';
import { ShareButton } from '../../shared/share-btn';
import { LikeButton } from '../../shared/like-btn';

export interface PostHeadProps {
    data: PostDto;
}

export function PostHead({ data }: PostHeadProps) {
    return (
        <>
            {data.isExpired &&
                <div className="bg-red-100 border border-red-300 text-center uppercase text-sm p-2 my-2">this listing has expired</div>
            }
            <div className="flex justify-between items-center">
                <div className="flex">
                    <PostReplyBtn data={data} />
                    <LikeButton postId={data._id!.toString()} />
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
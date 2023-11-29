import { Util } from '@/app/util/util';
import { PostDto, validatePost } from '@/model/post.model';
import { DbService } from '@/services/db.service';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const postIds = searchParams.get('ids') || undefined;
    const limit = parseInt(searchParams.get('loadrecent') || '999');

    const results = await DbService.post.search(category, postIds, limit);

    return Response.json(results);
}

export async function POST(request: Request) {
    const body = await request.json() as PostDto;

    const errors = validatePost(body);

    if (errors.length === 0) {
        const post: PostDto = {
            ...body,
            phone: Util.sanitizePhoneNumber(body.phone),
            price: parseInt(body.price.toString())
        };

        const id = await DbService.post.create(post);
        return Response.json({ id });
    }

    return new Response('Invalid post data', { status: 400 });
}
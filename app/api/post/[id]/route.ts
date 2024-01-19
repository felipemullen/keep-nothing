import { DbService } from '../../../services/db.service';

export async function GET(request: Request) {
    const { pathname } = new URL(request.url);
    const postId = pathname.split('/').pop();

    if (postId) {
        const post = await DbService.post.byId(postId);
        return Response.json(post);
    }

    return new Response('', { status: 400 });
}
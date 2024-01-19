import { DbService } from '@/services/db.service';

export async function GET(request: Request) {
    const internalheader = request.headers.get('x-internal-source');
    const internalSecret = request.headers.get('x-internal-secret');

    if (internalheader !== 'db-tasks' || internalSecret !== process.env.INTERNAL_SECRET!) {
        console.log(`[DbTasks] Rejected unknown source: ${internalheader}`);
        return new Response('Not allowed', { status: 403 });
    }

    console.log('[DbTasks] Start setOldPostsExpired');
    const days = 7;
    console.log(`[DbTasks] setting all posts older than ${days} days to expired`);

    const modifiedCount = await DbService.post.setOldPostsExpired(days);

    console.log(`[DbTasks] setOldPostsExpired modified ${modifiedCount} posts ✔️`);

    return new Response('', { status: 200 });
}
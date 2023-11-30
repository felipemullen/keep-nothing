import { DbService } from '@/services/db.service';

export class DbTasks {
    static async expireOldPosts() {
        console.log('[DbTasks] Start setOldPostsExpired');
        const days = 7;
        console.log(`[DbTasks] setting all posts older than ${days} days to expired`);

        const modifiedCount = await DbService.post.setOldPostsExpired(days);

        console.log(`[DbTasks] setOldPostsExpired modified ${modifiedCount} posts ✔️`);
    }
}
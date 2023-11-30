import fs from 'fs';
import path from 'path';
import { DbService } from '../../services/db.service';

export class FileTasks {
    static async cleanupOrphanedImages() {
        console.log('[FileTasks] Start cleanupOrphanedImages...');

        if (!process.env.IMAGE_UPLOAD_PUBLIC_PATH) {
            throw new Error('IMAGE_UPLOAD_PUBLIC_PATH is not set');
        }

        const dbImages = (await DbService.post.getListOfImages()).map(imageUrl => imageUrl.replace('/_i/', ''));

        const imagePath = path.join('public', process.env.IMAGE_UPLOAD_PUBLIC_PATH);
        const files = fs.readdirSync(imagePath).filter(file => file.endsWith('.jpeg'));

        const orphanedImages = files.filter(file => !dbImages.includes(file));

        for (const orphanedImage of orphanedImages) {
            console.log(`Deleting ${orphanedImage}`);
            fs.unlinkSync(path.join(imagePath, orphanedImage));
        }

        console.log('[FileTasks] End cleanupOrphanedImages ✔️');
    }
}
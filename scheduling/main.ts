import cron from 'node-cron';
import { FileTasks } from './tasks/file-tasks';
import { DbTasks } from './tasks/db-tasks';

/**
 * Runs once every hour and looks for any images on the disk that are no longer
 * referenced in the database. If any are found, they are deleted.
 */
cron.schedule('0 * * * *', FileTasks.cleanupOrphanedImages);

/**
 * Runs once every hour on the 15 minute mark and sets all posts older than 7 days to expired.
 */
cron.schedule('15 * * * *', DbTasks.expireOldPosts);

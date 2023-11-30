import cron from 'node-cron';
import { FileTasks } from './tasks/file-tasks';

/**
 * Runs once every hour and looks for any images on the disk that are no longer
 * referenced in the database. If any are found, they are deleted.
 */
cron.schedule('0 * * * *', FileTasks.cleanupOrphanedImages);
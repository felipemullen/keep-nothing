async function dbTasks() {
    const url = new URL(`${process.env.INTERNAL_API}/api/internal/cleanup/post`);
    const options: RequestInit = {
        headers: {
            'x-internal-source': 'db-tasks',
            'x-internal-secret': process.env.INTERNAL_SECRET!,
        }
    }

    const response = await fetch(url, options);
    console.log('[DbTasks] response: ', response.status);
}

dbTasks().then(() => {
    console.log('[DbTasks] finished');
}).catch((error) => {
    console.log('[DbTasks] Fatal error!');
    console.error(error);
});

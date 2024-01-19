async function fileTasks() {
    const url = new URL(`${process.env.INTERNAL_API}/api/internal/cleanup/image`);
    const options: RequestInit = {
        headers: {
            'x-internal-source': 'file-tasks',
            'x-internal-secret': process.env.INTERNAL_SECRET!,
        }
    }

    const response = await fetch(url, options);
    console.log('[FileTasks] response: ', response.status);
}

fileTasks().then(() => {
    console.log('[FileTasks] finished');
}).catch((error) => {
    console.log('[FileTasks] Fatal error!');
    console.error(error);
});

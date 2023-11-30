import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    if (!process.env.IMAGE_UPLOAD_PUBLIC_PATH) {
        throw new Error('IMAGE_UPLOAD_PUBLIC_PATH is not set');
    }

    const url = new URL(request.url);
    const image = url.searchParams.get('key');

    if (image?.trim()) {
        const imagePath = path.join('public', process.env.IMAGE_UPLOAD_PUBLIC_PATH, `${image}.jpeg`);

        if (fs.existsSync(imagePath)) {
            const buffer = fs.readFileSync(imagePath);

            return new Response(buffer, {
                headers: {
                    'Content-Type': 'image/png',
                },
            });
        } else {
            return new Response('', { status: 404 });
        }
    }

    return new Response('', { status: 400 });
}
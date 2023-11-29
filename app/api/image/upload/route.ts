import { ServerUtil } from '@/app/util/server-utils';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
    if (!process.env.IMAGE_UPLOAD_PUBLIC_PATH) {
        throw new Error('IMAGE_UPLOAD_PUBLIC_PATH is not set');
    }

    const formData = await request.formData();
    const image = formData.get('file') as File;

    if (image) {
        const extension = image.name.split('.').pop();

        if (extension?.trim()) {
            if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                const newFileName = `${ServerUtil.uniqueId()}.${extension}`;

                const urlPath = path.join(process.env.IMAGE_UPLOAD_PUBLIC_PATH, newFileName);
                const writePath = path.join('public', urlPath);

                const buffer = Buffer.from(await image.arrayBuffer());

                const resizedBuffer = await sharp(buffer)
                    .resize({ width: 800, height: 800, fit: sharp.fit.inside })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                fs.writeFileSync(writePath, Buffer.from(resizedBuffer));

                return Response.json({
                    url: `/${urlPath}`,
                });
            }
        }
    }

    return new Response('', { status: 400 });
}

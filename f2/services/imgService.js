import fse from 'fs-extra';
import multer from 'multer';
import { nanoid } from 'nanoid';
import { join } from 'path';
import sharp from 'sharp';

import HttpError from '../helpers/HttpError.js';

class ImageService {
    static initUploadMiddleware(name) {
        const multerStorage = multer.memoryStorage();

        const multerFilter = (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(HttpError(400, 'Image only!'), false);
            }
        };

        return multer({
            storage: multerStorage,
            fileFilter: multerFilter,
        }).single(name);
    }

    static async save(file, options, ...pathSegments) {
        if (file.size > (options?.maxSize ? options.maxsize || 1024 * 1024 : 1 * 1024 * 1024)) throw HttpError(400, 'File is too large');
        const fileName = `${nanoid()}.jpeg`;
        const fullfilePath = join(process.cwd(), 'upload', ...pathSegments);
        await fse.ensureDir(fullfilePath);
        await sharp(file.buffer)
            .resize({ height: options?.height || 300, width: options?.width || 300 })
            .toFormat('jpeg')
            .jpeg({ quality: 1 })
            .toFile(join(fullfilePath, fileName));
        return join(...pathSegments, fileName);
    }
}

export default ImageService;

// const avatar = await jimp.read(file.buffer)
// await avatar.cover(option.width ||500, option.height ||500).quality(90).writeAsync(apth.join(fullFilePath, fileName))

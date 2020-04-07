import { Injectable } from '@nestjs/common';
import { dirname } from 'path';
import { promises as fsPromises } from 'fs';
import * as sharp from 'sharp';
import { ISharpResizeOptions } from './sharp.interfaces';

@Injectable()
export class FilesService {
    async moveFile(oldPath: string, newPath: string): Promise<void> {
        const dir = dirname(newPath);
        try {
            try {
                await fsPromises.access(dir);
            } catch (accessError) {
                if (accessError.code === 'ENOENT') {
                    await fsPromises.mkdir(dir);
                } else {
                    throw accessError;
                }
            }
            await fsPromises.rename(oldPath, newPath);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
            throw error;
        }
    }
    resizeImage(originPath: string, desPath: string, options: ISharpResizeOptions) {
        sharp(originPath).resize(options).toFile(desPath);
    }
}

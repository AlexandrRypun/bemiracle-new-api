import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { ConfigService } from '@nestjs/config';
import { createReadStream, ReadStream, promises as fsPromises } from 'fs';
import { extname, resolve, basename, dirname, join } from 'path';

import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesService } from '../files/files.service';
import { ProductImageRepository } from './productImage.repository';
import { ImageSizeEnum } from './image-size.enum';
import { GetManyResponse } from '../common/interfaces';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository,
        @InjectRepository(ProductImageRepository)
        private readonly productImageRepository: ProductImageRepository,
        private readonly filesService: FilesService,
        private readonly configService: ConfigService
    ) {
    }
    getAllProducts(filters: FindProductsDto): Promise<GetManyResponse<Product>> {
        return this.productRepository.findProducts(filters);
    }
    find(conditions: FindManyOptions<Product>): Promise<Product[]> {
        return this.productRepository.find(conditions);
    }
    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id, { relations: ['translations', 'images', 'category', 'category.translations'] });
        if (product) {
            return product;
        }
        throw new NotFoundException();
    }
    async createProduct(data: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(data);
    }
    async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
        return this.productRepository.updateProduct(id, data);
    }
    async deleteProduct(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
    async uploadImage(id: number, file) {
        const allowedExtensions = this.configService.get<string[]>('app.files.allowedExtensions.image');
        const ext = extname(file.filename).substr(1);
        try {
            if (!allowedExtensions.includes(ext)) {
                throw new UnprocessableEntityException();
            }
            const destDir = this.configService.get<string>('app.files.path.productImages');
            const newPath = resolve(destDir, String(id), file.filename);
            await this.filesService.moveFile(file.path, newPath);

            const imgSizes = this.configService.get('app.files.imageSize.product');
            Object.entries(imgSizes).forEach(([suffix, sizes]) => {
                this.filesService.resizeImage(newPath, `${newPath.replace(`.${ext}`, '')}_${suffix}.${ext}`, sizes);
            });

            await this.productImageRepository.createImage({productId: id, title: file.originalname, name: file.filename });
        } catch (e) {
            await fsPromises.unlink(file.path);
            throw e;
        }
    }

    async getImageContent(id: number, size: ImageSizeEnum = ImageSizeEnum.ORIGIN): Promise<ReadStream> {
        const imgDir = this.configService.get<string>('app.files.path.productImages');
        const defaultImage = this.configService.get<string>('app.files.path.defaultProductImage');
        let localPath;
        let realSize = size;
        if (Object.values(ImageSizeEnum).includes(size)) {
            const image = await this.productImageRepository.findOne({ id });
            if (image) {
                localPath = join(String(image.productId), image.name);
            }
        } else {
            realSize = ImageSizeEnum.ORIGIN;
        }
        if (!localPath) {
            localPath = defaultImage;
        }
        const fullPath = join(imgDir, localPath);
        let path = this.getSizedImgPath(fullPath, realSize);
        try  {
            await fsPromises.access(path);
        } catch (e) {
            path = this.getSizedImgPath(join(imgDir, defaultImage), realSize);
        }
        return createReadStream(path);
    }

    private getSizedImgPath(path, size: ImageSizeEnum = ImageSizeEnum.ORIGIN) {
        const dir = dirname(path);
        const ext = extname(path);
        const name = basename(path, ext);
        return join(dir, `${name}_${size}${ext}`);
    }
}

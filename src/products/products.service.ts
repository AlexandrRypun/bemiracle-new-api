import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesService } from '../files/files.service';
import { promises as fsPromises } from 'fs';
import { ConfigService } from '@nestjs/config';
import { extname, resolve, basename, dirname, join } from 'path';
import { ProductImageRepository } from './productImage.repository';
import { createReadStream, ReadStream } from 'fs';
import { ImageSizeEnum } from './image-size.enum';

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
    async getAllProducts(filters: FindProductsDto): Promise<Product[]> {
        return this.productRepository.findProducts(filters);
    }
    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id, { relations: ['translations', 'images'] });
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
        let localPath;
        let realSize = size;
        if (Object.values(ImageSizeEnum).includes(size)) {
            const image = await this.productImageRepository.findOne({ id });
            if (image) {
                localPath = join(String(image.productId), image.title);
            }
        } else {
            realSize = ImageSizeEnum.ORIGIN;
        }
        if (!localPath) {
            localPath = this.configService.get<string>('app.files.path.defaultProductImage');
        }
        const fullPath = join(imgDir, localPath);
        const dir = dirname(fullPath);
        const ext = extname(fullPath);
        const title = basename(fullPath, ext);
        const path = join(dir, `${title}_${realSize}${ext}`);

        return createReadStream(path);
    }
}

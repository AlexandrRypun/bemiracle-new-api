import { EntityRepository, Repository } from 'typeorm';
import { ProductImage } from './productImage.entity';

@EntityRepository(ProductImage)
export class ProductImageRepository extends Repository<ProductImage> {
    async createImage(data): Promise<void> {
        const productImage = new ProductImage();
        ProductImage.merge(productImage, data);
        await productImage.save();
    }
}

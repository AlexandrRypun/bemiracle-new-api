import { AfterLoad, BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'productImages' })
export class ProductImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Product,
        product => product.images,
        { onDelete: 'CASCADE' }
    )
    product: Product;

   @Column({
        type: 'integer'
    })
    productId: number;

   @Column({
        type: 'varchar'
    })
    title: string;

   @Column({
        type: 'varchar'
    })
    name: string;

   url: string;

    @AfterLoad()
    setComputed() {
        this.url = `/products/image/${this.id}`;
    }
}

import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity({ name: 'orderProducts' })
@Unique(['product', 'order'])
export class OrderProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int'
    })
    price: number;

    @Column({
        type: 'int'
    })
    quantity: number;

    @ManyToOne<Product>(
        'Product',
        { nullable: true, onDelete: 'SET NULL' }
    )
    product: Product;

    @ManyToOne(
        () => Order,
        order => order.products,
        { onDelete: 'CASCADE', nullable: false }
    )
    order: Order;
}

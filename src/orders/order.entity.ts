import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '../users/user.entity';
import { OrderProduct } from './orderProduct.entity';

export enum ORDER_STATUS {
    NEW = 'new',
    SENT = 'sent',
    RETRIEVED = 'retrieved'
}

export enum PAYMENT_METHOD {
    CASH = 'cash',
    ON_CARD = 'oncard'
}

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int'
    })
    price: number;

    @Column({
        type: 'enum',
        enum: ORDER_STATUS,
        default: ORDER_STATUS.NEW
    })
    status: ORDER_STATUS;

    @Column({
        type: 'enum',
        enum: PAYMENT_METHOD
    })
    paymentMethod: PAYMENT_METHOD;

    @CreateDateColumn({ type: 'timestamp', update: false })
    createdAt: Date;

    @Column({
        type: 'varchar',
        length: 50
    })
    customerName: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    customerSurname: string;

    @Column({
        type: 'varchar',
        length: 13
    })
    customerPhone: string;

    @Column({
        type: 'varchar',
        length: 320,
        nullable: true
    })
    customerEmail?: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    customerCity: string;

    @Column({
        type: 'integer'
    })
    customerNovaPoshtaDep: number;

    @Column({
        type: 'text',
        default: ''
    })
    comments: string;

    @Column({
        type: 'int',
        nullable: true
    })
    @Exclude()
    userId: number;

    @ManyToOne(
        () => User,
        { nullable: true, onDelete: 'SET NULL' }
    )
    user: User;

    @OneToMany<OrderProduct>(
        'OrderProduct',
        'order')
    products: OrderProduct[];
}

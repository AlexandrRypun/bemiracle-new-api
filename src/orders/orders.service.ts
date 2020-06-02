import { Injectable } from '@nestjs/common';

import { Order, ORDER_STATUS } from './order.entity';
import { OrderRepository } from './order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { GetManyResponse } from '../common/interfaces';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { In } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
        @InjectRepository(OrderRepository)
        private readonly orderRepository: OrderRepository
    ) {
    }

    getOrderById(id: number): Promise<Order> {
        return this.orderRepository.findOne(id, { relations: ['products', 'products.product', 'products.product.translations', 'products.product.images', 'user'] });
    }

    getOrders(user: User): Promise<GetManyResponse<Order>> {
        const isAdmin = this.usersService.isAdmin(user);
        return this.orderRepository.getOrders(isAdmin ? {} : { userId: user.id });
    }

    async createOrder(data: CreateOrderDto, user: User): Promise<Order> {
        const order = new Order();
        Order.merge(order, data);
        order.status = ORDER_STATUS.NEW;
        let orderPrice = 0;
        const products = await this.productsService.find({
            where: { id: In(data.products.map(product => product.product.id)) },
            select: ['id', 'price']
        });
        const productPrice = {};
        products.forEach(product => {
            productPrice[product.id] = product.price;
        });
        order.products.forEach(product => {
            product.price = productPrice[product.product.id];
            orderPrice += product.price * product.quantity;
        });
        order.price = orderPrice;

        if (user) {
            const isAdmin = this.usersService.isAdmin(user);
            if (!isAdmin) {
                order.user = user;
            }
        } else {
            delete order.user;
        }

        return this.orderRepository.createOrder(order);
    }

    updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
        return this.orderRepository.updateOrder(id, data);
    }
}

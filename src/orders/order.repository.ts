import { EntityRepository, Repository } from 'typeorm';

import { Order } from './order.entity';
import { FindOrdersDto } from './dto/find-orders.dto';
import { GetManyResponse } from '../common/interfaces';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async getOrders(filters: FindOrdersDto): Promise<GetManyResponse<Order>> {
        const [ data, total] = await this.findAndCount(filters as Order);
        return { data, total };
    }
    createOrder(order: Order): Promise<Order> {
        return order.save();
    }
    async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);
        if (!order) {
            throw new NotFoundException();
        }
        Order.merge(order, data);
        await this.save(order, { reload: true });
        return order;
    }
}

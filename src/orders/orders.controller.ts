import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { OrGuards } from '../common/decorators/or-guards.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AllowedRoles } from '../common/decorators/allowed-roles.decorator';
import { SelfOrderActionGuard } from './guards/self-order-action.guard';
import { GetManyResponse } from '../common/interfaces';
import { User } from '../users/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OptionalAuthGuard } from '../common/guards/optional-auth.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getOrders(@GetUser() user: User): Promise<GetManyResponse<Order>> {
        return this.ordersService.getOrders(user);
    }

    @Get('/:id')
    @OrGuards(SelfOrderActionGuard, RolesGuard)
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), SelfOrderActionGuard, RolesGuard)
    getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.ordersService.getOrderById(id);
    }

    @Post()
    @UseGuards(OptionalAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    createOrder(@Body() data: CreateOrderDto, @GetUser() user: User): Promise<Order> {
        return this.ordersService.createOrder(data, user);
    }

    @Patch('/:id')
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    updateOrder(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateOrderDto
    ): Promise<Order> {
        return this.ordersService.updateOrder(id, data);
    }
}

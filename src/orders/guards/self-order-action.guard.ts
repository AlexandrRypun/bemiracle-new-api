import { AOrGuardGuard } from '../../common/guards/or-guard.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrdersService } from '../orders.service';

@Injectable()
export class SelfOrderActionGuard extends AOrGuardGuard implements CanActivate {
    constructor(
        protected readonly reflector: Reflector,
        private readonly ordersService: OrdersService
    ) {
        super(reflector);
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (this.canSkip(context)) {
            return true;
        }

        const { user, params: { id } } = context.switchToHttp().getRequest();
        const order = await this.ordersService.getOrderById(id);
        const canActivate = user.id === order.user.id;

        return this.nextStep(canActivate, context);
    }
}

import { AOrGuardGuard } from '../../common/guards/or-guard.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SelfActionGuard extends AOrGuardGuard implements CanActivate {
    constructor(protected readonly reflector: Reflector) {
        super(reflector);
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const canSkip = this.canSkip(context);
        const isOrGuard = this.isOrGuard(context);
        if (isOrGuard && canSkip) {
            return true;
        }

        const { user, params: { id } } = context.switchToHttp().getRequest();
        const canActivate = user && user.id === Number(id);
        if (isOrGuard) {
            if (canActivate) {
                this.skipNextOrGuards(context);
            } else {
                return this.orGuardsExist(context);
            }
        }

        return canActivate;
    }
}

import { AOrGuardGuard } from './or-guard.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard extends AOrGuardGuard implements CanActivate {
    constructor(
        protected readonly reflector: Reflector,
        private readonly configService: ConfigService
    ) {
        super(reflector);
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const canSkip = this.canSkip(context);
        const isOrGuard = this.isOrGuard(context);
        if (isOrGuard && canSkip) {
            return true;
        }
        const roles = this.reflector.get<string[]>('allowedRoles', context.getHandler());
        let canActivate = false;
        if (roles) {
            const userGroups = this.configService.get('app.userRole');
            const roleIds = roles.map(role => userGroups[role]);
            const { user } = context.switchToHttp().getRequest();
            canActivate = user && user.groups && user.groups.some(group => roleIds.includes(group.id));
        }

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

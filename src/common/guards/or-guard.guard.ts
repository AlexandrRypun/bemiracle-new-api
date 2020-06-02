import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export abstract class AOrGuardGuard {
    constructor(protected readonly reflector: Reflector) {}

    canSkip(context): boolean {
        const req = context.switchToHttp().getRequest();
        const isOrGuard = this.isOrGuard(context);
        return isOrGuard && req.skipOrGuards === true;
    }

    skipNextOrGuards(context): void {
        const req = context.switchToHttp().getRequest();
        req.skipOrGuards = true;
    }

    orGuardsExist(context): boolean {
        const orGuards = this.reflector.get<[]>('orGuards', context.getHandler());
        if (orGuards) {
            const req = context.switchToHttp().getRequest();
            if (req.usedOrGuards === undefined) {
                req.usedOrGuards = [];
            }
            const restOrGuards = [];
            orGuards.forEach(guard => {
                if (this instanceof guard) {
                    req.usedOrGuards.push(guard);
                } else if (!req.usedOrGuards.includes(guard)) {
                    restOrGuards.push(guard);
                }
            });
            return restOrGuards.length > 0;
        }
        return false;
    }

    isOrGuard(context: ExecutionContext): boolean {
        const orGuards = this.reflector.get<[]>('orGuards', context.getHandler());
        if (orGuards) {
            return orGuards.some(guard => this instanceof guard);
        }
        return false;
    }

    nextStep(canActivate: boolean, context: ExecutionContext): boolean {
        if (this.isOrGuard(context)) {
            if (canActivate) {
                this.skipNextOrGuards(context);
            } else {
                return this.orGuardsExist(context);
            }
        }

        return canActivate;
    }
}

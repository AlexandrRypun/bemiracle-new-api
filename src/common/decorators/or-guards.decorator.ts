import { SetMetadata } from '@nestjs/common';
import { AOrGuardGuard } from '../guards/or-guard.guard';

export const OrGuards = (...guards: Array<new(...args: any[]) => AOrGuardGuard>) => {
    return SetMetadata('orGuards', guards);
};

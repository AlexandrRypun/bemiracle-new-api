import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { AllowedRoles } from '../common/decorators/allowed-roles.decorator';
import { SelfActionGuard } from './guards/self-action.guard';
import { OrGuards } from '../common/decorators/or-guards.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @OrGuards(RolesGuard, SelfActionGuard)
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), SelfActionGuard, RolesGuard)
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }
}

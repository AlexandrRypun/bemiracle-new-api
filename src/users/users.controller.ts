import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { AllowedRoles } from '../common/decorators/allowed-roles.decorator';
import { SelfActionGuard } from './guards/self-action.guard';
import { OrGuards } from '../common/decorators/or-guards.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UpdateUserInterceptor } from './interceptors/update-user.interceptor';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @OrGuards(SelfActionGuard, RolesGuard)
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), SelfActionGuard, RolesGuard)
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @OrGuards(SelfActionGuard, RolesGuard)
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), SelfActionGuard, RolesGuard)
    @UseInterceptors(UpdateUserInterceptor)
    @Patch('/:id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) params: UpdateUserDto,
        @GetUser() user: User
    ): Promise<User> {
        return this.usersService.updateUser(id, params);
    }
}

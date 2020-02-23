import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { AllowedRoles } from '../common/decorators/allowed-roles.decorator';
import { SelfActionGuard } from './guards/self-action.guard';
import { OrGuards } from '../common/decorators/or-guards.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

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

    @UsePipes(ValidationPipe)
    @OrGuards(SelfActionGuard, RolesGuard)
    @AllowedRoles('admin')
    @UseGuards(AuthGuard('jwt'), SelfActionGuard, RolesGuard)
    @Patch('/:id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() params: UpdateUserDto
    ): Promise<User> {
        return this.usersService.updateUser(id, params);
    }
}

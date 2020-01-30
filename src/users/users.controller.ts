import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { GetUser } from '../auth/get-user.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number, @GetUser() currentUser: User): Promise<User> {
        return this.usersService.getUserById(id);
    }
}

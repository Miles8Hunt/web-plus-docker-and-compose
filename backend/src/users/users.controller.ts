import { Controller, UseGuards, Get, Req, Post, Body, Patch, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { UserWishesDto } from './dto/user-wishes.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { WishInterceptor } from '../interceptors/wish.interceptor';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(UserInterceptor)
  @Get('me')
  async findCurrentUser(@Req() { user: { id } }): Promise<User> {
    return await this.usersService.findById(id);
  }

  @UseInterceptors(WishInterceptor)
  @Get('me/wishes')
  async findCurrentUserWishes(@Req() { user: { id } }): Promise<Wish[]> {
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.findWishes(id, relations);
  }

  @UseInterceptors(UserInterceptor)
  @Post('find')
  async findUserByQuery(@Body('query') query: string): Promise<User[]> {
    return await this.usersService.findByQuery(query);
  }

  @UseInterceptors(UserInterceptor)
  @Get(':username')
  async findUserData(@Param('username') username: string): Promise<User> {
    return await this.usersService.findByUsername(username);
  }

  @UseInterceptors(WishInterceptor)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string): Promise<UserWishesDto[]> {
    const { id } = await this.usersService.findByUsername(username);
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.findWishes(id, relations);
  }

  @UseInterceptors(UserInterceptor)
  @Patch('me')
  @UseFilters(InvalidDataExceptionFilter)
  async updateCurrentUser(@Req() { user: { id } }, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}

import { Controller, Post, Body, UseGuards, Req, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalGuard } from './guard/local.guard';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';
import { UserInterceptor } from '../interceptors/user.interceptor';
// import { User } from '../users/entities/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@UseFilters(InvalidDataExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  signin(@Req() { user }): Promise<SigninUserDto> {
    return this.authService.auth(user);
  }

  @UseInterceptors(UserInterceptor)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<SignupUserDto> {
    return this.usersService.create(createUserDto);
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { User } from '../users/entities/user.entity';
import { ErrorCode } from '../exceptions/error-codes';
import { ServerException } from '../exceptions/server.exception';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async auth(user: User): Promise<SigninUserDto> {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new ServerException(ErrorCode.IncorrectLoginOrPassword);
    }
    const comparePassword = await this.hashService.comparePassword(password, user.password);

    if (comparePassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

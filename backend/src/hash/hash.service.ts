import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async getUserWithHash<T extends { password?: string }>(
    createUserDto: T,
  ): Promise<Omit<T, 'password'> & { password: string }> {
    const { password, ...rest } = createUserDto;
    const hashPassword = await this.hashPassword(password);
    return {
      ...rest,
      password: hashPassword,
    };
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

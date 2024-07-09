import { IsString } from 'class-validator';

export class SigninUserDto {
  @IsString()
  access_token: string;
}

import { IsNotEmpty, Length, IsString, IsEmail, MinLength, IsOptional, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  username: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
  
  @IsOptional()
  @Length(2, 200)
  @IsString()
  about: string;
  
  @IsOptional()
  @IsUrl()
  avatar: string;
}

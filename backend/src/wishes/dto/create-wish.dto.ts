import { IsNotEmpty, IsString, Length, IsUrl, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsOptional()
  @Length(1, 1024)
  @IsString()
  description: string;
}

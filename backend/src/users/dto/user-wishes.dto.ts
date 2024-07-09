import { IsInt, IsNumber, IsString, IsUrl, Length, IsDate, IsArray } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';

export class UserWishesDto {
  @IsInt()
  id: number;

  @Length(1, 250)
  @IsString()
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  raised: number;

  @IsInt()
  copied: number;

  @Length(1, 1024)
  @IsString()
  description: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsArray()
  offers: Offer[];
}

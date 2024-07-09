import { IsNotEmpty, IsString, Length, /*IsOptional,*/ IsUrl, IsArray, IsInt } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  /*@IsOptional()
  @IsString()
  @Length(1, 1500)
  description: string;*/

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsArray()
  @IsInt({ each: true })
  itemsId: number[];
}

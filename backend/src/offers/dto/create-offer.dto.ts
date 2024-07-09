import { IsNotEmpty, IsNumber, Min, IsOptional, IsBoolean, IsInt, } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  @IsInt()
  itemId: number;
}

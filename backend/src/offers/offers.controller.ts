import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard'
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
// import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
@UseGuards(JwtGuard)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async createOffer(@Req() { user: { id } }, @Body() createOfferDto: CreateOfferDto) {
    return await this.offersService.createOffer(id, createOfferDto);
  }
}

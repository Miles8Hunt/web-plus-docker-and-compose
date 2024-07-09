import { Controller, UseGuards, Get, Req, Post, Body, Param, Delete, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishInterceptor } from '../interceptors/wish.interceptor';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(@Req() { user: { id } }, @Body() createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return await this.wishlistsService.create(id, createWishlistDto);
  }

  @UseInterceptors(WishInterceptor)
  @Get()
  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistsService.findAll();
  }

  @UseInterceptors(WishInterceptor)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Wishlist> {
    return await this.wishlistsService.findById(id);
  }

  @Delete(':id')
  async delete(@Req() { user: { id } }, @Param('id') wishListId: number) {
    return await this.wishlistsService.remove(id, wishListId);
  }
}

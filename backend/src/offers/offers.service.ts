import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ErrorCode } from 'src/exceptions/error-codes';
import { ServerException } from 'src/exceptions/server.exception';

@Injectable()
export class OffersService {

  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async createOffer(userId: number, createOfferDto: CreateOfferDto) {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const wish = await this.wishesService.findById(createOfferDto.itemId);

      if (userId === wish.owner.id) {
        throw new ServerException(ErrorCode.OfferForbidden);
      }

      const user = await this.usersService.findById(wish.owner.id);
      const wishSum = Number((wish.raised + createOfferDto.amount).toFixed(2));

      if (wishSum > wish.price) {
        throw new ServerException(ErrorCode.OfferRaisedForbidden);
      }

      await this.wishesService.updateRaised(createOfferDto.itemId, { raised: wishSum });
      const offer = await this.offersRepository.save({ ...createOfferDto, user, item: wish }); 
      await queryRunner.commitTransaction();

      delete wish.owner.password;
      delete user.password;

      return offer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

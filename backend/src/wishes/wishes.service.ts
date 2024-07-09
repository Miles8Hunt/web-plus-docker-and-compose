import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { UsersService } from 'src/users/users.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { ErrorCode } from 'src/exceptions/error-codes';
import { ServerException } from 'src/exceptions/server.exception';

@Injectable()
export class WishesService {

  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: number, createWishDto: CreateWishDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.usersService.findById(userId);
    return await this.wishesRepository.save({ ...createWishDto, owner: rest });
  }

  async findById(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    
    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }
    return wish;
  }

  async findLast() {
    const wishes = await this.wishesRepository.find({
      relations: ['owner'],
      order: { createdAt: 'desc' },
      take: 40,
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }
    return wishes;
  }

  async findTop() {
    const wishes = await this.wishesRepository.find({
      relations: ['owner'],
      order: { copied: 'desc' },
      take: 20,
    });

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }
    return wishes;
  }

  async findWishInfo(userId: number, id: number) {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner', 'offers', 'offers.user'],
    });

    if (!wish) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    if (userId === wish.owner.id) {
      return wish;
    } else {
      const filteredOffers = wish.offers.filter((offer) => !offer.hidden);
      wish.offers = filteredOffers;
      return wish;
    }
  }

  async findWishListByitemsId(itemsId: number[]): Promise<Wish[]> {
    const wishes = await this.wishesRepository
      .createQueryBuilder('item')
      .where('item.id IN (:...itemsId)', { itemsId })
      .getMany();

    if (!wishes) {
      throw new ServerException(ErrorCode.WishesNotFound);
    }
    return wishes;
  }

  async update(userId: number, wishId: number, updateData: any) {
    const wish = await this.findById(wishId);

    if (userId !== wish.owner.id) {
      throw new ServerException(ErrorCode.WishUpdateForbidden);
    }
    if (updateData.hasOwnProperty('price') && wish.raised > 0) {
      throw new ServerException(ErrorCode.WishUpdateSumForbidden);
    }

    const updatedWish = await this.wishesRepository.update(wishId, updateData);
    if (updatedWish.affected === 0) {
      throw new ServerException(ErrorCode.DataUpdateError);
    }
  }

  async updateRaised(id: number, updateData: any) {
    const wish = await this.wishesRepository.update(id, updateData);

    if (wish.affected === 0) {
      throw new ServerException(ErrorCode.DataUpdateError);
    }
  }

  async remove(userId: number, wishId: number) {
    const wish = await this.findById(wishId);

    if (userId !== wish.owner.id) {
      throw new ServerException(ErrorCode.WishDeleteForbidden);
    }
    return await this.wishesRepository.delete(wishId);
  }

  async copyWish(userId: number, wishId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, raised, owner, ...wish } = await this.findById(wishId);
      const copiedWish = await this.create(userId, wish);
      
      await this.wishesRepository.update(wishId, { copied: copiedWish.copied + 1});
      await queryRunner.commitTransaction();

      return copiedWish;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

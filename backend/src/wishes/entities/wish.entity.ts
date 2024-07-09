import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { IsInt, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ type: 'float' })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @Column({ type: 'float', default: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  raised: number;

  @Column()
  @Length(1, 1024)
  @IsString()
  description: string;

  @Column({ type: 'integer', default: 0 })
  @IsInt()
  copied: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}

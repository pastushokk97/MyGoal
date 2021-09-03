import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bet } from './Bet.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id'
  })
  public userId: string;

  @Column({
    type: 'varchar',
    length: '96',
    name: 'email',
    nullable: false
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: '255',
    name: 'password',
    nullable: false
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: '4',
    name: 'country_code',
    nullable: false
  })
  public countryCode: string;

  @Column({
    type: 'date',
    name: 'created_at',
    nullable: false
  })
  public createdAt: Date;

  @Column({
    type: 'date',
    name: 'updated_at'
  })
  public updatedAt: Date;

  @OneToMany(() => Bet, bet => bet.userId)
  public bets: Bet[]
}

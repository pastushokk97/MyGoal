import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Results } from '../app-constants/enums';
import { Competition } from './Competition.entity';
import { User } from './User.entity';

@Entity({
  name: 'bets',
})
export class Bet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'bet_id'
  })
  public betId: string;

  @ManyToOne(() => User, user => user.userId, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'user_id'
  })
  public userId: User;

  @ManyToOne(() => Competition,
    competition => competition.competitionId, {
      onDelete: 'CASCADE'
    })
  @JoinColumn({
    name: 'competition_id'
  })
  public competitionId: Competition;

  @Column({
    type: 'varchar',
    name: 'result',
    enum: Results
  })
  public result: Results;

  @Column({
    type: 'date',
    name: 'created_at',
    nullable: false
  })
  public createdAt: Date;

  @Column({
    type: 'date',
    name: 'updated_at',
  })
  public updatedAt: Date;
}

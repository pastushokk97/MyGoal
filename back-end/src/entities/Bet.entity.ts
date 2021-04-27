import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Results } from '../app-constants/enums';
import { CompetitionEntity } from './Competition.entity';
import { UserEntity } from './User.entity';

@Entity({
  name: 'bets',
})
export class BetEntity {
    @PrimaryGeneratedColumn('uuid', {
      name: 'bet_id'
    })
    public betId: string;

    @OneToMany(() => UserEntity, user => user.userId, {
      onDelete: 'CASCADE'
    })
    @JoinColumn({
      name: 'user_id'
    })
    public userId: UserEntity;

    @OneToMany(() => CompetitionEntity,
      competition => competition.competitionId, {
        onDelete: 'CASCADE'
      })
    @JoinColumn({
      name: 'competition_id'
    })
    public competitionId: CompetitionEntity;

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

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Results } from '../app-constants/enums';

@Entity({
  name: 'competitions',
})
export class Competition {
    @PrimaryGeneratedColumn('uuid', {
      name: 'competition_id'
    })
    public competitionId: string;

    @Column({
      type: 'varchar',
      length: '255',
      name: 'sport',
      nullable: false
    })
    public sport: string;

    @Column({
      type: 'varchar',
      length: '255',
      name: 'team_at_home',
      nullable: false
    })
    public teamAtHome: string;

    @Column({
      type: 'varchar',
      length: '4',
      name: 'team_outside',
      nullable: false
    })
    public teamOutside: string;

    @Column({
      type: 'date',
      name: 'competition_date',
      nullable: false
    })
    public competitionDate: Date;

    @Column({
      type: 'enum',
      name: 'result',
      enum: Results
    })
    public result: Results;
}
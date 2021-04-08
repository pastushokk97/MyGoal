import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'bets',
})
export class BetEntity {
    @PrimaryGeneratedColumn('uuid', {
        name: 'bet_id'
    })
    public betId: string;

    @Column({
        type: 'uuid',
        name: 'userId',
        nullable: false
    })
    public userId: string;

    @Column({
        type: 'uuid',
        name: 'competition_id',
        nullable: false
    })
    public competitionId: string;

    @Column({
        type: 'varchar',
        length: '10',
        name: 'result',
        nullable: false
    })
    public result: string;

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
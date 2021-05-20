import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
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
}

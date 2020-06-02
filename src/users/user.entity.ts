import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';
import { UserGroup } from './userGroup.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 320
    })
    email: string;

    @Column({
        type: 'varchar',
        select: false
    })
    @Exclude()
    password: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    surname: string;

    @Column({
        type: 'varchar',
        length: 13,
        nullable: true
    })
    phone?: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    city?: string;

    @Column({
        type: 'integer',
        nullable: true
    })
    novaPoshtaDep?: number;

    @ManyToMany(
        type => UserGroup,
        {
            eager: true
        }
    )
    @JoinTable({
        name: 'users2groups',
        joinColumn: {
            name: 'userId'
        },
        inverseJoinColumn: {
            name: 'groupId'
        }
    })
    groups: UserGroup[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }
}

import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'userGroups' })
export class UserGroup extends BaseEntity {
    @PrimaryColumn({ type: 'integer' })
    id: number;

    @Column({ type: 'varchar' })
    name: string;
}

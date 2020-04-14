import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'refreshTokens' })
export class RefreshToken extends BaseEntity {
    @PrimaryColumn({ type: 'varchar' })
    token: string;

    @Column({ type: 'integer' })
    userId: number;
}

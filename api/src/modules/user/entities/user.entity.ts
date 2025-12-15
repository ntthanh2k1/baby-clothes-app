import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  citizen_id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  tax_number: string;

  @Column({ default: true })
  gender: boolean;

  @Column({ nullable: true })
  birth_date: Date;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar', length: 256, nullable: true })
  created_by: string;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'varchar', length: 256, nullable: true })
  updated_by: string;
}

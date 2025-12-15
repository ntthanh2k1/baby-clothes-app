import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sale_order')
export class SaleOrder {
  @PrimaryGeneratedColumn('uuid')
  sale_order_id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  customer_id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  code: string;

  @CreateDateColumn()
  order_date: Date;

  @Column({ type: 'varchar', nullable: true })
  note: string;

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

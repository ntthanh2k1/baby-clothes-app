import { Order } from 'src/modules/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sales_order')
export class SalesOrder {
  @PrimaryColumn('uuid')
  order_id: string;

  @Column({ type: 'varchar', nullable: true })
  shipping_address: string;

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

  @OneToOne(() => Order, (order) => order.sales_order, {
    nullable: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}

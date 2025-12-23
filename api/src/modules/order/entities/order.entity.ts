import { Customer } from 'src/modules/customer/entities/customer.entity';
import { OrderProduct } from 'src/modules/order-product/entities/order-product.entity';
import { SalesOrder } from 'src/modules/sales-order/entities/sales-order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderType } from '../enums/order-type.enum';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  customer_id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  code: string;

  @CreateDateColumn()
  order_date: Date;

  @Column({ type: 'enum', enum: OrderType, default: OrderType.sale })
  type: OrderType;

  @Column({ type: 'int', default: 0 })
  total_amount: number;

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

  @OneToOne(() => SalesOrder, (salesOrder) => salesOrder.order, {
    nullable: true,
  })
  sales_order?: SalesOrder;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  order_products: OrderProduct[];

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}

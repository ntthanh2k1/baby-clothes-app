import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_product')
@Unique(['order_id', 'product_id'])
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  order_product_id: string;

  @Column({ type: 'uuid', nullable: true })
  order_id: string;

  @Column({ type: 'uuid', nullable: true })
  product_id: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  cost: number;

  @Column({ type: 'int', default: 0 })
  price: number;

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

  @ManyToOne(() => Order, (order) => order.order_products, {
    nullable: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_products, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

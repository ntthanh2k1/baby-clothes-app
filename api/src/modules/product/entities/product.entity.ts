import { OrderProduct } from 'src/modules/order-product/entities/order-product.entity';
import { ProductCategory } from 'src/modules/product-category/entities/product-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({ type: 'int', default: 0 })
  cost: number;

  @Column({ type: 'int', default: 0 })
  rent_price: number;

  @Column({ type: 'int', default: 0 })
  sale_price: number;

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

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  product_categories: ProductCategory[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  order_products: OrderProduct[];
}

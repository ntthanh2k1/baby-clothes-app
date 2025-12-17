import { Category } from 'src/modules/category/entities/category.entity';
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

@Entity('product_category')
@Unique(['product_id', 'category_id'])
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  product_category_id: string;

  @Column({ type: 'uuid', nullable: true })
  product_id: string;

  @Column({ type: 'uuid', nullable: true })
  category_id: string;

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

  @ManyToOne(() => Product, (product) => product.product_categories, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Category, (category) => category.product_categories, {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

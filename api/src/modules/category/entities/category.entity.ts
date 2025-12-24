import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryType } from '../enums/category-type.enum';
import { ProductCategory } from 'src/modules/product-category/entities/product-category.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ type: 'uuid', nullable: true })
  parent_id: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({
    type: 'varchar',
    enum: CategoryType,
    default: CategoryType.item_category,
  })
  type: CategoryType;

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

  @OneToMany(() => Category, (category) => category.parent)
  categories: Category[];

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  product_categories: ProductCategory[];

  @ManyToOne(() => Category, (parent) => parent.categories, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;
}

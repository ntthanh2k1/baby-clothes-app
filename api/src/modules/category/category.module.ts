import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { User } from '../user/entities/user.entity';
import { ICategoryRepo } from './interfaces/category-repository.interface';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: ICategoryRepo,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}

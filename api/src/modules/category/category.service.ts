import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { createCode } from 'src/common/utils/create-code';
import {
  ICategoryRepo,
  ICategoryRepository,
} from './interfaces/category-repository.interface';
import { GetCategoriesDto } from './dto/get-categories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(ICategoryRepo)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const code = createCode('PCY');
    const newCategory = await this.categoryRepository.create({
      code,
      ...createCategoryDto,
    });

    return {
      message: 'Create category successfully.',
      data: newCategory,
    };
  }

  async getCategories(getCategoriesDto: GetCategoriesDto) {
    const { page, limit, search, order_by, order_dir, ...rest } =
      getCategoriesDto;
    const searchBy = ['code', 'name'];
    const filters = {};
    const filterArray = Object.entries(rest);

    for (let i = 0; i < filterArray.length; i++) {
      const [key, value] = filterArray[i];

      if (value === undefined) {
        continue;
      }

      filters[key] = value;
    }

    const filterData = {
      page,
      limit,
      search,
      search_by: searchBy,
      filters,
      order_by,
      order_dir,
    };
    const categories = await this.categoryRepository.getCategories(filterData);

    return categories;
  }

  async getCategory(id: string) {
    const currentCategory = await this.categoryRepository.getCategory({
      category_id: id,
    });

    if (!currentCategory) {
      throw new NotFoundException('Category not found.');
    }

    return {
      data: currentCategory,
    };
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );

    if (!updatedCategory) {
      throw new NotFoundException('Category not found.');
    }

    return {
      message: 'Update category successfully.',
      data: updatedCategory,
    };
  }

  async deleteCategory(id: string) {
    const updatedCategory = await this.categoryRepository.delete(id);

    if (!updatedCategory) {
      throw new NotFoundException('Category not found.');
    }

    return {
      message: 'Delete category successfully.',
    };
  }
}

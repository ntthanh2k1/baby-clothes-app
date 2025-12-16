import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { createCode } from 'src/common/utils/create-code';
import {
  IProductCategoryRepo,
  IProductCategoryRepository,
} from './interfaces/product-category-repository.interface';
import { GetProductCategoriesDto } from './dto/get-product-categories.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject(IProductCategoryRepo)
    private readonly productCategoryRepository: IProductCategoryRepository,
  ) {}

  async createProductCategory(
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    const code = createCode('PCY');
    const newProductCategory = await this.productCategoryRepository.create({
      code,
      ...createProductCategoryDto,
    });

    return {
      message: 'Create product-category successfully.',
      data: newProductCategory,
    };
  }

  async getProductCategories(getProductCategoriesDto: GetProductCategoriesDto) {
    const { page, limit, search, order_by, order_dir, ...rest } =
      getProductCategoriesDto;
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
    const productCategories =
      await this.productCategoryRepository.getProductCategories(filterData);

    return productCategories;
  }

  async getProductCategory(id: string) {
    const currentProductCategory =
      await this.productCategoryRepository.getProductCategory({
        product_category_id: id,
      });

    if (!currentProductCategory) {
      throw new NotFoundException('Product-category not found.');
    }

    return {
      data: currentProductCategory,
    };
  }

  async updateProductCategory(
    id: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    const updatedProductCategory = await this.productCategoryRepository.update(
      id,
      updateProductCategoryDto,
    );

    if (!updatedProductCategory) {
      throw new NotFoundException('Product-category not found.');
    }

    return {
      message: 'Update product-category successfully.',
      data: updatedProductCategory,
    };
  }

  async deleteProductCategory(id: string) {
    const updatedProductCategory =
      await this.productCategoryRepository.delete(id);

    if (!updatedProductCategory) {
      throw new NotFoundException('Product-category not found.');
    }

    return {
      message: 'Delete product-category successfully.',
    };
  }
}

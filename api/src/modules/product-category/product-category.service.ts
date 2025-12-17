import { Inject, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import {
  IProductCategoryRepo,
  IProductCategoryRepository,
} from './interfaces/product-category-repository.interface';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject(IProductCategoryRepo)
    private readonly productCategoryRepository: IProductCategoryRepository,
  ) {}

  async createProductCategory(
    createProductCategoryDto: CreateProductCategoryDto,
  ) {
    const newProductCategory = await this.productCategoryRepository.create(
      createProductCategoryDto,
    );

    return {
      message: 'Create product-category successfully.',
      data: newProductCategory,
    };
  }

  findAll() {
    return `This action returns all productCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCategory`;
  }

  update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    return `This action updates a #${id} productCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}

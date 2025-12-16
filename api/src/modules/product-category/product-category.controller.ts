import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetProductCategoriesDto } from './dto/get-product-categories.dto';

@Controller('product-categories')
@UseGuards(AuthGuard)
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  async crecreateProductCategoryate(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ) {
    return await this.productCategoryService.createProductCategory(
      createProductCategoryDto,
    );
  }

  @Get()
  async getProductCategories(
    @Param() getProductCategories: GetProductCategoriesDto,
  ) {
    return await this.productCategoryService.getProductCategories(
      getProductCategories,
    );
  }

  @Get(':id')
  async figetProductCategoryndOne(@Param('id') id: string) {
    return await this.productCategoryService.getProductCategory(id);
  }

  @Patch(':id')
  async updateProductCategory(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return await this.productCategoryService.updateProductCategory(
      id,
      updateProductCategoryDto,
    );
  }

  @Delete(':id')
  async deleteProductCategory(@Param('id') id: string) {
    return await this.productCategoryService.deleteProductCategory(id);
  }
}

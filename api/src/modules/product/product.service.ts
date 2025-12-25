import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createCode } from 'src/common/utils/create-code';
import { GetProductsDto } from './dto/get-products.dto';
import {
  PRODUCT_REPOSITORY,
  IProductRepository,
} from './interfaces/product-repository.interface';
import { ProductCategoryService } from '../product-category/product-category.service';
import { assignFilters } from 'src/common/utils/assign-filters';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { category_ids, ...productDto } = createProductDto;
    const code = createCode('PT');
    const newProduct = await this.productRepository.create({
      code,
      ...productDto,
    });

    for (const category_id of category_ids) {
      await this.productCategoryService.createProductCategory({
        product_id: newProduct.product_id,
        category_id,
      });
    }

    return {
      message: 'Create product successfully.',
      data: newProduct,
    };
  }

  async getProducts(getProductsDto: GetProductsDto) {
    try {
      const { page, limit, search, order_by, order_dir, ...rest } =
        getProductsDto;
      const searchBy = ['code', 'name', 'category_name'];
      const filters: Record<string, any> = {};

      assignFilters(rest, filters);

      const filterData = {
        page,
        limit,
        search,
        search_by: searchBy,
        filters,
        order_by,
        order_dir,
      };
      const products = await this.productRepository.getProducts(filterData);

      return products;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProduct(id: string) {
    const currentProduct = await this.productRepository.getProduct({
      product_id: id,
    });

    if (!currentProduct) {
      throw new NotFoundException('Product not found.');
    }

    return {
      data: currentProduct,
    };
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const { category_ids, ...productDto } = updateProductDto;
    const currentProduct = await this.getProduct(id);
    const uppdatedProduct = await this.productRepository.update(
      currentProduct.data,
      productDto,
    );

    return {
      message: 'Update product successfully.',
      data: uppdatedProduct,
    };
  }

  async deleteProduct(id: string) {
    const currentProduct = await this.getProduct(id);
    await this.productRepository.delete(currentProduct.data);

    return {
      message: 'Delete product successfully.',
    };
  }
}

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
  IProductRepo,
  IProductRepository,
} from './interfaces/product-repository.interface';
import { ProductCategoryService } from '../product-category/product-category.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(IProductRepo)
    private readonly productRepository: IProductRepository,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { product_categories, ...productDto } = createProductDto;
    const code = createCode('PT');
    const newProduct = await this.productRepository.create({
      code,
      ...productDto,
    });

    for (let i = 0; i < product_categories.length; i++) {
      await this.productCategoryService.createProductCategory({
        product_id: newProduct.product_id,
        category_id: product_categories[i],
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
    const { product_categories, ...productDto } = updateProductDto;
    const updatedProduct = await this.productRepository.update(id, productDto);

    if (!updatedProduct) {
      throw new NotFoundException('Product not found.');
    }

    return {
      message: 'Update product successfully.',
      data: updatedProduct,
    };
  }

  async deleteProduct(id: string) {
    const updatedProduct = await this.productRepository.delete(id);

    if (!updatedProduct) {
      throw new NotFoundException('Product not found.');
    }

    return {
      message: 'Delete product successfully.',
    };
  }
}

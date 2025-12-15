import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { createCode } from 'src/common/utils/create-code';
import { GetProductsDto } from './dto/get-products.dto';
import { paginate } from 'src/common/interfaces/paginate-data.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const code = createCode('PT');
    const newProduct = await this.productRepository.save({
      code,
      ...createProductDto,
    });

    return {
      message: 'Create product successfully.',
      data: newProduct,
    };
  }

  async getProducts(getProductsDto: GetProductsDto) {
    const { page, limit, search, is_active, order_by, order_dir } =
      getProductsDto;
    const queryBuilder = this.productRepository
      .createQueryBuilder('entity')
      .where('entity.is_deleted = false');

    if (search) {
      queryBuilder.andWhere(
        `
        entity.code ILIKE :search
        OR entity.name ILIKE :search
        `,
        {
          search: `%${search}%`,
        },
      );
    }

    if (is_active) {
      queryBuilder.andWhere('entity.is_active = :is_active', { is_active });
    }

    if (order_by && order_dir) {
      queryBuilder.orderBy(`${order_by}`, order_dir);
    } else {
      queryBuilder.orderBy('entity.created_at', 'DESC');
    }

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    queryBuilder.select([
      'entity.product_id',
      'entity.code',
      'entity.name',
      'entity.cost',
      'entity.rent_price',
      'entity.sale_price',
      'entity.is_active',
    ]);

    const [data, totalRecords] = await queryBuilder.getManyAndCount();
    const paginatedResult = paginate(data, page, limit, totalRecords);

    return paginatedResult;
  }

  async getProduct(id: string) {
    const currentProduct = await this.productRepository
      .createQueryBuilder('entity')
      .where('entity.product_id = :id', { id })
      .andWhere('entity.is_deleted = false')
      .select([
        'entity.product_id',
        'entity.code',
        'entity.name',
        'entity.cost',
        'entity.rent_price',
        'entity.sale_price',
        'entity.is_active',
      ])
      .getOne();

    if (!currentProduct) {
      throw new NotFoundException('Product not found.');
    }

    return {
      data: currentProduct,
    };
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const currentProduct = await this.getProduct(id);
    const updatedProduct = await this.productRepository.save({
      ...currentProduct.data,
      ...updateProductDto,
    });

    return {
      message: 'Update product successfully.',
      data: updatedProduct,
    };
  }

  async deleteProduct(id: string) {
    const currentProduct = await this.getProduct(id);

    await this.productRepository.save({
      ...currentProduct.data,
      is_deleted: true,
    });

    return {
      message: 'Delete product successfully.',
    };
  }
}

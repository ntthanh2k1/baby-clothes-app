import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ICustomerRepo,
  ICustomerRepository,
} from './interfaces/customer-repository.interface';
import { createCode } from 'src/common/utils/create-code';
import { GetCustomersDto } from './dto/get-customers.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(ICustomerRepo)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const code = createCode('CR');
    await this.customerRepository.create({
      code,
      ...createCustomerDto,
    });

    return {
      message: 'Create customer successfully.',
    };
  }

  async getCustomers(getCustomersDto: GetCustomersDto) {
    const { page, limit, search, order_by, order_dir, ...rest } =
      getCustomersDto;
    const filters = {};
    const filterArray = Object.entries(rest);

    for (let i = 0; i < filterArray.length; i++) {
      const [key, value] = filterArray[i];

      if (!value) {
        continue;
      }

      filters[key] = value;
    }

    const filterData = { page, limit, search, filters, order_by, order_dir };
    const customers = await this.customerRepository.getCustomers(filterData);

    return customers;
  }

  async getCustomer(id: string) {
    const currentCustomer = await this.customerRepository.getCustomer({
      customer_id: id,
    });

    if (!currentCustomer) {
      throw new NotFoundException('Customer not found.');
    }

    return {
      data: currentCustomer,
    };
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerRepository.update(
      id,
      updateCustomerDto,
    );

    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found.');
    }

    return {
      message: 'Update customer successfully.',
    };
  }

  async deleteCustomer(id: string) {
    const updatedCustomer = await this.customerRepository.delete(id);

    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found.');
    }

    return {
      message: 'Delete customer successfully.',
    };
  }
}

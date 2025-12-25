import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ICustomerRepo,
  ICustomerRepository,
} from './interfaces/customer-repository.interface';
import { createCode } from 'src/common/utils/create-code';
import { GetCustomersDto } from './dto/get-customers.dto';
import { assignFilters } from 'src/common/utils/assign-filters';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(ICustomerRepo)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const code = createCode('CR');
    const newCustomer = await this.customerRepository.create({
      code,
      ...createCustomerDto,
    });

    return {
      message: 'Create customer successfully.',
      data: newCustomer,
    };
  }

  async getCustomers(getCustomersDto: GetCustomersDto) {
    const { page, limit, search, order_by, order_dir, ...rest } =
      getCustomersDto;
    const searchBy = ['code', 'name', 'phone_number'];
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
    const currentCustomer = await this.getCustomer(id);
    const updatedCustomer = await this.customerRepository.update(
      currentCustomer.data,
      updateCustomerDto,
    );

    return {
      message: 'Update customer successfully.',
      data: updatedCustomer,
    };
  }

  async deleteCustomer(id: string) {
    const currentCustomer = await this.getCustomer(id);
    await this.customerRepository.delete(currentCustomer.data);

    return {
      message: 'Delete customer successfully.',
    };
  }
}

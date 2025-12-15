import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ICustomerRepo } from './interfaces/customer-repository.interface';
import { CustomerRepository } from './repositories/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: ICustomerRepo,
      useClass: CustomerRepository,
    },
  ],
})
export class CustomerModule {}

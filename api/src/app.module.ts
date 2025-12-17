import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/database/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SalesOrderModule } from './modules/sales-order/sales-order.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CustomerModule,
    SalesOrderModule,
    CategoryModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

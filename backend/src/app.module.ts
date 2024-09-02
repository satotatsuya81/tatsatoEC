import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { typeormConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    ProductsModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

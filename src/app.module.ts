import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './entities/category.entity';
import { OrdersModule } from './orders/orders.module';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Manufacturer } from './entities/manufacturers.entity';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { WholesaleCustomer } from './entities/wholesale-customer.entity';
import { WholesaleOrder } from './entities/wholesale-order.entity';
import { WholesaleOrderItem } from './entities/wholesale-order-item.entity';
import { WholesaleCustomersModule } from './wholesale-customers/wholesale-customers.module';
import { WholesaleOrdersModule } from './wholesale-orders/wholesale-orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Product,
        ProductImage,
        Category,
        OrderItem,
        Order,
        Manufacturer,
        WholesaleCustomer,
        WholesaleOrder,
        WholesaleOrderItem,
      ],
      synchronize: true,
      logging: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    ManufacturersModule,
    WholesaleCustomersModule,
    WholesaleOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

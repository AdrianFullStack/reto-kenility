import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/common/schemas/order.schema';
import { Product, ProductSchema } from 'src/common/schemas/product.schema';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { OrdersRepository } from './order.repository';
import { ProductsRepository } from 'src/products/product.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository, ProductsRepository],
})
export class OrdersModule { }
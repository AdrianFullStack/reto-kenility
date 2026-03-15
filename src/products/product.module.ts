import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { Product, ProductSchema } from 'src/common/schemas/product.schema';
import { ProductsRepository } from './product.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    exports: [ProductsService], // Exportamos para que OrdersModule pueda usarlo
})
export class ProductsModule { }
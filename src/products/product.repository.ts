import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/common/dto/product/create-product.dto';
import { Product } from 'src/common/schemas/product.schema';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>
    ) { }

    async create(createProductDto: CreateProductDto, picture: string): Promise<Product> {
        const newProduct = new this.productModel({ ...createProductDto, picture });
        return newProduct.save();
    }

    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async findByIds(ids: string[]): Promise<Product[]> {
        return this.productModel.find({
            _id: { $in: ids },
        })
    }

    async findBySku(sku: string): Promise<Product | null> {
        return this.productModel.findOne({ sku }).exec();
    }

    async findAll(filters: any, skip: number, limit: number, sort: any) {
        const [data, total] = await Promise.all([
            this.productModel.find(filters).sort(sort).skip(skip).limit(limit).exec(),
            this.productModel.countDocuments(filters),
        ]);
        return { data, total };
    }

    async count(filters: any): Promise<number> {
        return this.productModel.countDocuments(filters);
    }
}
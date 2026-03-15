import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/common/dto/product/create-product.dto';
import { Product } from 'src/common/schemas/product.schema';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) { }

    async create(createProductDto: CreateProductDto, picturePath: string): Promise<Product> {
        const exists = await this.productsRepository.findBySku(createProductDto.sku);
        if (exists) throw new ConflictException('SKU already exists');
        return this.productsRepository.create(createProductDto, picturePath);
    }

    async findById(id: string): Promise<Product> {
        const product = await this.productsRepository.findById(id);
        if (!product) throw new NotFoundException('Producto no encontrado');
        return product;
    }

    async findAll(query: any) {
        const { page = 1, limit = 10, sort = 'name', name, sku } = query;
        const skip = (page - 1) * limit;

        // Filtros de búsqueda exacta
        const filters: any = {};
        if (name) filters.name = { $regex: name, $options: 'i' }; // Búsqueda parcial por nombre
        if (sku) filters.sku = sku; // Match exacto por SKU

        const [data, total] = await Promise.all([
            this.productsRepository.findAll(filters, skip, limit, sort),
            this.productsRepository.count(filters),
        ]);

        return {
            ...data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }
}

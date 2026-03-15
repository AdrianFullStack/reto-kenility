import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from 'src/common/dto/order/create-order.dto';
import { Order } from 'src/common/schemas/order.schema';
import { OrdersRepository } from './order.repository';
import { ProductsRepository } from 'src/products/product.repository';
import { UpdateOrderDto } from 'src/common/dto/order/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productRepository: ProductsRepository
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const products = await this.productRepository.findByIds(createOrderDto.products);

        if (products.length !== createOrderDto.products.length) {
            throw new NotFoundException('Uno o más productos no existen');
        }

        const total = products.reduce((sum, p) => sum + p.price, 0);

        if (total !== createOrderDto.total) {
            throw new BadRequestException('Total no valido');
        }

        return this.ordersRepository.create({
            ...createOrderDto,
            total
        });
    }

    async update(id: string, updateData: UpdateOrderDto): Promise<Order | null> {
        const products = await this.productRepository.findByIds(updateData.products);

        if (products.length !== updateData.products.length) {
            throw new NotFoundException('Uno o más productos no existen');
        }

        const total = products.reduce((sum, p) => sum + p.price, 0);

        if (total !== updateData.total) {
            throw new BadRequestException('Total no valido');
        }

        const updated = await this.ordersRepository.update(id, updateData);
        if (!updated) throw new NotFoundException('Orden no encontrada');
        return updated;
    }

    // REQUERIMIENTO: Total vendido en el último mes
    async getTotalSoldLastMonth() {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const stats = await this.ordersRepository.getSalesStats(lastMonth);
        return stats[0] || { totalSales: 0 };
    }

    // REQUERIMIENTO: Orden con el monto más alto
    async getHighestOrder() {
        const order = await this.ordersRepository.findHighestOrder();
        if (!order) throw new NotFoundException('No hay órdenes registradas');
        return order;
    }
}

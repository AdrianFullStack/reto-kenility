import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/common/schemas/order.schema';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<Order>
    ) { }

    async create(orderData: any): Promise<Order> {
        const newOrder = new this.orderModel(orderData);

        try {
            await newOrder.save();
            return newOrder;
        } catch (error) {
            if (error.code === 11000) { // Error de duplicado en Mongo
                throw new ConflictException('Order already exists');
            }
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, updateData: any): Promise<Order | null> {
        return this.orderModel.findByIdAndUpdate(id, updateData, { returnDocument: 'after' }).exec();
    }

    async getSalesStats(startDate: Date) {
        return this.orderModel.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            { $group: { _id: null, totalSales: { $sum: '$total' } } }
        ]);
    }

    async findHighestOrder(): Promise<Order | null> {
        return this.orderModel.findOne().sort({ total: -1 }).populate('products').exec();
    }
}
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
    @Prop({ required: true, unique: true })
    orderNumber: string;

    @Prop({ required: true })
    clientName: string;

    @Prop({ required: true, default: 0 })
    total: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
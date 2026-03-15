import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    sku: string;

    @Prop()
    picture: string;

    @Prop({ required: true, min: 0 })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
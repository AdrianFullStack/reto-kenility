import { IsString, IsArray, IsNotEmpty, IsMongoId, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    orderNumber: string;

    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    total: number;

    @IsArray()
    @IsMongoId({ each: true })
    products: string[]; // Array de IDs de MongoDB
}
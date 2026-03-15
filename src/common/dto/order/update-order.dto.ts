import { IsString, IsArray, IsNotEmpty, IsMongoId, IsNumber, Min } from 'class-validator';

export class UpdateOrderDto {
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
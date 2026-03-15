import {
    Controller, Post, Get, Body, Query, Param,
    UseInterceptors, UploadedFile, UseGuards,
    MaxFileSizeValidator,
    FileTypeValidator,
    ParseFilePipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductsService } from './product.service';
import { CreateProductDto } from 'src/common/dto/product/create-product.dto';
import { CustomFileTypeValidator } from 'src/common/validators/file-type.validator';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('picture', {
        storage: diskStorage({
            destination: './uploads/products',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
    }))
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile(
            new ParseFilePipe({
                fileIsRequired: true,
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
                    new CustomFileTypeValidator(),
                ],
            }),
        )
        file: Multer.File,
    ) {
        return this.productsService.create(createProductDto, file?.path);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sort') sort: string = 'name',
        @Query('name') name?: string,
        @Query('sku') sku?: string,
    ) {
        return this.productsService.findAll({ page, limit, sort, name, sku });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        return this.productsService.findById(id);
    }
}
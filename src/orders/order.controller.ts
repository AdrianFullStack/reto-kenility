import { Controller, Post, Get, Body, Param, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from 'src/common/dto/order/create-order.dto';
import { UpdateOrderDto } from 'src/common/dto/order/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createOrderDto: CreateOrderDto
    ) {
        return this.ordersService.create(createOrderDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateOrderDto
    ) {
        return this.ordersService.update(id, updateData);
    }

    // Endpoint de analítica: Total mes
    @Get('stats/total-last-month')
    @UseGuards(JwtAuthGuard)
    async getTotalMonth() {
        return this.ordersService.getTotalSoldLastMonth();
    }

    // Endpoint de analítica: Orden más cara
    @Get('stats/highest')
    @UseGuards(JwtAuthGuard)
    async getHighest() {
        return this.ordersService.getHighestOrder();
    }
}
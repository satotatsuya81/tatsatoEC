import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemsRepository.save(createOrderItemDto);
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemsRepository.find({ relations: ['order', 'product'] });
  }

  async findOne(id: number): Promise<OrderItem> {
    const FindOneOptions: FindOneOptions<OrderItem> = {
      where: { id: id },
    };
    const orderItem = this.orderItemsRepository.findOne(FindOneOptions);
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    return orderItem;
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    await this.orderItemsRepository.update(id, updateOrderItemDto);
    const FindOneOptions: FindOneOptions<OrderItem> = {
      where: { id: id },
    };
    return this.orderItemsRepository.findOne(FindOneOptions);
  }

  async remove(id: number): Promise<void> {
    await this.orderItemsRepository.delete(id);
  }
}

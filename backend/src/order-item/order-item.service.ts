import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsRepository.save(createOrderItemDto);
  }

  findAll() {
    return this.orderItemsRepository.find({ relations: ['order', 'product'] });
  }

  findOne(id: number) {
    return this.orderItemsRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsRepository.update(id, updateOrderItemDto);
  }

  remove(id: number) {
    return this.orderItemsRepository.delete(id);
  }
}

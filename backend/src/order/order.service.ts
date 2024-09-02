import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(newOrder);
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['user', 'orderItems'] });
  }

  async findOne(id: number) {
    const FindOneOptions: FindOneOptions<Order> = {
      where: { id: id },
      relations: ['user', 'orderItems'],
    };
    const order = await this.ordersRepository.findOne(FindOneOptions);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.ordersRepository.update(id, updateOrderDto);
    const FindOneOptions: FindOneOptions<Order> = {
      where: { id: id },
      relations: ['user', 'orderItems'],
    };
    return this.ordersRepository.findOne(FindOneOptions);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}

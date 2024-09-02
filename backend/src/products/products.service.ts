import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.save(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  findOne(id: number): Promise<Product> {
    const FindOneOptions: FindOneOptions<Product> = {
      where: { id: id },
    };
    const product = this.productsRepository.findOne(FindOneOptions);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    const FindOneOptions: FindOneOptions<Product> = {
      where: { id: id },
    };
    return this.productsRepository.findOne(FindOneOptions);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

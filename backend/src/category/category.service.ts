import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const FindOneOptions: FindOneOptions<Category> = {
      where: { id: id },
    };
    const category = await this.categoryRepository.findOne(FindOneOptions);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    const FindOneOptions: FindOneOptions<Category> = {
      where: { id: id },
    };
    return this.categoryRepository.findOne(FindOneOptions);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

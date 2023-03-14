import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: {
        products: true,
        parentCategory: true,
        childCategories: true,
      },
    });
  }

  async getCategoriesByTitle(categoriesList: string[]): Promise<Category[]> {
    console.log(categoriesList);
    const categories = await this.categoryRepository.find({
      where: { title: In(categoriesList || []) },
    });

    if (!categories) {
      throw new BadRequestException('Нет таких категорий!');
    }

    return categories;
  }

  async getOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: {
        products: true,
        parentCategory: true,
        childCategories: true,
      },
    });
  }

  async getOneByTitle(title: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({ title });
  }

  async create(newCategory: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(newCategory);
  }

  async update(
    newCategory: UpdateCategoryDto,
    id: number,
    categories: Category[],
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    category.title = newCategory.title;
    category.childCategories = categories;
    return await this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}

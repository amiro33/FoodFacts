import { Inject, Injectable } from '@nestjs/common';
import { CreateFoodItemDto } from 'src/dto';
import { Category } from 'src/entities/category.entity';
import { FoodItem } from 'src/entities/food_item.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FoodFactsService {
  constructor(
    @Inject('FOOD_ITEMS_REPOSITORY')
    private foodItemRepository: Repository<FoodItem>,

    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}
  async createFood(food: CreateFoodItemDto) {
    const item = this.foodItemRepository.create(food);
    return await this.foodItemRepository.save(item);
  }
  async createCategory(name: string) {
    const cat = this.categoryRepository.create({ name });
    return await this.categoryRepository.save(cat);
  }
  async getCategories() {
    return await this.foodItemRepository.find();
  }
  async getFoods() {
    return await this.foodItemRepository.find();
  }
  async searchFoods(searchTerm: string): Promise<FoodItem[]> {
    return await this.foodItemRepository.find({
      where: {
        name: Like(searchTerm),
      },
    });
  }
}

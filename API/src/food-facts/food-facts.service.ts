import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateFoodItemDto, FDCGetResponse, FDCItem } from 'src/dto';
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

    private configService: ConfigService,
  ) {}
  async createFood(food: CreateFoodItemDto) {
    const item = this.foodItemRepository.create(food);
    return await this.foodItemRepository.save(item);
  }
  async createCategory(name: string) {
    const cat = this.categoryRepository.create({ name });
    return await this.categoryRepository.save(cat);
  }
  async batchFoodSearch(searchTerms: Array<string>) {
    console.log('Batch Search');
    const response: Array<FDCItem> = [];
    for (const term of searchTerms) {
      const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(term)}&api_key=${this.configService.get('FDC_API_KEY')}&pageSize=10`;
      const req = await fetch(searchUrl);
      const res: FDCGetResponse = await req.json();
      const topResult = res.foods[0];
      response.push(topResult);
    }
    return response;
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

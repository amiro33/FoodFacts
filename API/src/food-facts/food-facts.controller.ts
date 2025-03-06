import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FoodFactsService } from './food-facts.service';
import { BatchSearchDto, CreateCategoryDto, CreateFoodItemDto } from 'src/dto';
import { ConfigService } from '@nestjs/config';

@Controller('food-facts')
export class FoodFactsController {
  constructor(
    private readonly foodFactsService: FoodFactsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('search')
  async searchFood(@Query('q') searchTerm: string) {
    return await this.foodFactsService.searchFoods(searchTerm);
  }
  @Post('batchSearch')
  async searchFoodBatch(@Body() batchSearch: BatchSearchDto) {
    console.log('Batch Search');
    const response = [];
    for (const term of batchSearch.foods) {
      const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(term)}&api_key=${this.configService.get('FDC_API_KEY')}&pageSize=10`;
      // const searchUrl = `https://world.openfoodfacts.org/api/v2/search?categories_tags_en=${encodeURIComponent(term)}&nutrition_grades_tags=c&unique_scans_n_gt=100&fields=product_name,nutriments,categories,unique_scans_n&lc=en`;

      const req = await fetch(searchUrl);
      const res = await req.json();
      console.log(res);
    }
  }
  @Get('')
  async getAllFoods() {
    return await this.foodFactsService.getFoods();
  }
  @Post('')
  async createFoodItem(@Body() createFoodItemDto: CreateFoodItemDto) {
    console.log(createFoodItemDto);
    return this.foodFactsService.createFood(createFoodItemDto);
  }
  @Get('categories')
  async getCategories() {
    return await this.foodFactsService.getCategories();
  }
  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    return await this.foodFactsService.createCategory(createCategoryDto.name);
  }
}

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
    return await this.foodFactsService.batchFoodSearch(batchSearch.foods);
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
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FoodFactsService } from './food-facts.service';
import {
  BatchSearchDto,
  CreateCategoryDto,
  CreateFoodItemDto,
  FoodFactsItem,
  FoodNutrient,
} from 'src/dto';
import { ConfigService } from '@nestjs/config';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
@ApiExtraModels(FoodNutrient)
@Controller('food-facts')
export class FoodFactsController {
  constructor(
    private readonly foodFactsService: FoodFactsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('alternatives')
  async searchFood(@Query('q') searchTerm: string) {
    return await this.foodFactsService.searchFoods(searchTerm);
  }
  @Post('batchSearch')
  @ApiResponse({ status: 200, type: [FoodFactsItem] }) // Ensures proper schema exposure
  async searchFoodBatch(
    @Body() batchSearch: BatchSearchDto,
  ): Promise<FoodFactsItem[]> {
    return await this.foodFactsService.batchFoodSearch(batchSearch.foods);
  }
  @Get('')
  async getAllFoods() {
    return await this.foodFactsService.getFoods();
  }
  @Post('')
  async createFoodItem(@Body() createFoodItemDto: CreateFoodItemDto) {
    return this.foodFactsService.createFood(createFoodItemDto);
  }
  @Get('categories')
  async getCategories() {
    return await this.foodFactsService.getCategories();
  }
  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.foodFactsService.createCategory(createCategoryDto.name);
  }
}

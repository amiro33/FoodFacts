import { ApiProperty, ApiSchema } from '@nestjs/swagger';

export class CreateFoodItemDto {
  readonly name: string;
  readonly barCode: string;
  readonly category_id: number;
}

export class CreateCategoryDto {
  @ApiProperty()
  readonly name: string;
}

export class BatchSearchDto {
  @ApiProperty({
    example: ['Orange Juice', 'Ground Beef'],
  })
  readonly foods: Array<string>;
}
export class FDCGetResponse {
  foods: Array<FDCItem>;
}
export class FDCItem {
  readonly fdcId: string;
  readonly description: string;
  readonly dataType: string;
  readonly foodNutrients: Array<any>;
  readonly brandName: string;
  readonly foodCategory: string;
  readonly servingSize: string;
}

@ApiSchema({
  description: 'Properties used to sign in and sign out of the app.',
})
export class AuthDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly password: string;
}
//TODO: maybe move this into its own database entry?
export class FoodFactsItem {
  @ApiProperty()
  fdcId: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  nutrients: Array<FoodNutrient>;
  @ApiProperty()
  servingSize: string;
  @ApiProperty() additionalInfo: string;
}
export class FoodNutrient {
  @ApiProperty()
  nutrientId: number;
  @ApiProperty()
  nutrientName: string;
  @ApiProperty()
  nutrientNumber: string;
  @ApiProperty()
  unitName: string;
  @ApiProperty()
  derivationCode: string;
  @ApiProperty()
  derivationDescription: string;
  @ApiProperty()
  derivationId: number;
  @ApiProperty()
  value: number;
  foodNutrientSourceId: number;
  @ApiProperty()
  foodNutrientSourceCode: string;
  @ApiProperty()
  foodNutrientSourceDescription: string;
  @ApiProperty()
  rank: string;
  @ApiProperty()
  indentLevel: number;
  @ApiProperty()
  foodNutrientId: number;
  @ApiProperty()
  percentDailyValue: number;
}
@ApiSchema({
  description:
    'Data must be in American units (but can be converted/shown in other ways in the frontend.',
})
export class AdditionalUserPropsDTO {
  @ApiProperty()
  sex: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  weight: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
}
// description: 'ORANGE JUICE',
// dataType: 'Branded',
// gtinUpc: '072730292413',
// publishedDate: '2021-10-28',
// brandOwner: 'Prairie Farms Dairy, Inc.',
// brandName: 'PRAIRIE FARMS',
// ingredients: 'ORANGE JUICE, CALCIUM PHOSPHATE* AND VITAMIN D3.*',
// marketCountry: 'United States',
// foodCategory: 'Fruit & Vegetable Juice, Nectars & Fruit Drinks',
// modifiedDate: '2017-07-14',
// dataSource: 'LI',
// packageWeight: '1.75 L/1.85 Quart/59 fl o',
// servingSizeUnit: 'ml',
// servingSize: 240,
// householdServingFullText: '8 OZA',
// tradeChannels: [Array],
// allHighlightFields: '<b>Ingredients</b>: <em>ORANGE</em> <em>JUICE</em>, CALCIUM PHOSPHATE* AND VITAMIN D3.*',
// score: 1096.0236,
// microbes: [],
// foodNutrients: [Array],
// finalFoodInputFoods: [],
// foodMeasures: [],
// foodAttributes: [],
// foodAttributeTypes: [],
// foodVersionIds: []

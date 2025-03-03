export class CreateFoodItemDto {
  readonly name: string;
  readonly barCode: string;
  readonly category_id: number;
}

export class CreateCategoryDto {
  readonly name: string;
}

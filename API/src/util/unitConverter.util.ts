export class UnitConverter {
  static scaleNutrients(ingredient, fdaData) {
    /**
     * Scales nutrient values based on the given ingredient quantity.
     * @param {Object} ingredient - Ingredient object with 'description' and 'quantity'
     * @param {Object} fdaData - FDA API response containing food nutrients and serving size info
     * @returns {Object} Scaled nutrient values
     */

    const { quantity, unit } = this.parseQuantity(ingredient.quantity); // Convert quantity to grams if needed
    const servingWeight = this.getServingWeight(fdaData); // Find standard serving weight from FDA response

    const scaledNutrients = {};
    fdaData.foodNutrients.forEach((nutrient) => {
      const valuePerServing = nutrient.value;
      const scaledValue = (valuePerServing / servingWeight) * quantity;
      scaledNutrients[nutrient.nutrientName] =
        Math.round(scaledValue * 100) / 100;
    });

    return {
      ingredient: ingredient.description,
      scaledNutrients,
    };
  }

  static parseQuantity(quantityStr) {
    /** Parses a quantity string into a numeric value and unit. */
    const parts = quantityStr.split(' ');
    if (parts.length === 2) {
      return { quantity: parseFloat(parts[0]), unit: parts[1].toLowerCase() };
    } else if (parts.length === 1 && !isNaN(parts[0])) {
      return { quantity: parseFloat(parts[0]), unit: 'g' };
    }
    return { quantity: 0, unit: 'unknown' };
  }

  static getServingWeight(fdaData) {
    /** Extracts a reasonable serving weight from FDA response. */
    if (fdaData.foodMeasures && fdaData.foodMeasures.length > 0) {
      return fdaData.foodMeasures[0].gramWeight; // Use first available weight
    }
    return 100; // Default to per 100g if unknown
  }

  // Example input from ChatGPT response
  // const ingredients = [
  //     { description: "Beef Patty", quantity: "200 g" },
  //     { description: "Fresh Lettuce", quantity: "2 leaves" }
  // ];

  // // Example FDA data lookup (mocked for now)
  // const fdaDataExample = {
  //     description: "Beef, ground, patty",
  //     foodNutrients: [
  //         { nutrientName: "Energy", value: 272, unitName: "KCAL" },
  //         { nutrientName: "Protein", value: 25.45, unitName: "G" }
  //     ],
  //     foodMeasures: [{ disseminationText: "1 medium patty", gramWeight: 85 }]
  // };

  // // Normalize nutrients for each ingredient
  // const normalizedData = ingredients.map(ing => scaleNutrients(ing, fdaDataExample));

  // console.log(JSON.stringify(normalizedData, null, 2));
}

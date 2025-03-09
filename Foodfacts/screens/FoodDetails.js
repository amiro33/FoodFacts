// screens/FoodDetailsScreen.js
// unless you want see the whole process comment out the console.logs
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView , Button} from "react-native";

const FoodDetails = ({ route }) => {
  const { photoUri, result , ingredients, nutrition} = route.params;
  console.log('Photo URI:', photoUri);
  console.log('Result:', result);
  console.log('Ingredients:', ingredients);
  console.log('Nutrition:', nutrition);

  const totalProtein = nutrition.reduce((total, item) => {
    return total + (item.proteinValue || 0);
  }, 0).toFixed(2);;
  
  const totalEnergy = nutrition.reduce((total, item) => {
    return total + (item.energyValue || 0);
  }, 0).toFixed(2);;
  
  const totalLipid = nutrition.reduce((total, item) => {
    return total + (item.totalLipidValue || 0);
  }, 0).toFixed(2);;
  
  const totalCarbohydrate = nutrition.reduce((total, item) => {
    return total + (item.carbohydrateValue || 0);
  }, 0).toFixed(2);;
  
  console.log("Total Protein:", totalProtein);
  console.log("Total Energy:", totalEnergy);
  console.log("Total Lipid (Fat):", totalLipid);
  console.log("Total Carbohydrate:", totalCarbohydrate);

  const nutritions = {
    proteins : totalProtein,
    energy :totalEnergy,
    fat : totalLipid,
    carbs : totalCarbohydrate,
  };

  const saveToLog = () => {
    const logData = {
      result: result,
      nutrition:nutritions,
    };
    console.log('Saving to Log :' , logData);
    alert('Saved to log!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Food Analysis Result</Text>

        <Image source={{ uri: photoUri }} style={styles.foodImage} />

        <Text style={styles.resultTitle}>Description:</Text>
        <Text style={styles.resultText}>{result}</Text>

        <Text style={styles.resultTitle}>Ingredients:</Text>
        <View style={styles.ingredientsList}>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>
                {ingredient.quantity} {ingredient.description}
              </Text>
            ))
          ) : (
            <Text>No ingredients found.</Text>
          )}

        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Analysis Total Nutrition</Text>
          <View style={styles.card}>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Total Proteins</Text>
                <Text style={styles.nutritionValue}>{nutritions.proteins} g</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.nutritionLabel}>Energy</Text>
                <Text style={styles.nutritionValue}>{nutritions.energy} kcal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionabel}>Fat</Text>
                <Text style={styles.nutritionValue}>{nutritions.fat} g</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.nutritionLabel}>Carbs</Text>
                <Text style={styles.nutritionValue}>{nutritions.carbs} g</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save into Log" onPress={saveToLog} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  foodImage: {
    width: "80%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
  },
  ingredientsList: {
    width: "100%",
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
},

  card: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: '100%',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nutritionItem: {
    alignItems: 'center',
    width: '30%',
  },
  nutritionLabel: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#555',
  },
  nutritionValue: {
  fontSize: 12,
  color: '#333',  
  },


});

export default FoodDetails;





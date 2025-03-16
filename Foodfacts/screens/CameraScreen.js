// screens/CameraScreen.js
// unless you want see the whole process comment out the console.logs
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import foodLogo from "../assets/camera2.png";

const prompt = `
  You are to recognize a food (may be prepared, or may be an individual ingredient) and provide an ingredients list based on what is visible in the picture.
  Quantities should be provided in standard measuring values, like oz or g, and not generic values like '1 chicken patty'.
  Fresh Vegetables should be labeled as such. E.g. 'Fresh Tomato'.
  For the response, please respond in JSON only, without any extraneous formatting (like backticks), using this format:

  {
    "success": true,
    "ingredients": [
      {
        "quantity": "8 oz",
        "description": "Peanut Butter",
        "confidence": "high"
      },
      {
        "quantity": "1 tsp",
        "description": "Salt",
        "confidence": "low"
      }
    ],
    "description": "Peanut Butter Sandwich"
  }

  Rules for Confidence Levels:

      High confidence → Clearly visible ingredients (e.g., a chicken breast, tomato slices, avocado).
      Low confidence → Ingredients that are usually present but not visible (e.g., seasoning, marinade, oil used for cooking`;

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setPhoto(null);
      setResult(null);
    }, []),
  );

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhoto(photo.uri);
      setIsAnalyzing(true);
      analyzeImage(photo.uri);
    }
  };

  const analyzeImage = async (imageUri) => {
    try {
      console.log("Analyzing image...");
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: "base64",
      });

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  {
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${base64}` },
                  },
                ],
              },
            ],
            max_tokens: 300,
          }),
        },
      );

      const data = await response.json();
      console.log("Raw Response:", JSON.stringify(data, null, 2));
      if (data.error) {
        console.error("API Error:", data.error);
        setResult(`API Error: ${data.error.message}`);
        setIsAnalyzing(false);
        return;
      }
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        console.error("Empty or missing response content.");
        setResult("Invalid AI response.");
        setIsAnalyzing(false);
        return;
      }

      console.log("Raw AI Response:", content);
      let cleanedContent = content
        .replace(/^```json\n/, "")
        .replace(/\n```$/, "");

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(cleanedContent);
      } catch (error) {
        console.error("Failed to parse API response:", error);
        setResult("Invalid response from AI.");
        setIsAnalyzing(false);
        return;
      }

      if (jsonResponse.success) {
        const ingredients = jsonResponse.ingredients.map((ing) => ({
          quantity: ing.quantity,
          description: ing.description,
        }));
        const dishDescription = jsonResponse.description;
        console.log("Extracted Ingredients:", ingredients);
        console.log("Dish Description:", dishDescription);
        const nutritionData = await fetchNutritionData(ingredients);

        navigation.navigate("FoodDetails", {
          photoUri: imageUri,
          result: dishDescription,
          ingredients: ingredients,
          nutrition: nutritionData,
        });
      } else {
        console.error("Invalid response format.");
        setResult("Could not identify ingredients.");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Error analyzing image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fetchNutritionData = async (ingredients) => {
    try {
      const ingredientDescriptions = ingredients.map(
        (ingredient) => ingredient.description,
      );
      const response = await fetch(
        "http://3.144.41.253:3000/food-facts/batchSearch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foods: ingredientDescriptions }),
        },
      );
      const data = await response.json();
      console.log("Nutrition API Response:", data);
      if (!Array.isArray(data)) {
        console.error("Nutrition data is not an array:", data);
        return []; // Return an empty array if the data isn't in the expected format
      }

      // Look for protein in the nutrition data
      const nutritionData = data
        .map((item) => {
          const protein = item.foodNutrients.find(
            (nutrient) => nutrient.nutrientName === "Protein",
          );
          const energy = item.foodNutrients.find(
            (nutrient) => nutrient.nutrientName === "Energy",
          );
          const totalLipid = item.foodNutrients.find(
            (nutrient) => nutrient.nutrientName === "Total lipid (fat)",
          );
          const carbohydrate = item.foodNutrients.find(
            (nutrient) =>
              nutrient.nutrientName === "Carbohydrate, by difference",
          );

          if (protein || energy || totalLipid || carbohydrate) {
            return {
              description: item.description,
              proteinValue: protein ? protein.value : 0,
              proteinUnit: protein ? protein.unitName : "",
              energyValue: energy ? energy.value : 0,
              energyUnit: energy ? energy.unitName : "",
              totalLipidValue: totalLipid ? totalLipid.value : 0,
              totalLipidUnit: totalLipid ? totalLipid.unitName : "",
              carbohydrateValue: carbohydrate ? carbohydrate.value : 0,
              carbohydrateUnit: carbohydrate ? carbohydrate.unitName : "",
            };
          }
        })
        .filter((item) => item !== undefined);

      console.log(nutritionData);

      nutritionData.forEach((item) => {
        console.log(`Food: ${item.description}`);
        console.log(`Protein: ${item.proteinValue} ${item.proteinUnit}`);
        console.log(`Energy: ${item.energyValue} ${item.energyUnit}`);
        console.log(
          `Total Lipid (Fat): ${item.totalLipidValue} ${item.totalLipidUnit}`,
        );
        console.log(
          `Carbohydrate: ${item.carbohydrateValue} ${item.carbohydrateUnit}`,
        );
        console.log("----------------------------");
      });
      return nutritionData;
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      return [];
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView facing="back" style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Image source={foodLogo} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </CameraView>
      {isAnalyzing && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Analyzing image...</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  captureButton: {
    padding: 10,
    backgroundColor: "transparent",
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraScreen;

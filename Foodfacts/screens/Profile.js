import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Updated import
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

export const Profile = ({ route }) => {
  const { user, loading } = useContext(UserContext);
  const { weight = 199.8, height = 5.9, sex = "male", age = 30 } = user || {};

  const [activityFactor, setActivityFactor] = useState("sedentary");
  const [goal, setGoal] = useState("loss");
  const [bmi, setBmi] = useState(null);
  const [goals, setGoals] = useState({});
  const CreateGoals = async () => {
    try {
      const existGoals = await AsyncStorage.getItem("goal");
      if (!existGoals) {
        await AsyncStorage.setItem("Goal", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error Create Goals", error);
    }
  };
  useEffect(() => {
    CreateGoals();
  }, []);

  // Load goals from AsyncStorage when the component mounts
  useEffect(() => {
    const loadGoals = async () => {
      const savedGoals = await AsyncStorage.getItem("goals");
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      }
    };
    loadGoals();
  }, []);

  // Update goals in AsyncStorage when they change
  useEffect(() => {
    const saveGoals = async () => {
      await AsyncStorage.setItem("goals", JSON.stringify(goals));
    };
    if (goals.dailyCalories) {
      saveGoals();
    }
  }, [goals]);

  // Update BMI, BMR, and goals based on user input
  useEffect(() => {
    const bmiValue = calculateBMI(weight, height);
    const activityMultiplier = getActivityFactor(activityFactor);
    const bmr = calculateBMR(weight, height, age, sex);
    const tbmr = bmr * activityMultiplier;
    const calorieGoal = calculateCalorieGoal(tbmr, goal);
    const protein = (calorieGoal * 0.3) / 4;
    const fat = (calorieGoal * 0.25) / 9;
    const carbs = (calorieGoal * 0.45) / 4;

    setBmi(bmiValue);
    setGoals({
      dailyCalories: calorieGoal.toFixed(0),
      protein: protein.toFixed(0),
      fat: fat.toFixed(0),
      carbs: carbs.toFixed(0),
    });
  }, [weight, height, age, sex, activityFactor, goal]);

  const calculateBMI = (weight, height) => {
    const weightkg = weight * 0.453592;
    const heightcms = height * 30.48;
    const bmiValue = weightkg / (heightcms / 100) ** 2;
    return bmiValue.toFixed(2);
  };

  const calculateBMR = (weight, height, age, sex) => {
    const weightkg = weight * 0.453592;
    const heightcms = height * 30.48;
    let bmr;

    if (sex === "male") {
      bmr = 10 * weightkg + 6.25 * heightcms - 5 * age + 5;
    } else if (sex === "female") {
      bmr = 10 * weightkg + 6.25 * heightcms - 5 * age - 161;
    } else {
      bmr = 10 * weightkg + 6.25 * heightcms - 5 * age;
    }
    return bmr;
  };

  const getActivityFactor = (activityLevel) => {
    switch (activityLevel) {
      case "sedentary":
        return 1.2;
      case "light":
        return 1.375;
      case "moderate":
        return 1.55;
      case "active":
        return 1.725;
      case "very active":
        return 1.9;
      default:
        return 1.2;
    }
  };

  const calculateCalorieGoal = (tbmr, goal) => {
    switch (goal) {
      case "loss":
        return tbmr - 500;
      case "gain":
        return tbmr + 500;
      case "maintain":
      default:
        return tbmr;
    }
  };

  const metrics = {
    weight: weight,
    height: height,
    bmi: bmi,
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state while user data is being loaded
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>
        Hello, {user?.first_name || "GuestUser"}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Body Metrics</Text>
        <View style={styles.card}>
          <View style={styles.metricRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Weight</Text>
              <Text style={styles.metricValue}>{weight} lbs</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Height</Text>
              <Text style={styles.metricValue}>{height} ft</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>BMI</Text>
              <Text style={styles.metricValue}>{metrics.bmi}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Activity Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={activityFactor}
            style={styles.picker}
            onValueChange={(itemValue) => setActivityFactor(itemValue)}
          >
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Lightly Active" value="light" />
            <Picker.Item label="Moderately Active" value="moderate" />
            <Picker.Item label="Very Active" value="active" />
            <Picker.Item label="Super Active" value="very active" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Goal</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={goal}
            style={styles.picker}
            onValueChange={(itemValue) => setGoal(itemValue)}
          >
            <Picker.Item label="Weight Loss" value="loss" />
            <Picker.Item label="Weight Gain" value="gain" />
            <Picker.Item label="Maintain Weight" value="maintain" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Goals</Text>
        <View style={styles.card}>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>Daily Calories</Text>
            <Text style={styles.goalValue}>{goals.dailyCalories} kcal</Text>
          </View>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>Protein</Text>
            <Text style={styles.goalValue}>{goals.protein}g</Text>
          </View>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>Carbohydrates</Text>
            <Text style={styles.goalValue}>{goals.carbs}g</Text>
          </View>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>Fats</Text>
            <Text style={styles.goalValue}>{goals.fat}g</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: "100%",
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  metricItem: {
    alignItems: "center",
    width: "30%",
  },
  goalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  goalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0891b2",
  },
  metricLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  metricValue: {
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  picker: {
    height: 60,
    width: "100%",
    paddingVertical: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../GlobalStyles';

export const Profile = ({ route }) => {
    const { weight = 199.8, height = 5.9, sex = "male", age = 30, activityFactor = "sedentary", goal = "loss" } = route.params || {}; 
    const username = "John Doe"; 
    const [bmi, setBmi] = useState(null);
    const [goals, setGoals] = useState({});

    useEffect(() => {
        const bmiValue = calculateBMI(weight, height);
        const activityMultiplier = getActivityFactor(activityFactor);
        const bmr = calculateBMR(weight, height, age, sex);
        const tbmr = bmr * activityMultiplier;
        const calorieGoal = calculateCalorieGoal(tbmr, goal);
        const protein = (calorieGoal* 0.3)/4;
        const fat = calorieGoal * 0.25 / 9;
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
        const bmiValue = weightkg / ((heightcms / 100) ** 2);
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
            case 'sedentary': return 1.2;
            case 'light': return 1.375;
            case 'moderate': return 1.55;
            case 'active': return 1.725;
            case 'very active': return 1.9;
            default: return 1.2;
        }
    };

    const calculateCalorieGoal = (tbmr, goal) => {
        switch (goal) {
            case 'loss':
                return tbmr - 500; 
            case 'gain':
                return tbmr + 500; 
            case 'maintain':
            default:
                return tbmr; // No change for maintenance
        }
    };

    const metrics = {
        weight: weight,
        height: height,
        bmi: bmi,
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={styles.greeting}>Hello, {username}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Body Metrics</Text>
                <View style={styles.card}>
                    <View style={styles.metricRow}>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricLabel}>Weight</Text>
                            <Text style={styles.metricValue}>{metrics.weight} lbs</Text>
                        </View>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricLabel}>Height</Text>
                            <Text style={styles.metricValue}>{metrics.height} ft</Text>
                        </View>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricLabel}>BMI</Text>
                            <Text style={styles.metricValue}>{metrics.bmi}</Text>
                        </View>
                    </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    greeting: {
        fontSize: 28, // Increased font size for the greeting
        fontWeight: 'bold',
        color: '#333',  
        textAlign: 'center',
        marginBottom: 20,
    },

    section: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
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
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    goalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    metricItem: {
        alignItems: 'center',
        width: '30%',
    },
    goalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    goalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0891b2',
    },
    metricLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    metricValue: {
        fontSize: 16,
        color: '#333',
    },
});

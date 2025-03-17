import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';


export const StatsScreen = () => {
  const today = format(new Date(), 'EEEE,MMMM d');
  // Initialize progress object, using 0 for current values if undefined or null
  const [goals, setGoals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  
  const [totals, setTotals] = useState({
    proteins: 0,
    energy: 0,
    fat: 0,
    carbs: 0,
  });

  // Initialize progress object, using 0 for current values if undefined or null
  const progress = {
    calories: { current: totals.energy, goal: goals.calories },
    protein: { current: totals.proteins, goal: goals.protein },
    carbs: { current: totals.carbs, goal: goals.carbs },
    fats: { current: totals.fat, goal: goals.fats },
  };

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem("goals");
        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);
          console.log("Saved Goals:", parsedGoals);
  
          // Set default values if keys are missing
          setGoals({
            calories: parsedGoals.dailyCalories || 0,
            protein: parsedGoals.protein || 0,
            carbs: parsedGoals.carbs || 0,
            fats: parsedGoals.fat || 0,
          });
        } else {
          console.log("No saved goals found, setting defaults.");
        }
      } catch (error) {
        console.error("❌ Error loading goals:", error);
      }
    };

    loadGoals();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("StatsScreen focused");
  
      // Load updated totals whenever StatsScreen is focused
      const loadTotals = async () => {
        try {
          const savedTotals = await AsyncStorage.getItem("totals");
          if (savedTotals) {
            const parsedTotals = JSON.parse(savedTotals);
            console.log("📥 Loaded Totals from AsyncStorage:", parsedTotals);
            setTotals(parsedTotals);
          } else {
            console.log("No saved totals found.");
          }
        } catch (error) {
          console.error("Error loading totals:", error);
        }
      };

      // Load updated goals whenever StatsScreen is focused
      const loadGoals = async () => {
        try {
          const savedGoals = await AsyncStorage.getItem("goals");
          if (savedGoals) {
            const parsedGoals = JSON.parse(savedGoals);
            console.log("Saved Goals on Focus:", parsedGoals);
  
            // Set default values if keys are missing
            setGoals({
              calories: parsedGoals.dailyCalories || 0,
              protein: parsedGoals.protein || 0,
              carbs: parsedGoals.carbs || 0,
              fats: parsedGoals.fat || 0,
            });
          } else {
            console.log("No saved goals found on focus.");
          }
        } catch (error) {
          console.error("❌ Error loading goals on focus:", error);
        }
      };
  
      loadTotals();  // Load latest totals whenever StatsScreen is focused
      loadGoals();   // Load latest goals whenever StatsScreen is focused
    }, [])
  );
  
  // Log state changes for `totals` and `goals`
  useEffect(() => {
    console.log("Updated Totals state:", totals);
  }, [totals]);

  useEffect(() => {
    console.log("Updated Goals state:", goals);
  }, [goals]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.title}>Daily Summary</Text>
        </View>

        <View style={styles.statsContainer}>
          {Object.entries(progress).map(([key, { current, goal }]) => (
            <View key={key} style={styles.statCard}>
              <Text style={styles.statTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Text style={styles.statValue}>
                {current} <Text style={styles.statUnit}>/ {goal}</Text>
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${Math.min((current / goal) * 100, 100)}%` }]}></View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  date: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statsContainer: {
    padding: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statTitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  statUnit: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: 'normal',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0891b2',
    borderRadius: 3,
  },
});

export default StatsScreen;

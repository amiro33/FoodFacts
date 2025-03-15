import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, set } from 'date-fns';
import Svg, { Path, Circle } from 'react-native-svg';

export const StatsScreen = () => {
  const today = format(new Date(), 'EEEE,MMMM d');
  // Initialize progress object, using 0 for current values if undefined or null
  const [goals, setGoals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
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
    const loadGoalAndLogs = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem("goals");
        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);
          console.log('Saved Goals:', parsedGoals); 
          // Set defaults if the keys are missing
          setGoals({
            calories: parsedGoals.dailyCalories || 0,
            protein: parsedGoals.protein || 0,
            carbs: parsedGoals.carbs || 0,
            fats: parsedGoals.fat || 0
          });
        } else {
          console.log('No saved goals found, setting defaults.');
        }
        // Load logs
      const savedLogs = await AsyncStorage.getItem("logs");
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs);
        console.log('Saved Logs:', parsedLogs);
        setTotals({
          proteins: parsedLogs.protein || 0,
          energy: parsedLogs.engery || 0,
          fat: parsedLogs.fat|| 0,
          carbs: parsedLogs.carbs || 0,
        });

      } else {
        console.log('No saved logs found.');
      }
      } catch (error) {
        console.error("Error loading goals", error);
      }
    };
    loadGoalAndLogs();
  }, []);

  // Calculate total and angles for pie chart
  const total = progress.protein.current + progress.carbs.current + progress.fats.current;
  const angles = {
    protein: total > 0 ? (progress.protein.current / total) * 360 : 0,
    carbs: total > 0 ? (progress.carbs.current / total) * 360 : 0,
    fats: total > 0 ? (progress.fats.current / total) * 360 : 0,
  };

  // Calculate percentages for display
  const proteinPercentage = total > 0 ? Math.round((angles.protein / 360) * 100) : 0;
  const carbsPercentage = total > 0 ? Math.round((angles.carbs / 360) * 100) : 0;
  const fatsPercentage = total > 0 ? Math.round((angles.fats / 360) * 100) : 0;

  // Helper function to create pie chart slices
  const createPieSlice = (startAngle, endAngle) => {
    const center = 50;
    const radius = 50;
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);

    const startX = center + radius * Math.cos(start);
    const startY = center + radius * Math.sin(start);
    const endX = center + radius * Math.cos(end);
    const endY = center + radius * Math.sin(end);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  let currentAngle = 0;
  const proteinPath = createPieSlice(currentAngle, currentAngle + angles.protein);
  currentAngle += angles.protein;
  const carbsPath = createPieSlice(currentAngle, currentAngle + angles.carbs);
  currentAngle += angles.carbs;
  const fatsPath = createPieSlice(currentAngle, currentAngle + angles.fats);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.title}>Daily Summary</Text>
        </View>

        <View style={styles.macroDistribution}>
          <Text style={styles.sectionTitle}>Macro Distribution</Text>
          <View style={styles.chartContainer}>
            <Svg height="200" width="200" viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="48" fill="white" />
              <Path d={proteinPath} fill="#0891b2" />
              <Path d={carbsPath} fill="#0d9488" />
              <Path d={fatsPath} fill="#7c3aed" />
            </Svg>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#0891b2' }]} />
                <Text style={styles.legendText}>Protein {proteinPercentage}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#0d9488' }]} />
                <Text style={styles.legendText}>Carbs {carbsPercentage}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#7c3aed' }]} />
                <Text style={styles.legendText}>Fats {fatsPercentage}%</Text>
              </View>
            </View>
          </View>
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
  macroDistribution: {
    padding: 20,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#64748b',
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

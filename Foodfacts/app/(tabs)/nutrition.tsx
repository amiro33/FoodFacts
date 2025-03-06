import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartPie as PieChart, Timer, Utensils } from 'lucide-react-native';

export default function Nutrition() {
  const meals = [
    {
      name: 'Breakfast',
      time: '8:30 AM',
      calories: 450,
      protein: 25,
      carbs: 45,
      fats: 20,
    },
    {
      name: 'Lunch',
      time: '1:00 PM',
      calories: 650,
      protein: 35,
      carbs: 75,
      fats: 22,
    },
    {
      name: 'Snack',
      time: '4:00 PM',
      calories: 200,
      protein: 10,
      carbs: 25,
      fats: 8,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition Tracking</Text>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroCard}>
            <View style={styles.macroHeader}>
              <PieChart size={24} color="#0891b2" />
              <Text style={styles.macroTitle}>Macros</Text>
            </View>
            <View style={styles.macroStats}>
              <View style={styles.macroStat}>
                <Text style={styles.macroValue}>120g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
              </View>
              <View style={styles.macroStat}>
                <Text style={styles.macroValue}>145g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
              <View style={styles.macroStat}>
                <Text style={styles.macroValue}>65g</Text>
                <Text style={styles.macroLabel}>Fats</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          {meals.map((meal, index) => (
            <View key={index} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View style={styles.mealInfo}>
                  <Utensils size={20} color="#0891b2" />
                  <Text style={styles.mealName}>{meal.name}</Text>
                </View>
                <View style={styles.mealTime}>
                  <Timer size={16} color="#64748b" />
                  <Text style={styles.timeText}>{meal.time}</Text>
                </View>
              </View>
              <View style={styles.mealStats}>
                <View style={styles.mealStat}>
                  <Text style={styles.statLabel}>Calories</Text>
                  <Text style={styles.statValue}>{meal.calories}</Text>
                </View>
                <View style={styles.mealStat}>
                  <Text style={styles.statLabel}>Protein</Text>
                  <Text style={styles.statValue}>{meal.protein}g</Text>
                </View>
                <View style={styles.mealStat}>
                  <Text style={styles.statLabel}>Carbs</Text>
                  <Text style={styles.statValue}>{meal.carbs}g</Text>
                </View>
                <View style={styles.mealStat}>
                  <Text style={styles.statLabel}>Fats</Text>
                  <Text style={styles.statValue}>{meal.fats}g</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  macrosContainer: {
    padding: 20,
  },
  macroCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  macroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginLeft: 8,
  },
  macroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroStat: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  mealCard: {
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
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 8,
  },
  mealTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  mealStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealStat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
});
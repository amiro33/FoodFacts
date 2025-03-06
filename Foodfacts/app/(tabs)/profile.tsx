import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ChevronRight, Scale, Target, Bell } from 'lucide-react-native';

export default function Profile() {
  const goals = {
    dailyCalories: 2000,
    protein: 120,
    carbs: 250,
    fats: 65,
  };

  const metrics = {
    weight: 75,
    height: 175,
    bmi: 24.5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body Metrics</Text>
          <View style={styles.card}>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Weight</Text>
                <Text style={styles.metricValue}>{metrics.weight} kg</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>Height</Text>
                <Text style={styles.metricValue}>{metrics.height} cm</Text>
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
              <Text style={styles.goalValue}>{goals.fats}g</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Scale size={20} color="#0891b2" />
                <Text style={styles.settingText}>Update Measurements</Text>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Target size={20} color="#0891b2" />
                <Text style={styles.settingText}>Adjust Goals</Text>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Bell size={20} color="#0891b2" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Settings size={20} color="#0891b2" />
                <Text style={styles.settingText}>App Settings</Text>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
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
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  goalLabel: {
    fontSize: 16,
    color: '#0f172a',
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0891b2',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#0f172a',
  },
});
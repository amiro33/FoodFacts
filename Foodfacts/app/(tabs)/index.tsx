import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import Svg, { Path, Circle } from 'react-native-svg';

export default function Dashboard() {
  const today = format(new Date(), 'EEEE, MMMM d');
  const progress = {
    calories: { current: 1450, goal: 2000 },
    protein: { current: 85, goal: 120 },
    carbs: { current: 165, goal: 250 },
    fats: { current: 55, goal: 65 },
  };

  // Calculate macro percentages for pie chart
  const total = progress.protein.current + progress.carbs.current + progress.fats.current;
  const angles = {
    protein: (progress.protein.current / total) * 360,
    carbs: (progress.carbs.current / total) * 360,
    fats: (progress.fats.current / total) * 360,
  };

  // Helper function to create pie chart paths
  const createPieSlice = (startAngle: number, endAngle: number) => {
    const center = 50;
    const radius = 50;
    
    // Convert angles to radians
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    
    // Calculate points
    const startX = center + radius * Math.cos(start);
    const startY = center + radius * Math.sin(start);
    const endX = center + radius * Math.cos(end);
    const endY = center + radius * Math.sin(end);
    
    // Create arc flag
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    // Create path
    return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  // Calculate paths for each macro
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
          <Text style={styles.date}>{today}</Text>
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
                <Text style={styles.legendText}>Protein {Math.round((angles.protein / 360) * 100)}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#0d9488' }]} />
                <Text style={styles.legendText}>Carbs {Math.round((angles.carbs / 360) * 100)}%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#7c3aed' }]} />
                <Text style={styles.legendText}>Fats {Math.round((angles.fats / 360) * 100)}%</Text>
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
                  style={[
                    styles.progressFill,
                    { width: `${Math.min((current / goal) * 100, 100)}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Fast</Text>
          <View style={styles.card}>
            <Text style={styles.fastingTime}>14:32:10</Text>
            <Text style={styles.fastingLabel}>16:8 Intermittent Fasting</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body Metrics</Text>
          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>24.5</Text>
              <Text style={styles.metricLabel}>BMI</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>75 kg</Text>
              <Text style={styles.metricLabel}>Weight</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>175 cm</Text>
              <Text style={styles.metricLabel}>Height</Text>
            </View>
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
  section: {
    padding: 20,
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
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fastingTime: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 8,
  },
  fastingLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#64748b',
  },
});
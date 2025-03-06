import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Square } from 'lucide-react-native';
import Animated from 'react-native-reanimated';

export default function Fasting() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fasting Timer</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>14:32:10</Text>
          <Text style={styles.timerLabel}>Hours Fasted</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Play size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Start Fast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, styles.stopButton]}>
          <Square size={24} color="#ffffff" />
          <Text style={styles.buttonText}>End Fast</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fastingTypes}>
        <Text style={styles.sectionTitle}>Fasting Types</Text>
        
        <TouchableOpacity style={[styles.typeCard, styles.selectedType]}>
          <Text style={styles.typeTitle}>16:8 Intermittent</Text>
          <Text style={styles.typeDescription}>16 hours fasting, 8 hours eating window</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.typeCard}>
          <Text style={styles.typeTitle}>18:6 Intermittent</Text>
          <Text style={styles.typeDescription}>18 hours fasting, 6 hours eating window</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.typeCard}>
          <Text style={styles.typeTitle}>20:4 Intermittent</Text>
          <Text style={styles.typeDescription}>20 hours fasting, 4 hours eating window</Text>
        </TouchableOpacity>
      </View>
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
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 8,
  },
  timerLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fastingTypes: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  typeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedType: {
    borderColor: '#0891b2',
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Stats</Text>

      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Total Points:</Text>
        <Text style={styles.statValue}>9999</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Level:</Text>
        <Text style={styles.statValue}>42</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Win Rate:</Text>
        <Text style={styles.statValue}>87%</Text>
      </View>

      {/* Placeholder for loading spinner */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00f0ff" />
        <Text>Loading Stats...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  statLabel: {
    fontSize: 18,
    color: '#555',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
});

export default StatsScreen;

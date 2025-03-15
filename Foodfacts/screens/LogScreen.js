import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogScreen = () => {
  const [logs, setLogs] = useState([]);
  const [totals, setTotals] = useState({
    proteins: 0,
    energy: 0,
    fat: 0,
    carbs: 0,
  });

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const storedLogs = await AsyncStorage.getItem("foodLogs");
        if (storedLogs) {
          const parsedLogs = JSON.parse(storedLogs);
          setLogs(parsedLogs);
          calculateTotals(parsedLogs); 
        }
      } catch (error) {
        console.error("Error loading logs:", error);
      }
    };

    loadLogs();
  }, []);

  const calculateTotals = (logs) => {
    let totalProteins = 0;
    let totalEnergy = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    logs.forEach((log) => {
      totalProteins += log.nutrition.proteins;
      totalEnergy += log.nutrition.energy;
      totalFat += log.nutrition.fat;
      totalCarbs += log.nutrition.carbs;
    });

    setTotals({
      proteins: totalProteins,
      energy: totalEnergy,
      fat: totalFat,
      carbs: totalCarbs,
    });
  };

  const handleDeleteLog = async (id) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    await AsyncStorage.setItem("foodLogs", JSON.stringify(updatedLogs));
    calculateTotals(updatedLogs); 
    Alert.alert("Deleted", "Log entry removed.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Logs</Text>

      {logs.length === 0 ? (
        <Text style={styles.noLogsText}>No logs saved yet.</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.logCard}>
              <Text style={styles.logResult}>{item.result}</Text>
              <Text style={styles.logTimestamp}>Logged at: {item.timestamp}</Text>
              <Text style={styles.logNutrition}>Proteins: {item.nutrition.proteins} g</Text>
              <Text style={styles.logNutrition}>Energy: {item.nutrition.energy} kcal</Text>
              <Text style={styles.logNutrition}>Fat: {item.nutrition.fat} g</Text>
              <Text style={styles.logNutrition}>Carbs: {item.nutrition.carbs} g</Text>
              <TouchableOpacity onPress={() => handleDeleteLog(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  noLogsText: { fontSize: 18, textAlign: "center", marginTop: 20 },
  logCard: { backgroundColor: "#e8e8e8", padding: 15, borderRadius: 10, marginTop: 10 },
  logResult: { fontSize: 18, fontWeight: "bold" },
  logTimestamp: { fontSize: 14, fontStyle: "italic", color: "#555", marginBottom: 5 },
  logNutrition: { fontSize: 16 },
  deleteButton: { color: "red", marginTop: 5, fontWeight: "bold" },
});

export default LogScreen;

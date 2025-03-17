import React, { useState, useCallback } from "react";
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const LogScreen = () => {
  const [logs, setLogs] = useState([]);
  const [totals, setTotals] = useState({
    proteins: 0,
    energy: 0,
    fat: 0,
    carbs: 0,
  });

  const saveTotals = async (updatedTotals) => {
    if (!updatedTotals || Object.keys(updatedTotals).length === 0) {
      console.error("Cannot save empty or undefined totals.");
      return; // Prevent saving empty or undefined totals
    }
  
    try {
      await AsyncStorage.setItem("totals", JSON.stringify(updatedTotals));
      console.log("Updated Totals:", updatedTotals);
    } catch (error) {
      console.error("Error saving totals:", error);
    }
  };
  
  const calculateTotals = (logs) => {
    const totals = logs.reduce(
      (acc, log) => ({
        proteins: acc.proteins + (Number(log.nutrition.proteins) || 0),
        energy: acc.energy + (Number(log.nutrition.energy) || 0),
        fat: acc.fat + (Number(log.nutrition.fat) || 0),
        carbs: acc.carbs + (Number(log.nutrition.carbs) || 0),
      }),
      { proteins: 0, energy: 0, fat: 0, carbs: 0 }
    );
  
    const formattedTotals = {
      proteins: totals.proteins.toFixed(2),
      energy: totals.energy.toFixed(2),
      fat: totals.fat.toFixed(2),
      carbs: totals.carbs.toFixed(2),
    };

    setTotals(formattedTotals);  // Update the state with formatted totals
    return formattedTotals;  // Return the updated totals for further use
  };

  useFocusEffect(
    useCallback(() => {
      const loadLogs = async () => {
        try {
          const storedLogs = await AsyncStorage.getItem("foodLogs");
          if (storedLogs) {
            const parsedLogs = JSON.parse(storedLogs);
            setLogs(parsedLogs);
            calculateTotals(parsedLogs);
          } else {
            setLogs([]);
            setTotals({ proteins: 0, energy: 0, fat: 0, carbs: 0 });
          }
        } catch (error) {
          console.error("Error loading logs:", error);
        }
      };

      loadLogs();
    }, [])
  );

  const handleDeleteLog = async (id) => {
    try {
      if (!id) {
        throw new Error("Log id is undefined or invalid");
      }
      // Ensure logs is always an array
      if (!Array.isArray(logs)) {
        console.error("Logs state is not an array:", logs);
        return;
      }
  
      // Remove the log with the matching id
      const updatedLogs = logs.filter(log => log.id !== id);
      setLogs(updatedLogs);
  
      // Recalculate totals after deleting the log
      const updatedTotals = calculateTotals(updatedLogs); // Make sure this function returns a valid object
  
      // Ensure updatedTotals is valid and not undefined
      if (updatedTotals && Object.keys(updatedTotals).length > 0) {
        saveTotals(updatedTotals); // Save updated totals
      } else {
        // If no valid totals exist, clear them from AsyncStorage
        clearTotals();
      }
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  const resetLogs = async () => {
    try {
      await AsyncStorage.removeItem("foodLogs"); // Clears stored logs
      setLogs([]); // Clears the logs state
      setTotals({ proteins: 0, energy: 0, fat: 0, carbs: 0 }); // Resets totals
      Alert.alert("Reset", "All logs and totals have been reset.");
    } catch (error) {
      console.error("Error resetting logs:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Logs</Text>

      {/* Display totals */}
      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Proteins: {totals.proteins} g</Text>
        <Text style={styles.totalText}>Energy: {totals.energy} kcal</Text>
        <Text style={styles.totalText}>Fat: {totals.fat} g</Text>
        <Text style={styles.totalText}>Carbs: {totals.carbs} g</Text>
      </View>

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

      <TouchableOpacity onPress={resetLogs} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Logs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  totalsContainer: { marginBottom: 20, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 10 },
  totalText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  noLogsText: { fontSize: 18, textAlign: "center", marginTop: 20 },
  logCard: { backgroundColor: "#e8e8e8", padding: 15, borderRadius: 10, marginTop: 10 },
  logResult: { fontSize: 18, fontWeight: "bold" },
  logTimestamp: { fontSize: 14, fontStyle: "italic", color: "#555", marginBottom: 5 },
  logNutrition: { fontSize: 16 },
  deleteButton: { color: "red", marginTop: 5, fontWeight: "bold" },
  resetButton: { marginTop: 20, backgroundColor: "#ff4747", padding: 10, borderRadius: 5 },
  resetButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});

export default LogScreen;

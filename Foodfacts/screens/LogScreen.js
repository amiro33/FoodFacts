import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const LogScreen = () => {
  const [foodInput, setFoodInput] = useState('');
  const [foodList, setFoodList] = useState([]);

  const handleAddFood = () => {
    if (foodInput.trim()) {
      setFoodList([...foodList, foodInput.trim()]);
      setFoodInput(''); // Clear input field
    }
  };

  const handleDeleteFood = (index) => {
    const updatedFoodList = foodList.filter((_, i) => i !== index);
    setFoodList(updatedFoodList);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Log Screen</Text>
      
      {/* Input field to enter food */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter food you ate"
        value={foodInput}
        onChangeText={setFoodInput}
      />
      
      {/* Button to add food */}
      <Button title="Add Food" onPress={handleAddFood} />
      
      {/* Display list of foods */}
      <FlatList
        data={foodList}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <Text style={{ fontSize: 18 }}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteFood(index)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default LogScreen;

// screens/DetailsScreen.js
import React from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';

const DetailsScreen = ({ route, navigation }) => {
  const { photo, result } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.resultText}>{result}</Text>
      <Button title="Back to Camera" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;
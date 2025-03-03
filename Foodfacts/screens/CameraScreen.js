// screens/CameraScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import foodLogo from '../assets/camera2.png';


const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setPhoto(null);
    }, [])
  );


  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhoto(photo.uri);
      analyzeImage(photo.uri);
    }
  };
  const analyzeImage = async (imageUri) => {
    try {
      console.log("Trying to analyze image...")
      const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: "base64" });

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer API KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          image : `data:image/jpeg;base64,${base64}`,
          instructions: "Identify the food in this image.",
        }),
      });
      const data = await response.json();
      console.log("Food identified:", data);
      const foodname = data.result|| "Food not found";
      const nutritionResponse = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer API KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          prompt: `Please provide the nutritional facts for ${foodname}.`,
          max_tokens: 200,
        }),
      });
      const nuturitionData = await nutritionResponse.json();
      console.log("Nutritional facts:", nutritionData);
      setResult(nutritionData.choices[0].text || "Nutrition info not available.");
      setModalVisible(true);
    } catch {
      console.error("Error analyzing image:", error);
      setResult("Error analyzing image.");
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setPhoto(null);
  }


  const logAction = () => {
    alert("Log button pressed!");
  };

  const statsAction = () => {
    alert("Stats button pressed!");
  };

  const scanAction = () => {
    alert("Scan button pressed!");
  };
  const signOut = () => {
    alert('signed out');
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView facing="back" style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Image source={foodLogo} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </CameraView>

      {/* Popup Modal for Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Food Result</Text>

            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <Text style={styles.resultText}>{result || 'No result available'}</Text>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  captureButton: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CameraScreen;
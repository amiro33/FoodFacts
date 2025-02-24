// screens/CameraScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import foodLogo from '../assets/camera2.png';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [cameraUsed, setCameraUsed] = useState('back');
  const [photo, setPhoto] = useState(null);
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({base64 :true});
      setPhoto(photo.uri);
      analyseImage(photo.uri);
    }
  };
  const analyzeImage = async( imageUri) => {
    setLoading(true);
    try{
      const base64 = await FileSystem.readAsStringAsync(imageUri, {encoding: "base64"});
      const response = await fetch('https://api.openai.com/v1/images/generate',{
        method: 'POST',
        headers:{
          'Authorization': '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',
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
          model:'gpt-4-vision-preview',
          prompt: 'Indentify this food item and provide nutrition facts.',
          image:base64,
        }),
      });
      const data = await response.json();
      setResult(data.result || 'No data found');
    }catch (error) {
      setResult('Error analysing Image')
    }
    setLoading(false)
  };

 
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
            <Image source={require(foodLogo)} style ={styles.buttonImage}>
            </Image>
          </TouchableOpacity>
        </View>
      </CameraView>
      {photo && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
      )}
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
  },
});

export default CameraScreen;
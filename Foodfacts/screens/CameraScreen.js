// screens/CameraScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import { Camera, CameraView } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [cameraUsed, setCameraUsed] = useState('back');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const switchCamera = () => {

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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <Camera style={styles.camera} ref={cameraRef}> */}
      <CameraView facing="back" style={styles.camera}>
        <View style={styles.buttonContainer}>
          <Button  title="Take Picture" onPress={takePicture} />
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
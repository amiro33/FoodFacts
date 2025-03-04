// screens/CameraScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import foodLogo from "../assets/camera2.png";

const prompt = `
  You are to recognize a food (may be prepared, or may be an individual ingredient) and provide an ingredients list based on what is visible in the picture. For the next messages, please respond in JSON only, using this format:

  {
    "success": true,
    "ingredients": [
      {
        "quantity": "8 oz",
        "description": "Peanut Butter",
        "confidence": "high"
      },
      {
        "quantity": "1 tsp",
        "description": "Salt",
        "confidence": "low"
      }
    ],
    "description": "Peanut Butter Sandwich"
  }

  Rules for Confidence Levels:

      High confidence → Clearly visible ingredients (e.g., a chicken breast, tomato slices, avocado).
      Medium confidence → Partially visible or inferred based on common preparation (e.g., lettuce under a bun, sauce spread on bread).
      Low confidence → Ingredients that are usually present but not visible (e.g., seasoning, marinade, oil used for cooking`;

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setPhoto(null);
      setResult(null);
    }, []),
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
      console.log("Analyzing image...");
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: "base64",
      });

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: prompt },
                  {
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${base64}` },
                  },
                ],
              },
            ],
            max_tokens: 300,
          }),
        },
      );

      const data = await response.json();
      console.log("Response:", data);

      const identifiedItem =
        data.choices?.[0]?.message?.content?.trim() ||
        "Could not identify the image.";
      setResult(identifiedItem);
      setModalVisible(true);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Error analyzing image.");
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setPhoto(null);
    setResult(null);
  };

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

      {/* Popup Modal for Image Analysis Result */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Image Analysis Result</Text>

            {photo && <Image source={{ uri: photo }} style={styles.image} />}
            <Text style={styles.resultText}>
              {result || "No result available"}
            </Text>

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
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  captureButton: {
    padding: 10,
    backgroundColor: "transparent",
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background overlay
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CameraScreen;

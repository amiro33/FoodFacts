import { useContext, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import foodLogo from "../assets/Foodfactslogo.png";

export const LoginScreen = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const createAccount = async () => {
    try {
    if (username === "" || password === "") Alert.alert("idk");
    const req = await fetch("http://3.17.79.194:3000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (req.ok) {
      await logIn()
      navigation.navigate('accountDetails');
    }
  } catch(e) {
    console.log(e)
  }
  };

  const logIn = async () => {
    console.warn(username, password);
    try {
    console.log("logIn");
    if (username == "" || password == "") Alert.alert("idk");
    const req = await fetch("http://3.17.79.194:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const res = await req.json();

    if (res.access_token) {
      authContext.login({ username, token: res.access_token });
      Alert.alert("Log in Successful");
    }

  } catch(e) {
    console.log(e)
  }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    topText: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
    },
    formContainer: {
      width: "80%",
      justifyContent: "center",
    },
    input: {
      height: 60,
      borderWidth: 1,
      padding: 10,
      marginBottom: 15,
      width: "100%",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    foodImage: {
      width: 150,
      height: 150,
      alignSelf: "center",
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      {/* Food facts logo from assets folder */}
      <Image source={foodLogo} style={styles.foodImage} />

      <Text style={styles.topText}>
        Welcome to the Food Facts App, please log in
      </Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Log In" onPress={() => logIn().then()} />
          <Button title="Create Account" onPress={() => createAccount().then()} />
          <Button
            title="bypass it mwahaha"
            onPress={() => {
              console.log("Hello Wordl")
              authContext.login({ username, token: "demodemodemo" });
              authContext.completeLogIn();
            }}
          />
        </View>
      </View>
    </View>
  );
};

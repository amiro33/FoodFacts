import { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, TextInput } from 'react-native';

export const LoginScreen = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const styles = StyleSheet.create({
        input: {
          height: 40,
          borderWidth: 1,
          padding: 10,
        },
        buttonContainer: {
            flex: 1,
            flexDirection: 'row'
        }
      });

    return(
        <View>
            <Text>Log In to App</Text>
            <TextInput style={styles.input} value={username} onChange={(value) => setUsername(value)}></TextInput>
            <TextInput style={styles.input} value={password} onChange={(value) => setPassword(value)}></TextInput>
            <View style={styles.buttonContainer}>

            <Button title="Log In" />
            <Button title="Create Account" />
            </View>
        </View>
    )
}
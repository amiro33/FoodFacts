import { useContext, useState } from 'react';
import { View, Button, Image, StyleSheet, Text, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const LoginScreen = () => {
    const authContext = useContext(AuthContext);
    const createAccount = async () => {
        const req = await fetch('');

        // do something here to store it with the auth context ^-^

    }
    const logIn = async () => {
        const req = await fetch('')
        const res = await req.json();

        const token = res.access_token;
        // do something here to store it with the auth context ^-^
    }


    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const styles = StyleSheet.create({
        container: {
            paddingY: 16,
            paddingX: 4
        },
        input: {
          height: 40,
          borderWidth: 1,
          padding: 10,
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row'
        }
      });

    return(
        <View style={styles.container}>
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
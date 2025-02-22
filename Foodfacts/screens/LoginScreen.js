/*
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

*/

///////////////////////////
// new code//////////////////-AM 
/// FYI VS wont let me commit and push/pull, so i'm just copy and paste here- sorry 

import { useContext, useState } from 'react';
import { View, Button, Image, StyleSheet, Text, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const LoginScreen = () => {
    const authContext = useContext(AuthContext);
   const createAccount = async () => {
        const req = await fetch('http://3.17.79.194:3000/auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const res = await req.json();
        if (res.success) {
            authContext.login(res.user);
        }
    };

    const logIn = async () => {
        const req = await fetch('http://3.17.79.194:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const res = await req.json();

        if (res.access_token) {
            authContext.login({ username, token: res.access_token });
        }
    };


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


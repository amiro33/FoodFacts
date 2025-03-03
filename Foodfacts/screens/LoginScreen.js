/* import { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, TextInput } from 'react-native';

export const LoginScreen = () => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            Alert.alert('New Account Created')  
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
            Alert.alert(username + 'Log in Successfull')
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
        },
        topText: {
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
        },
        formContainer: {
            width: '80%',
            justifyContent: 'center',
            
        },
        input: {
            height: 60,
            borderWidth: 1,
            padding: 10,
            marginBottom: 15,
            width:"100%",
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        foodImage: {
            width: 150,  
            height: 150,  
            alignSelf: 'center',
            marginBottom: 20,
        },
    });

    return (
        <View style={styles.container}>
            {/* Food facts logo from assets folder */}
            <Image 
                source={foodLogo} 
                style={styles.foodImage}
            />

            <Text style={styles.topText}>Welcome to the Food Facts App, please log in</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <Button title="Log In" onPress={logIn} />
                    <Button title="Create Account" onPress={createAccount} />
                </View>
            </View>
        </View>
    )
} */ 

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
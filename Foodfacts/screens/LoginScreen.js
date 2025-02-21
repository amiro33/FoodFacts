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

/*

///////////////////////////
// new code//////////////////-AM

//npm install formik yup

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').when('activeTab', {
    is: 'email',
    then: Yup.string().required('Email is required'),
  }),
  phoneNumber: Yup.string().when('activeTab', {
    is: 'phone',
    then: Yup.string().required('Phone number is required'),
  }),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const mockUser  = {
  email: 'user@example.com',
  phone: '1234567890',
  password: 'password123',
};

const LoginForm = () => {
  const handleLogin = (values) => {
    const inputIdentifier = values.activeTab === 'email' ? values.email : values.phoneNumber;

    if (inputIdentifier === mockUser .email || inputIdentifier === mockUser .phone) {
      if (values.password === mockUser .password) {
        Alert.alert('Success', 'Login successful!');
        // Navigate to the next screen or perform further actions
      } else {
        Alert.alert('Error', 'Incorrect password.');
      }
    } else {
      Alert.alert('Error', 'User  not found.');
    }
  };

  const handleSignUp = (values) => {
    Alert.alert('Sign Up', `Account created successfully for ${values.activeTab === 'email' ? values.email : values.phoneNumber}!`);
    //back to login screen
    setEmail('');
    setPhoneNumber('');
    setPassword('');
  };

  const handlePasswordRecovery = (values) => {
    Alert.alert('Password Recovery', `Password recovery instructions sent to ${values.activeTab === 'email' ? values.email : values.phoneNumber}.`);
    //back to login screen
    setEmail('');
    setPhoneNumber('');
    setPassword('');
  };


  return (
    <Formik
      initialValues={{ email: '', phoneNumber: '', password: '', activeTab: 'email' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => handleChange('activeTab')('email')} style={[styles.tab, values.activeTab === 'email' && styles.activeTab]}>
              <Text>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChange('activeTab')('phone')} style={[styles.tab, values.activeTab === 'phone' && styles.activeTab]}>
              <Text>Phone</Text>
            </TouchableOpacity>
          </View>
          {values.activeTab === 'email' ? (
            <TextInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.input}
            />
          ) : (
            <TextInput
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              style={styles.input}
            />
          )}
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          {touched.phoneNumber && errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
          <TextInput
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            style={styles.input}
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePasswordRecovery(values)}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSignUp(values)}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};


// This might need some editing///////////

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { flex: 1, padding: 10, alignItems: 'center' },
  activeTab: { backgroundColor: '#e0e0e0' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 },
  button: { backgroundColor: '#1E90FF', padding: 10, alignItems: 'center' },
  buttonText: { color: '#fff' },
  linkText: { color: '#1E90FF', textAlign: 'center', marginTop: 10 },
  errorText: { color: 'red', marginBottom: 10 },
});

export default LoginForm;
*/

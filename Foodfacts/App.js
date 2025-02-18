// App.js
import React from 'react';
import AppNavigator from './AppNavigator'; // Import your AppNavigator
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return  <AuthProvider><AppNavigator /></AuthProvider>;
}
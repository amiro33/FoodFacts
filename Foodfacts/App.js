// App.js
import React from "react";
import AppNavigator from "./AppNavigator"; // Import your AppNavigator
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}
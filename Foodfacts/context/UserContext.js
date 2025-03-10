import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [completedLogIn, setCompletedLogIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored login state
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));
      setLoading(false);
    };
    loadUser();
  }, []);
  useEffect(() => {}, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    setCompletedLogIn(false);
  };
  const completeLogIn = () => {
    setCompletedLogIn(true);
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, completedLogIn, completeLogIn, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

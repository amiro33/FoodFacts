import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [completedLogIn, setCompletedLogIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored login state
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) setAuth(JSON.parse(userData));
      setLoading(false);
    };
    loadUser();
    getUserPrefs().then();
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

  const getUserPrefs = async () => {
    console.log("GetUserPrefs");
    const req = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    });
    const res = await req.json();
    console.log(res);
    setUser(res);
  };
  return (
    <UserContext.Provider
      value={{
        auth,
        user,
        login,
        logout,
        completedLogIn,
        completeLogIn,
        loading,
        getUserPrefs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

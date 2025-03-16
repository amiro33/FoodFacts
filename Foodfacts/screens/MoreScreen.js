import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserContext } from "../context/UserContext";

const MoreScreen = () => {
  const userContext = useContext(UserContext);
  return (
    <View>
      <Text>Logged in as {userContext.auth.username}</Text>
      <Button title="Sign Out" onPress={() => userContext.logout()} />
      <Button title="Sign Out" onPress={() => userContext.getUserPrefs()} />
    </View>
  );
};

export default MoreScreen;

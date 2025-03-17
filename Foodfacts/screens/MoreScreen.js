import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserContext } from "../context/UserContext";

const MoreScreen = () => {
  const userContext = useContext(UserContext);
  return (
    <View>
      <View>
        {userContext?.auth.token ? (
          <View>
            <Text>Logged in as {userContext.auth.username}</Text>
            <Button title="Sign Out" onPress={() => userContext.logout()} />
          </View>
        ) : (
          <Text>Not Logged In</Text>
        )}
      </View>
      <Button
        title="Manually Refresh User Prefs"
        onPress={() => userContext.getUserPrefs()}
      />
    </View>
  );
};

export default MoreScreen;

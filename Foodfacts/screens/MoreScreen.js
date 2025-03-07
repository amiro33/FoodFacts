import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

const MoreScreen = () => {
    const authContext = useContext(AuthContext);
    return (
        <View>
            <Text>Logged in as {authContext.user.username}</Text>
            <Button title="Sign Out" onPress={() => authContext.logout()} />
        </View>
    )
}

export default MoreScreen; 
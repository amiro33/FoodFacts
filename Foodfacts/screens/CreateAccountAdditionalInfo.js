import { useContext, useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { GlobalStyles } from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
// import RNPickerSelect from 'react-native-picker-select';

export const CreateAccountAdditionalInfo = () => {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const navigation = useNavigation();
  const { user, setCompletedLogin } = useContext(AuthContext);

  const updateDetails = async () => {
    try {
      const req = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users`, {
        method: "PATCH",
        body: JSON.stringify({
          sex,
          age,
          weight,
          height,
          access_token: user.access_token,
        }),
      });
      if (req.ok) setCompletedLogin(true);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.heading}>Let's confirm a few things...</Text>
      <Text>Sex:</Text>
      <Picker
        selectedValue={sex}
        onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="N/A" value="n/a" />
      </Picker>
      <TextInput
        // style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Age"
      />
      <TextInput
        // style={styles.input}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        placeholder="Weight"
      />
      <TextInput
        // style={styles.input}
        value={height}
        onChangeText={(text) => setHeight(text)}
        placeholder="Height"
      />
      <Button title="Confirm Details" onClick={() => updateDetails.then()} />
    </View>
  );
};

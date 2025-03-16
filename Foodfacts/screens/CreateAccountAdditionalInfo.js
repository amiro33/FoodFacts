import { useContext, useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { GlobalStyles } from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
// import RNPickerSelect from 'react-native-picker-select';

export const CreateAccountAdditionalInfo = () => {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigation = useNavigation();
  const { auth, completeLogIn } = useContext(UserContext);

  const updateDetails = async () => {
    const body = JSON.stringify({
      first_name,
      last_name,
      sex,
      age,
      weight,
      height: feet * 12 + inches,
    });
    try {
      const req = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (req.ok) completeLogIn(true);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.heading}>Let's confirm a few things...</Text>
      <TextInput
        style={GlobalStyles.input}
        value={first_name}
        onChangeText={(text) => setFirstName(text)}
        placeholder="First Name"
      />
      <TextInput
        style={GlobalStyles.input}
        value={last_name}
        onChangeText={(text) => setLastName(text)}
        placeholder="Last Name"
      />
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
        style={GlobalStyles.input}
        value={age}
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
        placeholder="Age"
      />
      <Text style={GlobalStyles.heading}>Enter your weight:</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={feet}
          keyboardType="numeric"
          onChangeText={(text) => setFeet(parseInt(text))}
          placeholder="Feet"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inches}
          onChangeText={(text) => setInches(parseInt(text))}
          placeholder="Inches"
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={GlobalStyles.input}
          value={weight}
          keyboardType="numeric"
          onChangeText={(text) => setWeight(text)}
          placeholder="Weight"
        />
        <Text>lbs</Text>
      </View>
      <Button title="Confirm Details" onPress={() => updateDetails().then()} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  input: {
    flexGrow: 1,
    flexBasis: 0,
    borderColor: "black",
    borderWidth: 1,
    padding: 2,
    borderStyle: "solid",
  },
});

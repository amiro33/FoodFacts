import { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { GlobalStyles } from '../GlobalStyles'; 
// import RNPickerSelect from 'react-native-picker-select';

export const CreateAccountAdditionalInfo = () => {
    const [sex, setSex] = useState("")
    const [age, setAge] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.heading}>Let's confirm a few things...</Text>
            {/* <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: 'Sex', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Prefer not to say', value: 'n/a' },
      ]}
    /> */}
            <TextInput
                // style={styles.input}
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Age"
                secureTextEntry
            />
            <TextInput
                // style={styles.input}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                placeholder="Weight"
                secureTextEntry
            />
            <TextInput
                // style={styles.input}
                value={height}
                onChangeText={(text) => setHeight(text)}
                placeholder="Height"
                secureTextEntry
            />
            <Button title="Confirm Details" />
        </View>
    )
}
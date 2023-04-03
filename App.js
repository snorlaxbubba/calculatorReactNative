import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Divider, RadioButton } from 'react-native-paper';


const Stack = createNativeStackNavigator();
const tips = [
  { id: 1, name: '15%', value: 0.15 },
  { id: 2, name: '18%', value: 0.18 },
  { id: 3, name: '20%', value: 0.2},
  { id: 4, name: '25%', value: 0.25}
]
export default function App() {
  const [name, setName] = useState("Guest");
  const HomeScreen = ({navigation}) => {
    const [input, setInput] = useState("Guest");
    return (
      <>
      <View style={styles.container}>
        <TextInput
          placeholder='Please enter your name'
          style={styles.nameInput}
          value={input}
          onChangeText={(input) => setInput(input)}
          keyboardType="ascii-capable"
        ></TextInput>
        <Button
          title={`Go to ${input}'s Calculator`}
          onPress={() =>
            navigation.navigate('Profile', {input}) &&
            setName(input)
          }
        />
      </View>
    </>
    );
  };
  const ProfileScreen = ({navigation}) => {
    const [selectedId, setSelectedId] = useState();
    const [tipValue, setTipValue] = useState(0);
    const [bill, setBill] = useState(0);
    const [total, setTotal] = useState(0);

    const randomBill = () => {
      const randomBill = Math.floor(Math.random() * 1000);
      setBill(randomBill);
    }

    const calculateTip = () => {
      let tip = bill * (tipValue + 1); 
      tip = tip.toFixed(2);
      setTotal(tip);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{name}'s Calculator</Text>
  
        <View style={styles.inputContainer}>
          <Button
            title={`Random Bill`}
            color="#841584"
            onPress={() => randomBill()}
          />

          <TextInput
            style={styles.input}
            value={bill.toString()}
            onChangeText={(text) => setBill(parseInt(text) || 0)}
            keyboardType="numeric"
          />
        </View>
  
        <View style={styles.tipContainer}>
          <Text style={styles.inputLabel}>Pick a Tip:</Text>
          <View style={styles.radioButtonContainer}>
            {tips.map((tip) => {
              return (
                <View key={tip.id} style={styles.radioButton}>
                  <RadioButton
                    value={tip.id}
                    status={
                      selectedId === tip.name ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      setSelectedId(tip.name);
                      setTipValue(tip.value);
                    }}
                  />
                  <Text style={styles.tipText}>{tip.name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.selectedTip}>Selected Tip: {selectedId}</Text>
        </View>
  

  
        <View style={styles.inputContainer}>
        <Button
          title={`Calculate Total`}
          color="#841584"

          onPress={() => calculateTip()}
        />
          <TextInput
            style={styles.input}
            value={total.toString()}
            keyboardType="numeric"
            color="black"
            editable={false}
          />
        </View>
      </View>
    );
  };
    
  return (
    
    <NavigationContainer>
 <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome to the Tip Calculator'}}
        />
        <Stack.Screen name="Profile" 
                      component={ProfileScreen}
                      options={{title: "Guest's Calculator"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff0ff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 100,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  tipContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  nameInput: {
    paddingBottom: 64,
    fontSize: 24,
  },



});

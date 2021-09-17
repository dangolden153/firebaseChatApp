import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import pics from "../images/google.png";
import facebook from "../images/facebook.png";
import mail from "../images/Gmail-Logo.png";
import logo from "../images/Blord-logo.jpg";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";

const EnterPassCode = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[tw` items-center mt-8`, { flexGrow: 0.5 }]}>
        <Text style={[tw`text-white py-2 text-xl `, { letterSpacing: 1 }]}>
          Enter your Passcode
        </Text>
      </View>

      <View style={tw` w-4/5 items-center flex-row justify-between`}>
        <View
          style={tw`bg-white  p-2 mt-6 border mb-40 rounded-lg w-12 overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            // placeholder="Comfirm Passcode"
            placeholderTextColor="gray"
          />
        </View>

        <View
          style={tw`bg-white  p-2 mt-6 border mb-40 rounded-lg w-12 overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            // placeholder="Comfirm Passcode"
            placeholderTextColor="gray"
          />
        </View>

        <View
          style={tw`bg-white  p-2 mt-6 border mb-40 rounded-lg w-12 overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            // placeholder="Comfirm Passcode"
            placeholderTextColor="gray"
          />
        </View>

        <View
          style={tw`bg-white  p-2 mt-6 border mb-40 rounded-lg w-12 overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            // placeholder="Comfirm Passcode"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <Button
        title="Create Passcode"
        buttonStyle={{
          width: 315,
          borderRadius: 7,
          // marginTop: 80,
          backgroundColor: "#005CEE",
        }}
        onPress={() => navigation.navigate("ChatList")}
      />
    </View>
  );
};

export default EnterPassCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  input: {
    // backgroundColor: "pink",
    // borderWidth: 1,
    // borderColor: "red",
    // borderRadius: 20,
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 15,
    // textAlign: "center",
    fontSize: 20,
  },
});

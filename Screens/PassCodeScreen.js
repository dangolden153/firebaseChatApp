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

const PassCodeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={[tw` items-center mt-8`, { flexGrow: 0.5 }]}>
        <Text
          style={[tw`text-white py-2 text-xl font-bold`, { letterSpacing: 1 }]}
        >
          Enter your Passcode
        </Text>
        <Text style={tw`text-white  text-sm`}> Create your new password</Text>
      </View>

      <View style={tw` w-full items-center`}>
        {/* google */}
        <View
          style={tw`bg-white  p-2 mt-3 border rounded-lg w-full overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            placeholder="Passcode"
            placeholderTextColor="gray"
          />
        </View>

        {/* facebook */}
        <View
          style={tw`bg-white  p-2 mt-6 border mb-40 rounded-lg w-full overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            placeholder="Comfirm Passcode"
            placeholderTextColor="gray"
          />
        </View>

        <Button
          title="Reset Passcode"
          buttonStyle={{
            width: 315,
            borderRadius: 7,
            // marginTop: 80,
            backgroundColor: "#005CEE",
          }}
          onPress={() => navigation.navigate("EnterPassCode")}
        />
      </View>
    </View>
  );
};

export default PassCodeScreen;

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

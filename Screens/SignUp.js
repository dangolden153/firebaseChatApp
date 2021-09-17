import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import pics from "../images/google.png";
import facebook from "../images/facebook.png";
import mail from "../images/Gmail-Logo.png";
import logo from "../images/Blord-logo.jpg";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={logo}
        style={{ width: 250, height: 250, resizeMode: "contain" }}
      />

      {/* google */}
      <TouchableOpacity
        style={tw`bg-white flex-row items-center p-2 mt-5 border rounded-lg w-full overflow-hidden`}
        onPress={() => navigation.navigate("SignInGoogleScreen")}
      >
        <Image
          source={pics}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain",
            marginRight: 20,
          }}
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* facebook */}
      <TouchableOpacity
        style={tw`bg-white flex-row items-center p-2 mt-5 border rounded-lg w-full overflow-hidden`}
      >
        <Image
          source={facebook}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain",
            marginRight: 20,
          }}
        />
        <Text style={styles.text}>Sign in with Facebook</Text>
      </TouchableOpacity>

      {/* mail */}
      <TouchableOpacity
        style={tw`bg-white flex-row items-center p-2 mt-5 border rounded-lg w-full overflow-hidden`}
      >
        <Image
          source={mail}
          style={{
            width: 30,
            height: 30,
            resizeMode: "contain",
            marginRight: 20,
          }}
        />
        <Text style={styles.text}>Sign in with Email</Text>
      </TouchableOpacity>

      {/* line in betwwwn the input field */}
      <View style={tw`my-6 flex-row items-center self-center justify-center`}>
        <View style={tw`h-px w-16 bg-white`} />
        <Text style={tw`text-gray-400 text-lg mx-4`}>or</Text>
        <View style={tw`h-px w-16 bg-white`} />
      </View>

      {/* finger print */}
      <TouchableOpacity
        style={tw`bg-white  items-center py-2   rounded-lg w-full `}
      >
        <Text style={styles.text}>Sign in with FingerPrint</Text>
      </TouchableOpacity>

      <View style={tw` flex-row items-center p-5 self-center`}>
        <Text style={tw` text-white text-lg`}>New User?</Text>
        <Text style={tw` text-gray-400 text-sm mx-2`}>Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
    alignItems: "center",
  },
  text: {
    // backgroundColor: "pink",
    // borderWidth: 1,
    // borderColor: "red",
    // borderRadius: 20,
    // width: "100%",
    // backgroundColor: "white",
    // paddingRight: 15,

    fontSize: 20,
    color: "gray",
  },
});

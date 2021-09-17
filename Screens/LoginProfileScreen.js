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
import { Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import logo from "../images/apple2.png";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const LoginProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View
        style={{
          backgroundColor: "white",
          padding: 30,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          // marginVertical: 25,
        }}
      >
        <Image
          source={logo}
          style={{ width: 110, height: 110, resizeMode: "contain" }}
        />
      </View>
      <View
        style={tw`bg-white flex-row items-center  p-2 mt-5 px-8 border rounded-lg w-full overflow-hidden`}
      >
        <Text style={styles.text}>Charles Emmah</Text>
      </View>

      <View
        style={tw`bg-white flex-row items-center p-2 mt-5 px-8 border rounded-lg w-full overflow-hidden`}
      >
        <Text style={styles.text}>Have a beatiful day</Text>
      </View>

      <View
        style={tw`bg-white flex-row items-center justify-between p-2 mt-5 border rounded-lg w-full overflow-hidden`}
      >
        <View style={tw`bg-red-600 rounded-full w-5 h-5 ml-3`} />
        <Text style={{ fontSize: 20, color: "black", marginRight: 20 }}>
          I'm available
        </Text>
        <View style={tw`  w-1/4 flex-row items-center `}>
          <View style={tw`bg-black  w-px h-7 mr-6`} />
          <TouchableOpacity style={tw`items-center`}>
            <AntDesign name="down" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Proceed"
        buttonStyle={{
          width: 315,
          borderRadius: 7,
          marginTop: 100,
          backgroundColor: "#005CEE",
        }}
        onPress={() => navigation.navigate("PassCodeScreen")}
      />
    </SafeAreaView>
  );
};
export default LoginProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
    alignItems: "center",
    paddingTop: 90,
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
    color: "black",
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import pics from "../images/pics1.jpg";
import { StatusBar } from "expo-status-bar";
const UpNav = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        placeholderTextColor={"black"}
        placeholder="Search"
        style={styles.input}
      />

      <Ionicons
        // type="Ionicons"
        name="notifications-outline"
        size={25}
        color="white"
        style={{ marginLeft: 20 }}
      />

      <Image
        source={pics}
        style={{ height: 50, width: 50, borderRadius: 100 }}
      />
    </SafeAreaView>
  );
};

export default UpNav;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: 190,
    height: 40,
    // padding: 5,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: "#ffff",
  },
});

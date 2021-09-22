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
import logo from "../images/Blord-logo.jpg";
import pics from "../images/user.jpg";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import momemt from "moment";

const ChatListUpNav = ({ navigation, CurrentUserCred }) => {
  // const { img, id, status, email } = CurrentUserCred;
  const img = CurrentUserCred?.img;
  // const time = CurrentUserCred?.time;
  // const Time = momemt(time).format("LT");
  // console.log("time", typeof(Time));
  const pic =
    "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={logo}
        style={{ height: 90, width: 90, resizeMode: "contain" }}
      />

      <View style={tw`w-28  flex-row items-center justify-between`}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="white"
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            // img ? img :
            // source={img !== "" ? img : pics}
            source={{ uri: img ? img : pic }}
            style={{ height: 50, width: 50, borderRadius: 100 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatListUpNav;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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

import React from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import pics from "../images/user.jpg";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import momemt from "moment";

const ChatProfileNav = ({ navigation, data }) => {
  const { usersData } = useSelector((state) => state);

  /////detructure the other user details and frt the neccessary information
  // 2. this data should be useeffect so it can re-render anytime the other user changed a varaible
  console.log("other user details:", data);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <AntDesign
          name="arrowleft"
          size={20}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row w-48 justify-between`}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Image
          source={usersData?.photoURL !== null ? usersData?.photoURL : pics}
          style={{ height: 50, width: 50, borderRadius: 100 }}
        />

        <View>
          <Text style={tw`text-white font-bold text-lg`}>{data?.email}</Text>
          <Text style={[tw` text-sm`, { color: "#bec0db" }]}>
            {typeof data?.status == "string"
              ? data?.status
              : momemt(data?.status.toDate().toString()).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={tw`flex-row w-20  justify-between`}>
        <TouchableOpacity
          style={{
            backgroundColor: "#059669",
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("VideoCallScreen")}
        >
          <Ionicons name="call" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#005CEE",
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <FontAwesome5 name="video" size={15} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatProfileNav;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: 160,
    height: 40,
    // padding: 5,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: "#ffff",
  },
});

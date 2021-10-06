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
import moment from "moment";

const ChatProfileNav = ({ navigation, data }) => {
  const { usersData } = useSelector((state) => state);
  const { id, img, email, status, userName } = data;
  /////detructure the other user details and frt the neccessary information
  // 2. this data should be useeffect so it can re-render anytime the other user changed a varaible
  // console.log("momemt:", moment(status).fromDate());
  console.log("momemt:", status);

  const pic =
    "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg";

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row w-48 justify-between  mr-9`}
        // onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Image
          source={{ uri: img ? img : pic }}
          style={{ height: 40, width: 40, borderRadius: 100 }}
        />

        <View style={{ marginLeft: 10 }}>
          <Text
            numberOfLines={1}
            style={{ width: "85%", fontSize: 16, color: "white" }}
          >
            {email}
          </Text>
          <Text style={[tw` text-sm`, { color: "#bec0db" }]}>
            {status === "online" ? status : moment(status).format("LT")}
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
    paddingVertical: 13,
  },
});

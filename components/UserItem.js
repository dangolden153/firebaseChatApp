import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import momemt from "moment";
import pics from "../images/user.jpg";

const UserItem = ({ navigation, item, usersData }) => {
  const { messages } = useSelector((state) => state);
  const messg = messages?.[0]?.message;
  const pic =
    "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg";

  // console.log("date", date);
  const {
    img,
    lastMessage,
    lastCreatedMesg,
    name,
    userChat,
    status,
    id,
    time,
    email,
  } = item;

  // console.log("item :", item);
  return (
    <View style={{ flex: 1 }}>
      {item && (
        <ScrollView style={{ flex: 1 }}>
          {usersData?.email === email ? null : (
            <TouchableOpacity
              style={styles.usercontent}
              onPress={() =>
                navigation.navigate("ChatScreen", {
                  id,
                  data: item,
                })
              }
            >
              <Image
                source={{ uri: img ? img : pic }}
                // source={img !== "" ? img : pics}
                style={{ height: 80, width: 80, borderRadius: 10 }}
              />

              <View style={styles.chat_not_container}>
                <View style={styles.name_chat}>
                  <Text numberOfLines={1} style={styles.username}>
                    {email}
                  </Text>
                  <Text style={styles.userchat}>
                    {/* {lastMessage ? lastMessage : "...."} */}
                  </Text>
                </View>

                <View style={styles.date_notf}>
                  <Text style={styles.date}>
                    {time && momemt(time).format("LT")}
                  </Text>
                  {/* <Text style={styles.notification}>2</Text> */}
                  {/* {notifications !== "" ? (
                  <Text style={styles.notification}>{notifications}</Text>
                ) : null} */}
                </View>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  usercontent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // alignItems: "center",
    marginVertical: 15,
  },
  name_chat: {
    width: 150,
    // backgroundColor: "pink",
    marginLeft: -10,
  },

  chat_not_container: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    color: "white",
    fontSize: 17,
    // fontWeight: "bold",
    marginBottom: 3,
    alignSelf: "flex-start",
    marginLeft: 15,
    // width: 300,
  },
  userchat: {
    // color: "#B9BAC7",
    color: "white",
  },
  date_notf: {},
  date: {
    color: "#005CEE",
    marginBottom: 2,
  },
  notification: {
    color: "white",
    alignSelf: "flex-end",
    backgroundColor: "#005CEE",
    height: 20,
    width: 20,
    textAlign: "center",
    borderRadius: 100,
  },
});

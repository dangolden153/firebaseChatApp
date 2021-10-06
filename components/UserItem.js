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
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

const UserItem = ({ navigation, item, usersData }) => {
  const { messages } = useSelector((state) => state);
  const messg = messages?.[0]?.message;
  const pic =
    "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg";

  const { img, lastMessage, lastTime, userName, image, status, id, email } =
    item;

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
                style={{ height: 70, width: 70, borderRadius: 10 }}
              />

              <View style={styles.chat_not_container}>
                <View style={styles.name_chat}>
                  <Text numberOfLines={1} style={styles.username}>
                    {email}
                  </Text>
                  <Text numberOfLines={1} style={styles.lastChat}>
                    {lastMessage === "" && image !== "" ? (
                      <FontAwesome name="image" size={20} color="#bec0db" />
                    ) : (
                      lastMessage
                    )}
                  </Text>
                </View>

                <Text style={styles.date}>
                  {lastMessage === "" && image === ""
                    ? ""
                    : moment(lastTime).format("LT")}
                </Text>

                {/* this view contains last meaasge created At and number unread messages nitifications */}
                {/* <View style={styles.date_notf}>
                  <Text style={styles.date}>
                    {moment(lastTime).format("LT")}
                  </Text>
                </View> */}
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
    alignItems: "flex-start",

    marginLeft: -12,
  },

  chat_not_container: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    width: 150,
    color: "white",
    fontSize: 17,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  lastChat: {
    color: "#B9BAC7",
    fontSize: 14,
    width: 200,
  },
  date_notf: {},
  date: {
    fontSize: 12,
    color: "#059669",
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

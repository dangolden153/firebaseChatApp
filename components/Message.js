import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import moment from "moment";
import OpenImage from "../Screens/OpenImage";

import { useNavigation } from "@react-navigation/native";
const Message = ({ item, usersData }) => {
  // const { createdAt, message, otherUserId, currentUserId } = item;
  // const { message, reciever, sender } = item;
  const navigation = useNavigation();
  const image = item?.image;
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      {usersData?.uid === item?.sender ? (
        <ScrollView contentContainerStyle={styles.senderContainer}>
          {/* display an image on the chat screen if there is any */}
          {item?.image ? (
            <Pressable
              onLongPress={() => navigation.navigate("OpenImage", { image })}
              style={styles.imageContainer}
            >
              <Image
                source={{ uri: item?.image }}
                style={{ height: 300, width: 250, resizeMode: "cover" }}
              />
            </Pressable>
          ) : null}
          {!!item?.message && (
            <View style={styles.sender_time_messg}>
              <Text style={styles.senderTime}>
                {moment(item?.time).format("LT")}
              </Text>
              <Text style={styles.senderMessg}>{item?.message}</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.recieverContainer}>
          {item?.image ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("OpenImage", { image })}
              style={styles.recieverImgContainer}
            >
              <Image
                source={{ uri: item?.image }}
                style={{ height: 400, width: 300, resizeMode: "cover" }}
              />
            </TouchableOpacity>
          ) : null}

          {!!item?.message && (
            <View style={styles.recieve_time_messg}>
              <Text style={styles.recieverMessg}>{item?.message}</Text>
              <Text style={styles.receiveTime}>
                {moment(item?.time).format("LT")}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  senderContainer: {
    flex: 1,
    alignSelf: "flex-end",
  },
  sender_time_messg: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },

  imageContainer: {
    backgroundColor: "#005CEE",
    padding: 10,
    borderRadius: 10,
    width: 270,
    justifyContent: "center",
    alignItems: "center",
  },

  senderMessg: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: 250,
    backgroundColor: "#005CEE",
    color: "white",
    padding: 10,
  },
  senderTime: {
    color: "white",
    alignSelf: "flex-end",
    paddingVertical: 10,
    marginRight: 20,
    fontSize: 10,
  },

  recieverContainer: {
    flex: 1,
  },

  recieve_time_messg: {
    flexDirection: "row",
    alignItems: "center",
    // margin: 10,
  },
  recieverImgContainer: {
    backgroundColor: "#bec0db",
    padding: 10,
    borderRadius: 10,
    width: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  recieverMessg: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: 250,
    marginVertical: 10,
    backgroundColor: "#bec0db",
    color: "black",
  },
  receiveTime: {
    color: "white",
    paddingVertical: 10,
    marginLeft: 20,
    fontSize: 10,
  },
});

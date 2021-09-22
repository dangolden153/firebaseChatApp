import React from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import moment from "moment";

const Message = ({ item, usersData }) => {
  const { createdAt, message, otherUserId, currentUserId } = item;
  //   console.log("otherUserId", otherUserId);
  //   console.log("currentUserId", currentUserId);
  // console.log("usersData", usersData?.uid === currentUserId);
  //   console.log("message", message);
  return (
    <View style={{ flex: 1 }}>
      {usersData?.uid === currentUserId ? (
        <ScrollView contentContainerStyle={styles.senderContainer}>
          <View style={styles.sender_time_messg}>
            <Text style={styles.senderTime}>
              {moment(createdAt?.toDate().toString()).format("LT")}
            </Text>
            <Text style={styles.senderMessg}>{message}</Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.recieverContainer}>
          <View style={styles.recieve_time_messg}>
            <Text style={styles.recieverMessg}>{message}</Text>
            <Text style={styles.receiveTime}>
              {/* {moment(createdAt?.toDate().toString()).fromNow()} */}
              {moment(createdAt?.toDate().toString()).format("LT")}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  senderMessg: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: "70%",
    backgroundColor: "#005CEE",
    color: "white",
    alignSelf: "flex-end",
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
  recieverMessg: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: "70%",
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

import React, { useState, useEffect, createContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import UserList from "../components/UserList";
import { useNavigation } from "@react-navigation/native";
import HorizontalUserList from "../components/HorizontalUserList";
import ChatListUpNav from "../components/ChatListUpNav";
import { useSelector } from "react-redux";
import { db, firebase } from "../firebase";
import { useDispatch } from "react-redux";
import Indicator from "../components/ActivityIndicator";

const ChatList = () => {
  const navigation = useNavigation();
  const { usersData } = useSelector((state) => state);
  const [otherUsersData, setOtherUsersData] = useState([]);
  const dispatch = useDispatch();
  const { CurrentUserCred, messages } = useSelector((state) => state);
  // console.log("otherUsersData", otherUsersData);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref("usersList")
        .on("value", (dataSnaphot) => {
          let otherUsers = [];
          let users = [];
          let currentUser = {
            name: "",
            id: "",
            img: "",
            email: "",
          };

          let messageData = {
            lastMessage: "",
            lastTime: "",
            image: "",
          };
          dataSnaphot.forEach((snapshot) => {
            if (snapshot.val().id === usersData?.uid) {
              dispatch({ type: "Current_UserCred", payload: snapshot.val() });

              currentUser.id = snapshot.val().id;
              currentUser.name = snapshot.val().name;
              currentUser.img = snapshot.val().img;
              currentUser.email = snapshot.val().email;
            } else {
              otherUsers.push({
                id: snapshot.val().id,
                userName: snapshot.val().userName,
                img: snapshot.val().img,
                status: snapshot.val().status,
                email: snapshot.val().email,
              });

              new Promise((resolve, reject) => {
                firebase
                  .database()
                  .ref("messages")
                  .child(usersData?.uid)
                  .child(snapshot.val().id)
                  .orderByKey()
                  .limitToLast(1)
                  .on("value", (dataSnapshots) => {
                    if (dataSnapshots.val()) {
                      dataSnapshots.forEach((child) => {
                        // console.log("data value:", child.val());
                        // lastMessage = child.val().messege.image !== '' ? 'Photo' : child.val().messege.msg;
                        //// the value/data coming out from here is the message data called by the promise...and if we dont
                        ///have any value for the user,null is been render for the user
                        ///in another words, null is beenn appended to the user

                        messageData.lastMessage = child.val().message?.messages;
                        messageData.lastTime = child.val().message?.createdAt;
                        messageData.image = child.val().message?.image;
                      });
                    } else {
                      messageData.lastMessage = "";
                      messageData.lastTimeTime = "";
                    }

                    //// the user data comimg from firebase database in the promise function is been
                    /// appended to the object above the promise
                    users.push({
                      id: snapshot.val().id,
                      userName: snapshot.val().userName,
                      img: snapshot.val().img,
                      status: snapshot.val().status,
                      email: snapshot.val().email,
                      lastMessage: messageData.lastMessage,
                      lastTime: messageData.lastTime,
                      image: messageData.image,
                    });
                    setOtherUsersData(
                      users.sort((a, b) => b.lastTime - a.lastTime)
                    );
                  });
              })
                .then((res) => {
                  console.log(res);
                  ///and if the promise is sucessfull ....all the user and
                  ///messages data are been pushed to the users array
                })
                .catch((e) => console.log(e));
            }
          });
        });
    } catch (e) {
      console.log(e);
    }
  }, [usersData?.uid, messages?.message?.messages]);

  if (!otherUsersData) {
    return <Indicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Up nav component */}
      <ChatListUpNav
        navigation={navigation}
        CurrentUserCred={CurrentUserCred}
      />

      {/* HorizontalUserList  */}
      <HorizontalUserList navigation={navigation} />

      {/* List of users */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Recent Chats
        </Text>
        <UserList
          navigation={navigation}
          otherUsersData={otherUsersData && otherUsersData}
        />
      </View>

      {/* button tab */}
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
});

///// the logic is the user details are fetched from the database and with new promise, we are able
////to have a call back on the firebase and query for the message ref and appended all the data comimg from both user's data/value\
///and messages value to a state and then been passed around the component.

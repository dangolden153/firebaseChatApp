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

const ChatList = () => {
  const navigation = useNavigation();
  const { usersData } = useSelector((state) => state);
  const [ChattedUsers, setChattedUsers] = useState([]);
  const [otherUsersData, setOtherUsersData] = useState([]);
  const dispatch = useDispatch();
  const { CurrentUserCred } = useSelector((state) => state);
  // console.log(new Date());

  useEffect(() => {
    try {
      firebase
        .database()
        .ref("usersList")
        .on("value", (dataSnaphot) => {
          let otherUsers = [];
          let currentUser = {
            name: "",
            id: "",
            img: "",
            email: "",
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
            }
          });

          // setCurrentUserData(currentUser);
          setOtherUsersData(otherUsers);
        });
    } catch (e) {
      console.log(e);
    }
  }, [usersData]);

  // useEffect(() => {
  //   db.collection("users").onSnapshot((snap) => {
  //     let users = [];
  //     snap.forEach((docs) => {
  //       users.push(docs.data());
  //     });
  //     setOtherUsersData(users);
  //   });
  // }, []);

  console.log("chatted added users details:", ChattedUsers);
  // console.log("current users details:", currentUserData);

  // useEffect(() => {
  //   db.collection("users").onSnapshot((snap) => {
  //     let usersList = [];
  //     snap.forEach((docs) => {
  //       if (docs.data().id === usersData?.uid) {
  //         dispatch({ type: "Current_UserCred", payload: docs.data() });
  //       } else {
  //         usersList.push(docs.data());
  //       }
  //     });
  //     setOtherUsersData(usersList);
  //   });
  // }, [usersData]);

  // useEffect(() => {
  //   db.collection("users")
  //     .doc(usersData?.uid)
  //     .collection("chattedUsers")
  //     .onSnapshot((querySnapshot) => {
  //       let chattedUser = [];
  //       querySnapshot.forEach((doc) => {
  //         if (doc.data()) {
  //           chattedUser.push(doc.data());
  //           console.log("createChattedUsers:", doc.data());
  //           return;
  //         }
  //       });

  //       setChattedUsers(chattedUser);
  //     });
  // }, [usersData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

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

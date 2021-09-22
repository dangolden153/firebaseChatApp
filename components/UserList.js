import React, { useEffect, useState } from "react";
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
import { StatusBar } from "expo-status-bar";
import { db } from "../firebase";
import UserItems from "./UserItems";
import pics from "../images/user.jpg";
import { useSelector, useDispatch } from "react-redux";
import momemt from "moment";
import UserItem from "./UserItem";

const UserList = ({ navigation, otherUsersData }) => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState(null);
  const { usersData, messages } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { usersDetails } = useSelector((state) => state);

  // console.log("type of ", typeof(messg))
  // useEffect(() => {
  //   const getData = () => {
  //     db.collection("users").onSnapshot((snap) => {
  //       let data = [];

  //       setUserData(
  //         snap.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data(),
  //         }))
  //       );
  //     });
  //   };

  //   getData();
  // }, [userData]);

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     await db
  //       .collection("users")
  //       .doc(usersData?.uid)
  //       .get()
  //       .then((querySnapshot) => {
  //         console.log("doc data", querySnapshot.data());
  //         dispatch({ type: "userDetails", payload: querySnapshot.data() });
  //       });
  //   };

  //   getCurrentUser();
  // }, [usersData]);

  // dataSnaphot.forEach((snapshot)=>{
  //   if (usersData?.uid === snapshot.val().uid){

  //   } else{
  ///// give the list of other users

  // console.log("set user data:", userData);

  //// get last messages for the user list screen

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.userchat}></Text> */}

      <FlatList
        data={otherUsersData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <UserItem usersData={usersData} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

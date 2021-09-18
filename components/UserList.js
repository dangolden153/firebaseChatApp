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

const UserList = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState(null);
  const { usersData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { usersDetails } = useSelector((state) => state);

  // console.log("users details:", usersDetails);

  useEffect(() => {
    const getData = () => {
      db.collection("users").onSnapshot((snap) => {
        let data = [];

        setUserData(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    };

    getData();
  }, [userData]);

  useEffect(() => {
    const getCurrentUser = async () => {
      await db
        .collection("users")
        .doc(usersData?.uid)
        .get()
        .then((querySnapshot) => {
          console.log("doc data", querySnapshot.data());
          dispatch({ type: "userDetails", payload: querySnapshot.data() });
        });
    };

    // return=()=>(

    // )
    getCurrentUser();
  }, [usersData]);

  // console.log("set user data:", userData);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        data={userData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({
          item: {
            id,
            data: { img, userName, userChat, status, notifications, email },
            data,
          },
        }) => (
          <ScrollView>
            {/* if the current users email is equal to the email in the list of users email
      render the rest without the current users email */}
            {usersData?.email === email ? null : (
              <TouchableOpacity
                style={styles.usercontent}
                onPress={() => navigation.navigate("ChatScreen", { id, data })}
              >
                <Image
                  source={img !== null ? img : pics}
                  style={{ height: 80, width: 80, borderRadius: 10 }}
                />

                <View style={styles.name_chat}>
                  <Text numberOfLines={1} style={styles.username}>
                    {/* {usersDetails?.email !== null ? email : ""} */}
                    {/* {console.log(img)}
                    {console.log(email)} */}
                    {email}
                  </Text>
                  {/* <Text style={styles.userchat}>....</Text> */}
                </View>

                <View style={styles.date_notf}>
                  <Text style={styles.date}>
                    {typeof data?.status == "string"
                      ? data?.status
                      : momemt(data?.status.toDate().toString()).fromNow()}
                  </Text>
                  {/* <Text style={styles.notification}>2</Text> */}
                  {/* {notifications !== "" ? (
                  <Text style={styles.notification}>{notifications}</Text>
                ) : null} */}
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
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
  usercontent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 15,
  },
  name_chat: {
    width: 150,
    // backgroundColor: "pink",
    marginLeft: -10,
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
    width: 300,
  },
  userchat: {
    color: "#B9BAC7",
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

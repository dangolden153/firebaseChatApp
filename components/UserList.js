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
import { useSelector } from "react-redux";

const UserList = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const { usersData } = useSelector((state) => state);

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
  }, [setUserData]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* {userData.map(({ id, data }) => (
        <UserItems id={id} key={id} data={data} navigation={navigation} />
      ))} */}

      <FlatList
        data={userData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({
          item: {
            id,
            data: { image, userName, userChat, date, notifications, email },
            data,
          },
        }) => (
          <ScrollView>
            {usersData?.email === email ? null : (
              <TouchableOpacity
                style={styles.usercontent}
                onPress={() => navigation.navigate("ChatScreen", { id, data })}
              >
                <Image
                  source={
                    usersData?.photoURL !== null ? usersData?.photoURL : pics
                  }
                  style={{ height: 80, width: 80, borderRadius: 10 }}
                />

                <View style={styles.name_chat}>
                  <Text numberOfLines={1} style={styles.username}>
                    {usersData?.email === email ? null : email}
                  </Text>
                  {/* <Text style={styles.userchat}>....</Text> */}
                </View>

                <View style={styles.date_notf}>
                  <Text style={styles.date}>7:30</Text>
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

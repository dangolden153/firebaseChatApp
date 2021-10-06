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
import { useSelector } from "react-redux";
import UserItem from "./UserItem";
const UserList = ({ navigation, otherUsersData }) => {
  const { usersData } = useSelector((state) => state);

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

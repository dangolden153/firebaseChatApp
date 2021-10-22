import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";
import Indicator from "../components/ActivityIndicator";

const UserList = ({ navigation, otherUsersData }) => {
  const { usersData } = useSelector((state) => state);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {!otherUsersData && <Indicator />}

        {/* <Text style={styles.userchat}></Text> */}

        <FlatList
          data={otherUsersData}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <UserItem
              usersData={usersData}
              item={item}
              navigation={navigation}
            />
          )}
        />
      </View>
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

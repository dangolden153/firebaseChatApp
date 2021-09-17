import React, { useState, useEffect, createContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import UserList from "../components/UserList";
import { useNavigation } from "@react-navigation/native";
import HorizontalUserList from "../components/HorizontalUserList";
import ChatListUpNav from "../components/ChatListUpNav";
import { useSelector } from "react-redux";

const ChatList = () => {
  const navigation = useNavigation();
  const { usersData } = useSelector((state) => state);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Up nav component */}
      <ChatListUpNav navigation={navigation} usersData={usersData} />

      {/* HorizontalUserList  */}
      <HorizontalUserList navigation={navigation} />

      {/* List of users */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Recent Chats
        </Text>
        <UserList navigation={navigation} />
      </View>

      {/* button tab */}
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
});

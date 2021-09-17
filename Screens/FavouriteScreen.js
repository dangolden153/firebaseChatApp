import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import UpNav from "../components/UpNav";
import TabList from "../components/TabList";
import UserList from "../components/UserList";
import { useNavigation } from "@react-navigation/native";

const FavouriteScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Up nav component */}
      <UpNav />

      {/* Tab List  */}
      <TabList />

      {/* List of users */}
      <UserList navigation={navigation} />

      {/* button tab */}
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
});

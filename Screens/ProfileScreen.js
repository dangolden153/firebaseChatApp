import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import ProfilePicture from "../components/ProfilePicture";
import tw from "tailwind-react-native-classnames";
import ProfileSettingList from "../components/ProfileSettingList";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={[tw`flex-1 p-4`, { backgroundColor: "#000000" }]}>
      <StatusBar style="light" />
      <ProfilePicture />
      <ProfileSettingList />
    </SafeAreaView>
  );
};

export default ProfileScreen;

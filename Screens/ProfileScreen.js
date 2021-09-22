import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

import ProfilePicture from "../components/ProfilePicture";
import tw from "tailwind-react-native-classnames";
import ProfileSettingList from "../components/ProfileSettingList";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const { CurrentUserCred } = useSelector((state) => state);

  return (
    <SafeAreaView style={[tw`flex-1 p-4`, { backgroundColor: "#000000" }]}>
      <StatusBar style="light" />
      <ProfilePicture CurrentUserCred={CurrentUserCred} />
      <ProfileSettingList />
    </SafeAreaView>
  );
};

export default ProfileScreen;

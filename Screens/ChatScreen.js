import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import ChatProfileNav from "../components/ChatProfileNav";
import Chats from "../components/Chats";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import UploadFIles from "../components/UploadFIles";

const ChatScreen = ({ route }) => {
  const { id, data } = route.params;
  // console.log("chat screen:", id);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[tw`flex-1 p-4 pt-8`, { backgroundColor: "#000000" }]}>
      <StatusBar style="auto" />
      <ChatProfileNav navigation={navigation} data={data} />
      <Chats otherUserId={id} data={data} />
    </SafeAreaView>
  );
};

export default ChatScreen;

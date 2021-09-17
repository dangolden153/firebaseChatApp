import {
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";

const DeleteMessageModal = ({ cancelDelete }) => {
  return (
    <View
      style={[
        tw`absolute items-center`,
        {
          top: "20%",
          left: "8%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          width: "85%",
        },
      ]}
    >
      <View style={tw`relative`}>
        <MaterialCommunityIcons name="message" color="#005cee" size={70} />
        <TouchableOpacity
          style={{
            backgroundColor: "#EB5545",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 30,
            borderRadius: 100,
            top: -30,
            left: 40,
          }}
        >
          <Ionicons name="close" color="white" size={17} />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-black text-lg font-bold `}>Delete mesage?</Text>
      <Text style={tw`text-gray-400 text-sm my-3 w-52 text-center`}>
        Do you really want to delete this conversation?
      </Text>

      {/* buttons */}
      <View style={tw`flex-row  w-full items-center justify-between`}>
        <Button
          onPress={cancelDelete}
          title="Cancel"
          type="clear"
          titleStyle={{ fontSize: 15, fontWeight: "bold", color: "black" }}
          buttonStyle={{ margin: 10 }}
        />

        <Button
          onPress={cancelDelete}
          title="Delete"
          type="solid"
          titleStyle={{ fontSize: 15, fontWeight: "bold", color: "white" }}
          buttonStyle={{
            backgroundColor: "#EB5545",
            textAlign: "center",
            margin: 10,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default DeleteMessageModal;

25 + 25;

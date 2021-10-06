import {
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";

const DeleteMessageModal = (props) => {
  const { modal, UpdateUsersProfile, setOpenModal, setImage } = props;
  const handleUpload = () => {
    UpdateUsersProfile();
    setOpenModal(false);
  };

  const handleCancel = () => {
    modal();
    setImage(null);
  };
  return (
    <View
      style={[
        tw`absolute items-center`,
        {
          top: "30%",
          left: "12%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          width: "85%",
          zIndex: 20,
        },
      ]}
    >
      <View style={tw`relative`}>
        {/* <MaterialCommunityIcons name="message" color="#005cee" size={70} /> */}
        <FontAwesome name="image" size={70} color="#005cee" />
        {/* <TouchableOpacity
          style={{
            backgroundColor: "#EB5545",
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 30,
            borderRadius: 100,
            top: -30,
            left: 50,
          }}
        >
          <Ionicons name="close" color="white" size={17} />
          <Feather name="check" size={17} color="white" />
        </TouchableOpacity> */}
      </View>
      <Text style={tw`text-black text-lg font-bold `}>Upload Image</Text>
      <Text style={tw`text-gray-400 text-sm my-3 w-52 text-center`}>
        Do you want to upload image?
      </Text>

      {/* buttons */}
      <View style={tw`flex-row  w-full items-center justify-between`}>
        <Button
          onPress={handleCancel}
          title="Cancel"
          type="clear"
          titleStyle={{ fontSize: 15, fontWeight: "bold", color: "black" }}
          buttonStyle={{ margin: 10 }}
        />

        <Button
          onPress={handleUpload}
          // title="Delete"
          title="Upload"
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

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import pics from "../images/user.jpg";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProfilePicture = () => {
  const { usersData } = useSelector((state) => state);

  const navigation = useNavigation();
  return (
    <View style={tw`items-center py-5  `}>
      <View style={tw`flex-row items-center absolute top-5 left-2 `}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="white" size={25} />
        </TouchableOpacity>
        <Text style={tw`text-xl text-white font-bold ml-3`}>Your Profile</Text>
      </View>

      <View style={tw`relative mt-6`}>
        <Image
          source={usersData?.photoURL !== null ? usersData?.photoURL : pics}
          style={{
            height: 140,
            width: 140,
            borderRadius: 100,
            margin: 10,
            borderWidth: 4,
            borderColor: "white",
          }}
        />

        <TouchableOpacity
          style={tw`bg-blue-600 rounded-full p-1 items-center absolute bottom-4 right-4`}
        >
          <EvilIcons name="pencil" color="white" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-white text-lg`}>
        {usersData?.displayName ? usersData?.displayName : usersData?.email}
      </Text>
      <Text style={tw`text-gray-200 text-sm`}>lets not wait for it</Text>
    </View>
  );
};

export default ProfilePicture;

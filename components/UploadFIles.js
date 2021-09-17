import React, { useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Feather, Ionicons, FontAwesome } from "@expo/vector-icons";

const UploadFIles = ({ hideUploadFile }) => {
  return (
    <View style={tw`absolute left-3 bottom-3 w-11/12 overflow-hidden`}>
      <View style={tw`bg-gray-300 rounded-lg w-full p-4`}>
        {/* Camera */}
        <TouchableOpacity style={tw`flex-row mb-2 items-center `}>
          <Feather name="camera" color="#3f7fe6f3" size={25} style={tw`px-4`} />
          <Text style={tw`text-white text-lg font-bold text-black`}>
            Camera
          </Text>
        </TouchableOpacity>

        <View style={tw`bg-gray-400 w-full h-px my-2`} />

        {/* photo and video  */}
        <TouchableOpacity style={tw`flex-row mb-2 items-center `}>
          <AntDesign
            name="picture"
            color="#3f7fe6f3"
            size={25}
            style={tw`px-4`}
          />
          <Text style={tw`text-white text-lg font-bold text-black`}>
            Photo and Video Library
          </Text>
        </TouchableOpacity>

        <View style={tw`bg-gray-400 w-full h-px my-2`} />

        {/* Document */}
        <TouchableOpacity style={tw`flex-row mb-2 items-center `}>
          <Ionicons
            name="document-outline"
            color="#3f7fe6f3"
            size={25}
            style={tw`px-4`}
          />
          <Text style={tw`text-white text-lg font-bold text-black`}>
            Document
          </Text>
        </TouchableOpacity>

        <View style={tw`bg-gray-400 w-full h-px my-2`} />

        {/* Location */}
        <TouchableOpacity style={tw`flex-row mb-2 items-center `}>
          <Ionicons
            name="location-outline"
            color="#3f7fe6f3"
            size={25}
            style={tw`px-4`}
          />
          <Text style={tw`text-white text-lg font-bold text-black`}>
            Location
          </Text>
        </TouchableOpacity>

        <View style={tw`bg-gray-400 w-full h-px my-2`} />

        {/* Contact */}
        <TouchableOpacity style={tw`flex-row mb-2 items-center `}>
          <FontAwesome
            name="user-circle-o"
            color="#3f7fe6f3"
            size={25}
            style={tw`px-4`}
          />
          <Text style={tw`text-white text-lg font-bold text-black`}>
            Contact
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cancel */}
      {/* <View style={tw``}> */}
      <TouchableOpacity
        style={tw`items-center bg-gray-300 rounded-lg p-3 mt-2`}
        onPress={hideUploadFile}
      >
        <Text
          style={[
            tw` text-lg font-bold `,
            { color: "#3f7fe6f3", textAlign: "center" },
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

export default UploadFIles;

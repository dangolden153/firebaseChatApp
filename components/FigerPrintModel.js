import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import pics from "../images/finger.png";
const FigerPrintModel = ({ navigation }) => {
  return (
    <View
      style={[
        tw`absolute items-center`,
        {
          top: "40%",
          left: "15%",
          backgroundColor: "#000000",
          padding: 40,
          borderRadius: 20,
          width: "85%",
        },
      ]}
    >
      <Text style={tw`text-white text-lg font-bold `}>Fingerprint</Text>
      <Text style={tw`text-white text-lg font-bold`}>Authentication</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("LoginProfileScreen")}
      >
        <Image
          source={pics}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginVertical: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FigerPrintModel;

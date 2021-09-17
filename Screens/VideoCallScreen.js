import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import pics from "../images/pics7.jpg";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

const VideoCallScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 relative`}>
      <StatusBar style="auto" />

      <Image
        source={pics}
        style={{ width: "100%", height: "75%", resizeMode: "cover" }}
      />

      <View
        style={[
          tw`flex-grow  items-center justify-center`,
          { backgroundColor: "rgba(30, 30, 30, 0.5)" },
        ]}
      >
        <View style={tw`flex-row justify-between w-3/5 mb-3 items-center`}>
          {/* mute */}
          <View style={tw`items-center`}>
            <TouchableOpacity style={styles.icon}>
              <FontAwesome name="microphone" color="white" size={25} />
            </TouchableOpacity>
            <Text style={tw`text-sm text-white mt-1`}>mute</Text>
          </View>

          {/* flip */}
          <View style={tw`items-center`}>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="camera-reverse-sharp" color="white" size={25} />
            </TouchableOpacity>
            <Text style={tw`text-sm text-white mt-1`}>flip</Text>
          </View>

          {/* end */}
          <View style={tw`items-center`}>
            <TouchableOpacity
              style={{
                backgroundColor: "#EB5545",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                height: 50,
                width: 50,
                borderRadius: 100,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" color="white" size={25} />
            </TouchableOpacity>
            <Text style={tw`text-sm mt-1 text-white`}>end</Text>
          </View>
        </View>

        {/* button  */}
        <View style={tw`flex-row justify-between items-center  `}>
          <Button
            title="Camera off"
            type="solid"
            titleStyle={styles.title}
            icon={
              <MaterialIcons
                name="videocam-off"
                color="white"
                size={17}
                style={tw`px-2`}
              />
            }
            buttonStyle={styles.btn}
          />

          <Button
            title="Speaker"
            type="solid"
            titleStyle={styles.title}
            icon={
              <Octicons
                name="megaphone"
                color="white"
                size={17}
                style={tw`px-2`}
              />
            }
            buttonStyle={styles.btn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "gray",
    borderRadius: 100,
    paddingHorizontal: 10,
    width: 150,
    alignItems: "center",
    margin: 10,
  },
  icon: {
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  title: {
    fontSize: 12,
  },
});
// +25 + 25 + 25 + 25
//

// ;
//  = megaphone;

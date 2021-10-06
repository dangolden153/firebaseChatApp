import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { auth, db, firebase } from "../firebase";
import { useSelector } from "react-redux";

const ProfileSettingList = () => {
  const { usersData } = useSelector((state) => state);

  const updateUser = async () => {
    await db;
    db.collection("users")
      .doc(usersData.uid)
      .update({
        status: firebase.firestore.Timestamp.fromDate(new Date()),
      });
  };
  // firebase.firestore.Timestamp.fromDate(new Date())
  // firebase.firestore.FieldValue.serverTimestamp()
  const handleSignOut = () => {
    const timeStamp = new Date().getTime();
    // toISOString()
    auth.signOut().then((res) => {
      updateUser();
      firebase
        .database()
        .ref("usersList/" + usersData?.uid)
        .update({
          status: timeStamp,
        })
        .then((res) => {
          console.log("time update to db", res);
        })
        .catch((e) => console.log(e));
    });
    console.log("signed out!!");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={tw`bg-gray-800 rounded-lg p-4`}>
        {/* account */}
        <TouchableOpacity style={tw`flex-row mb-2  `} onPress={handleSignOut}>
          <Feather
            name="key"
            color="black"
            size={25}
            style={tw`items-center bg-white p-3 rounded-lg`}
          />
          <View style={tw`ml-6`}>
            <Text style={tw`text-white text-lg `}>Accounts</Text>
            <Text style={tw`text-gray-300 text-sm`}>Privacy, change name</Text>
          </View>
        </TouchableOpacity>

        {/* chat */}
        <TouchableOpacity style={tw`flex-row my-2`}>
          <Feather
            name="message-square"
            color="black"
            size={25}
            style={tw`items-center bg-white p-3 rounded-lg`}
          />
          <View style={tw`ml-6`}>
            <Text style={tw`text-white text-lg `}>Chats</Text>
            <Text style={tw`text-gray-300 text-sm`}>
              Backup, history, wallpaper
            </Text>
          </View>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={tw`flex-row  my-2`}>
          <MaterialIcons
            name="notifications-none"
            color="black"
            size={27}
            style={tw`items-center bg-white p-3 rounded-lg`}
          />
          <View style={tw`ml-6`}>
            <Text style={tw`text-white text-lg `}>Notifications</Text>
            <Text style={tw`text-gray-300 text-sm`}>
              Message, groups call tones
            </Text>
          </View>
        </TouchableOpacity>

        {/* Security setting */}
        <TouchableOpacity style={tw`flex-row  my-2`}>
          <MaterialIcons
            name="security"
            color="black"
            size={25}
            style={tw`items-center bg-white p-3 rounded-lg`}
          />
          <View style={tw`ml-6`}>
            <Text style={tw`text-white text-lg `}>Security Settings </Text>
            <Text style={tw`text-gray-300 text-sm`}>
              Network usage, passcode
            </Text>
          </View>
        </TouchableOpacity>

        {/* Help */}
        <TouchableOpacity style={tw`flex-row mt-2`}>
          <Feather
            name="help-circle"
            color="black"
            size={25}
            style={tw`items-center bg-white p-3 rounded-lg`}
          />
          <View style={tw`ml-6 `}>
            <Text style={tw`text-white text-lg `}>Help</Text>
            <Text style={tw`text-gray-300 text-sm`}>
              FAQ, contact us, privacy policy
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* invite friends */}
      <View style={tw`bg-gray-800 rounded-lg p-3 mt-2`}>
        <TouchableOpacity style={tw`flex-row `}>
          <Feather
            name="users"
            color="black"
            size={25}
            style={tw`items-center bg-white p-3 rounded-lg`}
          />
          <View style={tw`ml-6`}>
            <Text style={tw`text-white text-lg `}>Invite Friends </Text>
            <Text style={tw`text-gray-300 text-sm`}>
              Invite new friends and earn
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileSettingList;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import pics from "../images/user.jpg";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { firebase, db } from "../firebase";
import DeleteMessageModal from "./DeleteMessageModal";

const ProfilePicture = ({ CurrentUserCred }) => {
  const { usersData, usersDetails, CurrentUserCreds } = useSelector(
    (state) => state
  );
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();
  const pic =
    "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg";

  const handleModal = () => setOpenModal(!openModal);

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
      .then(async (res) => {
        console.log("image picker result:", res);
        setImage(res.uri);
        setOpenModal(true);
      })
      .catch((e) => console.log("uploading went wrong:", e));
  };

  ////// updating profile from the firebase database

  const UpdateUsersProfile = async () => {
    if (image) {
      setUploading(true);
      try {
        return firebase
          .database()
          .ref("usersList/" + usersData?.uid)
          .update({
            img: image,
          })
          .then((res) => {
            setUploading(false);
            setImage(null);
            console.log("sucessful updated image to db", res);
          })
          .catch((e) => console.log(e));
      } catch (e) {
        setImage(null);
        setUploading(false);
        return console.log(e);
      }
    }
  };

  const img = CurrentUserCred?.img;
  return (
    <>
      {openModal && (
        <DeleteMessageModal
          UpdateUsersProfile={UpdateUsersProfile}
          modal={handleModal}
          setOpenModal={setOpenModal}
          setImage={setImage}
        />
      )}
      <View style={tw`items-center py-5  `}>
        <View style={tw`flex-row items-center absolute top-5 left-2 `}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" color="white" size={25} />
          </TouchableOpacity>
          <Text style={tw`text-xl text-white font-bold ml-3`}>
            Your Profile
          </Text>
        </View>
        {/*  */}
        <View style={tw` relative mt-6 `}>
          {uploading && (
            <ActivityIndicator
              style={{ position: "absolute", top: 70, left: 70, zIndex: 50 }}
              size="small"
              color="#0000ff"
            />
          )}

          <Image
            source={{
              uri: image ? image : img,
            }}
            style={{
              height: 140,
              width: 140,
              // resizeMode: "contain",
              borderRadius: 100,
              margin: 10,
              borderWidth: 4,
              borderColor: "white",
            }}
          />

          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={tw`bg-blue-600 rounded-full p-1 items-center absolute bottom-4 right-4`}
          >
            <EvilIcons name="pencil" color="white" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-white text-lg`}>
          {usersData?.displayName ? usersData?.displayName : usersData?.email}
        </Text>
        <Text style={tw`text-gray-200 text-sm`}>lets not wait for it</Text>
        {/* <Button
          style={{ marginTop: 5 }}
          title="upload"
          onPress={UpdateUsersProfile}
        /> */}
      </View>
    </>
  );
};

export default ProfilePicture;

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import tw from "tailwind-react-native-classnames";
import pics from "../images/user.jpg";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
// import ImagePicker from "react-native-image-crop-picker";
import * as ImagePicker from "expo-image-picker";
import { firebase, db } from "../firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const ProfilePicture = () => {
  const { usersData } = useSelector((state) => state);
  const { usersDetails } = useSelector((state) => state);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();

  const imageUpload = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(`images/${new Date().toString()}`)
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);

      const taskComplete = () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log("uploading image url:", url);
          })
          .catch((e) => console.log(e));
      };

      const taskError = (snapshot) => {
        console.log(snapshot);
      };

      task.on("stateChanged", taskProgress, taskError, taskComplete);
    };
  };

  const updateUserImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(`images/${new Date().toString()}`)
      .put(blob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        alert("uploading", error);
        blob.close;
        setUploading(false);
        return;
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            db.collection("users")
              .doc(usersData.uid)
              .update({
                img: url,
              })
              .then((res) => console.log("image upload sucessful", res))
              .catch((e) => console.log(e));
            blob.close;
            setUploading(false);
            console.log("download url:", url);
            return url;
          })
          .catch((e) => console.log(e));
      }
    );
    // await db;
  };

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
      .then((res) => {
        console.log("image picker result:", res);
        setImage(res.uri);
        // updateUserImage();
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={tw`items-center py-5  `}>
      <View style={tw`flex-row items-center absolute top-5 left-2 `}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="white" size={25} />
        </TouchableOpacity>
        <Text style={tw`text-xl text-white font-bold ml-3`}>Your Profile</Text>
      </View>
      {/*  */}
      <View style={tw`relative mt-6`}>
        <Image
          source={usersDetails?.img !== null ? usersDetails?.img : pics}
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
      <Button
        style={{ marginTop: 5 }}
        title="upload"
        onPress={updateUserImage}
      />
    </View>
  );
};

export default ProfilePicture;

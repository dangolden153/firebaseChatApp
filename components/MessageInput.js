import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { db, firebase } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import UploadFIles from "./UploadFIles";
import { useSelector, useDispatch } from "react-redux";

const MessageInput = ({ otherUserId }) => {
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);
  const { usersData } = useSelector((state) => state);
  const showUploadFile = () => setState(true);
  const hideUploadFile = () => setState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // function for pushing messages to firebase realtime database
  const sendMessg = async () => {
    await firebase
      .database()
      .ref("messages/" + usersData?.uid)
      .child(otherUserId)
      .push({
        message: {
          senderId: usersData?.uid,
          recieverId: otherUserId,
          messages: message,
          image,
          createdAt: +new Date(),
        },
      })
      .then((res) => {
        console.log("res", res);
        setMessage("");
        setImage("");
      })
      .catch((e) => console.log(e));
  };
  // function for pushing messages to firebase realtime database
  const recipientMessg = async () => {
    await firebase
      .database()
      .ref("messages/" + otherUserId)
      .child(usersData?.uid)
      .push({
        message: {
          senderId: usersData?.uid,
          recieverId: otherUserId,
          messages: message,
          image,
          createdAt: +new Date(),
        },
      })
      .then((res) => {
        console.log("res", res);
        setMessage("");
        setImage("");
      })
      .catch((e) => console.log(e));
  };
  // function for pushing messages to firebase realtime database
  const sendMessage = async () => {
    if (message || image) {
      await sendMessg();
      await recipientMessg();
    }
  };

  /// pick image from photo library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //// snap and image from phone camera
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "IOS" ? "padding" : "height"}
      // style={{ flex: 1 }}
      keyboardVerticalOffset={100}
      style={[tw` `, {}]}
    >
      {image ? (
        <View
          style={{
            height: 120,
            width: 120,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#bec0db",
            margin: 10,
          }}
        >
          <Image source={{ uri: image }} style={{ height: 100, width: 100 }} />
          <TouchableOpacity
            onPress={() => setImage(null)}
            style={{
              backgroundColor: "white",
              height: 30,
              width: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              top: -10,
              right: -10,
              position: "absolute",
            }}
          >
            <AntDesign name="close" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={[
          tw` items-center justify-between bg-white flex-row p-2  self-center rounded-full`,
          { width: "100%" },
        ]}
      >
        <TouchableOpacity>
          <Feather name="smile" size={25} color="black" />
        </TouchableOpacity>

        <TextInput
          placeholder="Type your messages..."
          // numberOfLines={10}
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            backgroundColor: "white",
            width: "70%",
            paddingVertical: 5,
            //   hieght: "100%",
            fontSize: 16,
            paddingLeft: 10,
            // overflow: "hidden",
          }}
          // value={}
        />

        <View style={tw`flex-row `}>
          <TouchableOpacity
            style={tw`mr-1`}
            onPress={showUploadFile} //showUploadFile ||
          >
            <Ionicons name="attach" size={28} color="#005CEE" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sendMessage} ///sendCoversationMessg ||
          >
            <Feather name="send" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {state && (
        <UploadFIles
          hideUploadFile={hideUploadFile}
          takePhoto={takePhoto}
          pickImage={pickImage}
          setState={setState}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

const styles = StyleSheet.create({});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { chatData } from "./data";
import { Icon } from "react-native-elements";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import UploadFIles from "./UploadFIles";
import DeleteMessageModal from "./DeleteMessageModal";
import { db, firebase, Firebase } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import * as ImagePicker from "expo-image-picker";

const Chats = ({ otherUserId, data }) => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [messg, setMessg] = useState([]);
  const { usersData } = useSelector((state) => state);
  const handleDelete = () => setDeleteMessage(true);
  const cancelDelete = () => setDeleteMessage(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // console.log("data", data);
  const showUploadFile = () => setState(true);
  const hideUploadFile = () => setState(false);
  const dispatch = useDispatch();

  const lastMessage = messg?.[0]?.message;
  const lastCreatedMesg = messg?.[0]?.createdAt;

  // const openImagePickerAsync = async () => {
  //   let permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync()
  //     .then((res) => {
  //       console.log("image picker result:", res);
  //       setImage(res.uri);
  //       // updateUserImage();
  //     })
  //     .catch((e) => console.log("uploading went wrong:", e));
  // };

  // const uploadImage = async () => {
  //   const response = await fetch(image);
  //   const blob = await response.blob();

  //   const task = firebase
  //     .storage()
  //     .ref()
  //     .child(`images/${new Date().toString()}`)
  //     .put(blob);

  //   task.on(
  //     firebase.storage.TaskEvent.STATE_CHANGED,
  //     () => {
  //       setUploading(true);
  //     },
  //     (error) => {
  //       alert("uploading", error);
  //       blob.close;
  //       setUploading(false);
  //       return;
  //     },
  //     () => {
  //       task.snapshot.ref
  //         .getDownloadURL()
  //         .then((url) => {
  //           db.collection("conversation")
  //             .add({
  //               ...obj,
  //               img: url,
  //               createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //             })
  //             .then(() => {
  //               // createChattedUsers();
  //               setMessage("");
  //               console.log("new user added to collection unsucessfull ");
  //             })

  //             .catch((e) => {
  //               setMessage("");
  //               console.log("message unsucessfull ", e);
  //             });

  //           blob.close;
  //           setUploading(false);
  //           console.log("download url:", url);
  //           return url;
  //         })
  //         .catch((e) => console.log(e));
  //     }
  //   );
  //   // await db;
  // };

  // fuction for paading messages to firebase realtime database

  // const sendMessg = async () => {
  //   try {
  //     return firebase
  //       .database()
  //       .ref("messages/" + usersData?.uid)
  //       .child(otherUserId)
  //       .push({
  //         message: {
  //           senderId: usersData?.uid,
  //           recieverId: otherUserId,
  //           messages: message,
  //           createdAt: Firebase.database.ServerValue.TIMESTAMP(),
  //         },
  //       });
  //   } catch (err) {
  //     return alert(err);
  //   }
  // };

  // const getMessg = async () => {
  //   try {
  //     return firebase
  //       .database()
  //       .ref("messages/" + otherUserId)
  //       .child(usersData?.uid)
  //       .push({
  //         message: {
  //           senderId: usersData?.uid,
  //           recieverId: otherUserId,
  //           messages: message,
  //           createdAt: Firebase.database.ServerValue.TIMESTAMP(),
  //         },
  //       });
  //   } catch (err) {
  //     return alert(err);
  //   }
  // };

  // get chat data from firebase real databASE

  // useEffect(() => {
  //   try {
  //     firebase
  //       .database()
  //       .ref("messages")
  //       .child(usersData?.uid)
  //       .child(otherUserId)
  //       // .orderBy("tim")
  //       .on("value", (dataSnaphot) => {
  //         let mesg = [];
  //         dataSnaphot.forEach((data) => {
  //           console.log("my database data:", data.val());
  //           mesg.push({
  //             message: data.val().message?.messages,
  //             sender: data.val().message?.senderId,
  //             reciever: data.val().message?.recieverId,
  //             time: data.val().message?.createAt,
  //           });
  //           setMessg(mesg);
  //         });
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  // console.log(typeof messg);
  // console.log("chat data: ", messg?.message);

  // const sendMwssageFirestore = () => {
  //   db.collection("chats")
  //     .doc(otherUserId)
  //     .collection("messages")
  //     .add({
  //       message,
  //     })
  //     .then(() => console.log("message sucessfully added"))
  //     .catch((e) => console.log("message unsucessfull "));
  // };

  const currentUserId = usersData?.uid;
  const obj = {
    otherUserId,
    currentUserId,
    message,
  };

  const sendCoversationMessg = () => {
    if (message) {
      db.collection("conversation")
        .add({
          ...obj,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          // createChattedUsers();
          setMessage("");
          console.log("new user added to collection unsucessfull ");
        })

        .catch((e) => {
          setMessage("");
          console.log("message unsucessfull ", e);
        });
      return;
    }
  };

  // lastMessage, lastCreatedMesg
  //// conversation recieve from firestore
  useEffect(() => {
    const getConversationFirestore = db
      .collection("conversation")
      .where("currentUserId", "in", [currentUserId, otherUserId])
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let conversation = [];
        querySnapshot.forEach((docs) => {
          if (
            (docs.data().currentUserId == currentUserId &&
              docs.data().otherUserId == otherUserId) ||
            (docs.data().currentUserId == otherUserId &&
              docs.data().otherUserId == currentUserId)
          ) {
            conversation.push(docs.data());
          }
        });
        setMessg(conversation);
        dispatch({ type: "get_messages", payload: conversation });
      });

    return getConversationFirestore;
  }, [setMessg]);

  // const createChattedUsers = () => {
  //   if (message) {
  //     db.collection("users")
  //       .doc(currentUserId)
  //       .collection("chattedUsers")
  //       .add({
  //         ...data,
  //         currentUserId,
  //         lastMessage: lastMessage,
  //         lastCreatedMesg: lastCreatedMesg,
  //       })
  //       .then((res) => console.log("user added sucessfully"))
  //       .catch((e) => console.log(e));
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "IOS" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FlatList
        inverted
        style={{ flexGrow: 0.88 }}
        data={messg}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Message item={item} usersData={usersData} />}
      />

      {/* input elements */}

      <View
        style={[
          tw`bg-gray-200  absolute items-center justify-between bottom-2 p-2 flex-row self-center rounded-full`,
          { width: "100%" },
        ]}
      >
        <TouchableOpacity>
          <Feather
            // type=""
            name="smile"
            size={25}
            color="black"
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Type your messages..."
          // numberOfLines={10}
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            width: "70%",
            paddingVertical: 5,
            hieght: "100%",
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
            onPress={sendCoversationMessg} ///sendCoversationMessg ||
          >
            <Feather name="send" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {deleteMessage && <DeleteMessageModal cancelDelete={cancelDelete} />}
      {state && <UploadFIles hideUploadFile={hideUploadFile} />}
    </KeyboardAvoidingView>
  );
};

export default Chats;

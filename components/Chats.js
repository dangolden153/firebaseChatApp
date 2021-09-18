import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { chatData } from "./data";
import { Icon } from "react-native-elements";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import UploadFIles from "./UploadFIles";
import DeleteMessageModal from "./DeleteMessageModal";
import { db, firebase } from "../firebase";
import { useSelector } from "react-redux";

const Chats = ({ otherUserId }) => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [messg, setMessg] = useState([]);
  const { usersData } = useSelector((state) => state);
  const handleDelete = () => setDeleteMessage(true);
  const cancelDelete = () => setDeleteMessage(false);

  const showUploadFile = () => setState(true);
  const hideUploadFile = () => setState(false);

  const sendMessg = async () => {
    try {
      return firebase
        .database()
        .ref("messages/" + usersData?.uid)
        .child(otherUserId)
        .push({
          message: {
            senderId: usersData?.uid,
            recieverId: otherUserId,
            messages: message,
          },
        });
    } catch (err) {
      return alert(err);
    }
  };

  const getMessg = async () => {
    try {
      return firebase
        .database()
        .ref("messages/" + otherUserId)
        .child(usersData?.uid)
        .push({
          message: {
            senderId: usersData?.uid,
            recieverId: otherUserId,
            messages: message,
          },
        });
    } catch (err) {
      return alert(err);
    }
  };

  const handleSend = () => {
    if (message) {
      sendMessg()
        .then((res) => console.log("message sent", res))
        .catch((e) => console.log(e));

      getMessg()
        .then((res) => console.log("message received", res))
        .catch((e) => console.log(e));
      setMessage("");
      return;
    }
  };

  useEffect(() => {
    try {
      firebase
        .database()
        .ref("messages")
        .child(usersData?.uid)
        .child(otherUserId)
        .on("value", (dataSnaphot) => {
          let mesg = [];
          dataSnaphot.forEach((data) => {
            console.log("my database data:", data.val());
            mesg.push({
              message: data.val().message?.messages,
              sender: data.val().message?.senderId,
              reciever: data.val().message?.recieverId,
            });
            setMessg(mesg.reverse());
          });
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // console.log(typeof messg);
  // console.log("chat data: ", messg?.message);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        inverted
        style={{ flexGrow: 0.88 }}
        data={messg}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({
          item: {
            userName,
            image,
            userChat,
            id,
            date,
            notifications,
            message,
            reciever,
            sender,
          },
        }) => (
          <View style={{ flex: 1 }}>
            <ScrollView>
              {/* {sender === usersData?.uid ? ( */}
              <View
                style={[
                  tw`flex-row items-center `,
                  {
                    flex: 1,
                    alignSelf:
                      sender === usersData?.uid ? "flex-end" : "flex-start",
                  },
                ]}
              >
                <Text
                  style={{
                    color: sender === usersData?.uid ? "#bec0db" : "black",
                    margin: 20,
                  }}
                >
                  {/* date {console.log("useres message", message)} */}
                </Text>
                <Text
                  onPress={handleDelete}
                  style={[
                    tw` text-white p-4  `,
                    {
                      backgroundColor:
                        sender === usersData?.uid ? "#005CEE" : "#dddddd",
                      // borderBottomLeftRadius: 10,
                      // borderTopLeftRadius: 10,
                      // borderBottomRightRadius: 10,
                      borderRadius: 10,
                      maxWidth: "70%",
                      marginVertical: 10,
                      color: sender === usersData?.uid ? "white" : "black",
                    },
                  ]}
                >
                  {message}
                </Text>
              </View>
              {/* ) : ( */}
              {/* <View style={tw`flex-row items-center `}>
                  <Text
                    onPress={handleDelete}
                    style={[
                      tw` text-white p-2 text-black  bg-gray-300`,
                      {
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        maxWidth: "70%",
                        marginVertical:10
                      },
                    ]}
                  >
                    {message}
                  </Text>
                  <Text style={{ color: "#bec0db", margin: 20 }}>{date}</Text>
                </View>  */}

              {/* )} */}
            </ScrollView>
          </View>
        )}
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
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            width: "70%",
            height: "100%",
            paddingVertical: 5,
            fontSize: 16,
            paddingLeft: 10,
          }}
          // value={}
        />

        <View style={tw`flex-row `}>
          <TouchableOpacity style={tw`mr-1`} onPress={showUploadFile}>
            <Ionicons name="attach" size={28} color="#005CEE" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSend}>
            <Feather name="send" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {deleteMessage && <DeleteMessageModal cancelDelete={cancelDelete} />}
      {state && <UploadFIles hideUploadFile={hideUploadFile} />}
    </SafeAreaView>
  );
};

export default Chats;

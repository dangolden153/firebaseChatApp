import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";

import DeleteMessageModal from "./DeleteMessageModal";
import { firebase } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import MessageInput from "./MessageInput";

const Chats = ({ otherUserId, data }) => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [messg, setMessg] = useState([]);
  const { usersData, CurrentUserCred, chattedUsers } = useSelector(
    (state) => state
  );
  const handleDelete = () => setDeleteMessage(true);
  const cancelDelete = () => setDeleteMessage(false);
  const dispatch = useDispatch();

  // get chat data from firebase real databASE

  console.log("messg", messg);

  useEffect(() => {
    firebase
      .database()
      .ref("messages")
      .child(usersData?.uid)
      .child(otherUserId)
      .on("value", (dataSnaphot) => {
        let mesg = [];
        dataSnaphot.forEach((data) => {
          console.log("my database data:", data.val());
          dispatch({ type: "get_messages", payload: data.val() });
          mesg.push({
            message: data.val().message?.messages,
            sender: data.val().message?.senderId,
            reciever: data.val().message?.recieverId,
            time: data.val().message?.createdAt,
            image: data.val().message?.image,
          });
        });

        setMessg(mesg.reverse());
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        inverted
        data={messg}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Message item={item} usersData={usersData} />}
      />

      {/* <View style={{ height: 10 }} /> */}
      {/* input elements */}
      <MessageInput otherUserId={otherUserId} />

      {deleteMessage && <DeleteMessageModal cancelDelete={cancelDelete} />}
    </View>
  );
};

export default Chats;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { db, firebase } from "../firebase";
import { useSelector } from "react-redux";

const Chats = ({ route }) => {
  const [message, setMessage] = useState("");
  const [messg, setMessg] = useState([]);
  const { usersData } = useSelector((state) => state);

  //   const sendMessage = () => {
  //     db.collection("users")
  //       .doc(route.params.id)
  //       .collection("messagesss")
  //       .doc(route.params.id + usersData?.uid)
  //       .set({
  //         message: message,
  //       })
  //       .then((res) => console.log("sucessful", res))
  //       .catch((e) => console.log(e));

  //     db.collection("users")
  //       .doc(usersData?.uid)
  //       .collection("messagesss")
  //       .doc(route.params.id + usersData?.uid)
  //       .set({
  //         message: message,
  //       })
  //       .then((res) => console.log("sucessful", res))
  //       .catch((e) => console.log(e));
  //     setMessage("");
  //   };

  //   useEffect(() => {
  //     const getData = () => {
  //       db.collection("users")
  //         .doc(route.params.id)
  //         .collection("messagesss")
  //         // .doc(route?.params?.id + usersData?.uid)
  //         // .get((res) => {
  //         //   if (res) {
  //         //     console.log(res);
  //         //     return;
  //         //   }
  //         // });
  //         .onSnapshot((snap) => {
  //           //   if (snap.exist) {
  //           setMessages(
  //             snap.docs.map((doc) => ({
  //               id: doc.id,
  //               data: doc.data(),
  //             }))
  //           );
  //           //   }
  //         });
  //     };

  //     getData();
  //   }, [route]);

  const sendMessg = async () => {
    try {
      return firebase
        .database()
        .ref("messages/" + usersData?.uid)
        .child(route.params.id)
        .push({
          message: {
            senderId: usersData?.uid,
            recieverId: route.params.id,
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
        .ref("messages/" + route.params.id)
        .child(usersData?.uid)
        .push({
          message: {
            senderId: usersData?.uid,
            recieverId: route.params.id,
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
        .child(route.params.id)
        .on("value", (dataSnaphot) => {
          let mesg = [];
          dataSnaphot.forEach((data) => {
            console.log("my database data:", data.val());
            mesg.push({
              message: data.val().message?.messages,
              sender: data.val().message?.messages.senderId,
              reciever: data.val().message?.messages.recieverId,
            });
            setMessg(mesg.reverse());
          });
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  //   console.log(typeof messg);
  console.log("chat sender data: ", messg.sender);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        inverted
        data={messg}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item?.message}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="send a message"
        //   style={{}}
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="submit" onPress={handleSend} />
    </View>
  );
};

export default Chats;

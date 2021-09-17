import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { db } from "../firebase";

const UserItems = ({ id, data, navigation }) => {
  const { email } = data;
  //   console.log(data);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chats", {
          id,
          data,
        })
      }
    >
      <Text style={{ color: "white" }}>{email}</Text>
    </TouchableOpacity>
  );
};

export default UserItems;

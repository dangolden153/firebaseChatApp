import React from "react";
import { Button } from "react-native-elements/dist/buttons/Button";
import { View, Text, Button } from "react-native";
const GettingCall = ({ join, hangUp }) => {
  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={join}
        title="pick"
        style={{ backgroundColor: "green" }}
      />
      <Button
        onPress={hangUp}
        title="pick"
        style={{ backgroundColor: "red" }}
      />
    </View>
  );
};

export default GettingCall;

import React from "react";
import { View, Text, Button } from "react-native";
import { RTCView } from "react-native-webrtc";

const VIdeo = ({}) => {
  if (localStream && !remoteStream) {
    return (
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <RTCView
          streamURL={localStream.toURL()}
          style={{ width: "100%", height: "100%" }}
          objectFit={"cover"}
        />
        <Button
          onPress={hangUp}
          title="hang Up"
          style={{ backgroundColor: "red" }}
        />
      </View>
    );
  }

  if (localStream && remoteStream) {
    return (
      <View style={{ flex: 1 }}>
        <RTCView
          streamURL={remoteStream.toURL()}
          style={{ width: "100%", height: "100%" }}
          objectFit={"cover"}
        />
        <RTCView
          streamURL={localStream.toURL()}
          style={{ width: 100, height: 100 }}
          objectFit={"cover"}
        />
        <Button
          onPress={hangUp}
          title="hang Up"
          style={{ backgroundColor: "red" }}
        />
      </View>
    );
  }

  return (
    <Button
      onPress={hangUp}
      title="hang Up"
      style={{ backgroundColor: "red" }}
    />
  );
};

export default VIdeo;

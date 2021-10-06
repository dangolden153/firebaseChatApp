import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const OpenImage = ({ route }) => {
  const { image } = route?.params;
  //   console.log(image);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ height: 400, width: "100%", resizeMode: "cover" }}
      />
    </View>
  );
};

export default OpenImage;

const styles = StyleSheet.create({});

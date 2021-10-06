import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Indicator = () => (
  <View style={[styles.container, styles.horizontal]}>
    {/* <ActivityIndicator animating={true} size="small" color="gray" /> */}
    <ActivityIndicator size="large" color="gray" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    zIndex: 20,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    zIndex: 20,
  },
});

export default Indicator;

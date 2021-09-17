import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

const TabList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.11)",
          alignItems: "center",
          overflow:"hidden"
        }}
      >
        <Text
          style={
            (styles.text,
            {
              backgroundColor: "white",
              width: "33.33%",
              height: 60,
              color: "black",
              fontSize: 16,
              alignSelf:"center",
              textAlign: "center",
            //   marginTop: 10,
                // display:"flex",
                // flexDirection:"column",
                // alignItems: "center",
                // justifyContent:"center"
                paddingVertical: 20,
            })
          }
        >
          Favourites
        </Text>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.152)",
            height: "100%",
            width: 1,
          }}
        />
        <Text style={styles.text}>Friends</Text>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.152)",
            height: "100%",
            width: 1,
          }}
        />
        <Text style={styles.text}>Groups</Text>
      </View>
    </SafeAreaView>
  );
};

export default TabList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    width: "33.333%",
    alignSelf: "center",
  },
});

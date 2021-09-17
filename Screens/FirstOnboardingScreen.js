import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import pics from "../images/Onboarding2.jpg";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigation } from "@react-navigation/native";
import UploadFIles from "../components/UploadFIles";

const FirstOnboardingScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.text}>BLORD GROUP</Text> */}
      <Image
        source={pics}
        style={{
          height: 380,
          width: 600,
          // backgroundColor: "pink",
          resizeMode: "contain",
          marginTop: 10,
        }}
      />

      <View style={styles.buttonContainer}>
        <Text style={styles.textContent}>
          A good noment is like a good conversation among friends interating to
          each other
        </Text>
        <View style={styles.barContainer}>
          <View
            style={{
              height: 6,
              width: 30,
              backgroundColor: "black",
              margin: 5,
            }}
          />
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: "gray",
              margin: 5,
              borderRadius: 100,
            }}
          />
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: "gray",
              margin: 5,
              borderRadius: 100,
            }}
          />
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: "gray",
              margin: 5,
              borderRadius: 100,
            }}
          />
        </View>
        <Button
          onPress={() => navigation.navigate("SecondOnboardingScreen")}
          title="NEXT"
          titleStyle={{
            fontSize: 20,
            letterSpacing: 2,
            color: "white",
            textAlign: "center",
          }}
          buttonStyle={{
            backgroundColor: "black",
            alignItems: "center",
            width: 320,
            paddingVertical: 15,
            borderRadius: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FirstOnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  text: {
    padding: 40,
    fontSize: 25,
    fontWeight: "bold",
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: -10,
    paddingVertical: 40,
  },
  buttonContainer: {
    paddingBottom: 30,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContent: {
    fontSize: 23,
    fontWeight: "bold",
    width: 300,
    textAlign: "center",
  },
});

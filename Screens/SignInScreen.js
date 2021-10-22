import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { auth, firebase } from "../firebase";

import FigerPrintModel from "../components/FigerPrintModel";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCancel = () => {
    if (state) {
      setState(false) && setLoading(false);
      return;
    }
  };

  const addUsers = async (currentUser) => {
    try {
      return firebase
        .database()
        .ref("usersList/" + currentUser?.uid)
        .update({
          status: "online",
          // status: new Date().getTime(),
        })
        .then((res) => console.log("sucessful added to db", res))
        .catch((e) => console.log(e));
    } catch (e) {
      return console.log(e);
    }
  };
  const handleLogin = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        addUsers(response.user);
        setState(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setState(true);
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />

      {state && (
        <View
          style={{
            textAlign: "center",
            width: 250,
            paddingVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: "#3f3f3fb0",
            top: 200,
            zIndex: 10,
            // position:"relative"
          }}
        >
          <TouchableOpacity onPress={handleCancel}>
            <Icon
              name="cancel"
              type="materialIcons"
              color="white"
              style={{ zIndex: 50, alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 15,
              letterSpacing: 1,
              color: "white",
            }}
          >
            {error}
          </Text>
        </View>
      )}
      <Text style={tw`text-gray-300 text-2xl `}> Login in</Text>

      <View style={tw`mt-12 w-full items-center`}>
        {/* Gmail */}
        <View
          style={tw`bg-white  p-2 mt-3 border rounded-lg w-full overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your Gmail"
            placeholderTextColor="gray"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password */}
        <View
          style={tw`bg-white  p-2 mt-3 border rounded-lg w-full overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={tw`bg-white rounded-full p-1 border-4 border-blue-500 mt-5`}
        >
          <Ionicons name="finger-print" color="black" size={30} />
        </TouchableOpacity>

        <Button
          title="Login "
          buttonStyle={{
            width: 315,
            borderRadius: 7,
            marginVertical: 15,
            backgroundColor: "#005CEE",
            handleLogin,
          }}
          loading={loading}
          onPress={() => handleLogin()}
        />
        <View style={tw`items-center self-center `}>
          <Text style={tw` text-white text-lg`}>Dont have an account ?</Text>
          <Text
            style={tw` text-gray-400 text-sm mx-2`}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            Sign up
          </Text>
        </View>
      </View>

      {/* <FigerPrintModel navigation={navigation} /> */}
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#404040",
    backgroundColor: "#000000",

    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: -1,
    paddingTop: 30,
  },
  input: {
    // backgroundColor: "pink",
    // borderWidth: 1,
    // borderColor: "red",
    // borderRadius: 20,
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 15,
    // textAlign: "center",
    fontSize: 20,
  },
});

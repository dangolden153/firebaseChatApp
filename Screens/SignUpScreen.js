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
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { materialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { auth, db, firebase } from "../firebase";
import logo from "../images/Blord-logo.jpg";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
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
  const addUser = async (userData) => {
    await db;
    db.collection("users")
      .doc(userData.uid)
      .set(
        {
          email: userData?.email,
          userName: "",
          phoneNumber: number,
          status: "online",
          img: null,
          resgisteredTime: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then((res) => console.log("sucessful", res))
      .catch((e) => console.log(e));
  };

  const handleValidateError = () => {
    if (number.length < 4) {
      Alert.alert("please use a valid phone number! ") ||
        alert("please use a valid phone number! ");
      return;
    }
  };
  const handleSignUp = () => {
    // if (handleValidateError()) {
    //   return false;
    // }

    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setState(true);
        setLoading(false);
        addUser(response?.user);
      })
      .catch((err) => {
        setError(err.message);
        setState(true);
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

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
      <Image
        source={logo}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          marginBottom: 20,
        }}
      />

      <View style={tw`-top-16 w-full items-center`}>
        {/* google */}
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

        {/* phone  number*/}
        <View
          style={tw`bg-white  p-2 mt-3 border rounded-lg w-full overflow-hidden`}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your Phone number"
            placeholderTextColor="gray"
            value={number}
            onChangeText={(text) => setNumber(text)}
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
          onPress={() => navigation.navigate("SignInFingerPrint")}
          style={tw`bg-white rounded-full p-1 border-4 border-blue-500 mt-5`}
        >
          <Ionicons name="finger-print" color="black" size={30} />
        </TouchableOpacity>

        <Button
          title="Sign up "
          buttonStyle={{
            width: 315,
            borderRadius: 7,
            marginVertical: 15,
            backgroundColor: "#005CEE",
          }}
          loading={loading}
          // onSubmitEditing={ handleSignUp()}
          onPress={() => handleSignUp()}
        />
        <View style={tw`items-center self-center `}>
          <Text style={tw` text-white text-lg`}>Already an acount ?</Text>
          <Text
            style={tw` text-gray-400 text-sm mx-2`}
            onPress={() => navigation.navigate("SignInScreen")}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
    overflow: "hidden",
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

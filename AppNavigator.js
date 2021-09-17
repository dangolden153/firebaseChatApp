import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Easing } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import UserReducer from "./reducer/usersReducer";

import FavouriteScreen from "./Screens/FavouriteScreen";
import ChatScreen from "./Screens/ChatScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import FirstOnboardingScreen from "./Screens/FirstOnboardingScreen";
import SecondOnboardingScreen from "./Screens/SecondOnboardingScreen";
import ThirdOnboardingScreen from "./Screens/ThirdOnboardingScreen";
import SignUp from "./Screens/SignUp";
import SignUpScreen from "./Screens/SignUpScreen";
import LoginProfileScreen from "./Screens/LoginProfileScreen";
import PassCodeScreen from "./Screens/PassCodeScreen";
import EnterPassCode from "./Screens/EnterPassCode";
import VideoCallScreen from "./Screens/VideoCallScreen";
import ChatList from "./Screens/ChatList";
import SignInFingerPrint from "./Screens/SignInFingerPrint";
import { auth, db } from "./firebase";
import { Context } from "./context";
import Chats from "./Screens/Chats";

const Stack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overShootingClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: "1000",
    easing: Easing.linear,
  },
};

export default function AppNavigator() {
  const [loggedin, setIsloggedIn] = useState(null);

  const dispatch = useDispatch();
  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        db.collection("users").doc(user?.uid).set({
          email: user?.email,
        });
        return;
      }
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setIsloggedIn(true);
        dispatch({ type: "users_details", payload: user });
        console.log("we are now authenticated", user?.email);
      }

      ///do other thing
      else {
        setIsloggedIn(false);
        console.log("not authenticated");
        // navigation.navigate("SignInFingerPrint");
      }
    });
  }, [setIsloggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        initialRouteName="FirstOnboardingScreen"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {loggedin ? (
          <>
            {/* <Stack.Screen
            name="FirstOnboardingScreen"
            options={{ headerShown: false }}
            component={FirstOnboardingScreen}
          />

          <Stack.Screen
            name="SecondOnboardingScreen"
            options={{ headerShown: false }}
            component={SecondOnboardingScreen}
          />

          <Stack.Screen
            name="ThirdOnboardingScreen"
            options={{ headerShown: false }}
            component={ThirdOnboardingScreen}
          /> */}
            {/* <Stack.Screen
            name="SignUpScreen"
            options={{
              headerShown: false,
            }}
            component={SignUpScreen}
          /> */}

            {/* <Stack.Screen
            name="LoginProfileScreen"
            options={{ headerShown: false }}
            component={LoginProfileScreen}
          /> */}

            {/* <Stack.Screen
            name="PassCodeScreen"
            options={{
              headerShown: false,
            }}
            component={PassCodeScreen}
          /> */}

            {/* <Stack.Screen
            name="EnterPassCode"
            options={{
              headerShown: false,
            }}
            component={EnterPassCode}
          /> */}
            <Stack.Screen
              name="ChatList"
              options={{
                headerShown: false,
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
              component={ChatList}
            />
            <Stack.Screen
              name="VideoCallScreen"
              options={{
                headerShown: false,
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
              component={VideoCallScreen}
            />
            <Stack.Screen
              name="FavouriteScreen"
              options={{ headerShown: false }}
              component={FavouriteScreen}
            />
            <Stack.Screen
              name="ChatScreen"
              options={{
                headerShown: false,
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
              component={ChatScreen}
            />
            <Stack.Screen
              name="ProfileScreen"
              options={{ headerShown: false }}
              component={ProfileScreen}
            />

            <Stack.Screen
              name="Chats"
              options={{ headerShown: false }}
              component={Chats}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignInFingerPrint"
              options={{
                headerShown: false,
                gestureDirection: "vertical",
              }}
              component={SignInFingerPrint}
            />

            <Stack.Screen
              name="SignUpScreen"
              options={{
                headerShown: false,
              }}
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { View } from "react-native";

import { Provider } from "react-redux";
import { createStore } from "redux";
import UserReducer from "./reducer/usersReducer";

import AppNavigator from "./AppNavigator";

const store = createStore(UserReducer);

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
}

// w-2 === 0.5rem  === 8px
// 1rem === 16px
// 2rem === 32

//// down tabs after i install native base at night

// vioce call ....not available
// pin setting screen ....dont know yet?

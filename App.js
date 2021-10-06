import React, { useState } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import UserReducer from "./reducer/usersReducer";

import AppNavigator from "./AppNavigator";

const store = createStore(UserReducer);

export default function App() {
  // const [contextMessg, setContextMessg] = useState(null)
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

// blourd-group
// modify the picture by navigating to a component to display a full pic
// modify the updating of the profile pics either by auto updating or showing a modal
// the chat profile layout profile pics should be more align to the arrow
// genrate the apk file and build the gradlew file for small size generation

/// aws chat app
/// audio features
// modify the picture by navigating to a component to display a full pic
// modify the chatting style to be consistence
// genrate the apk file and build the gradlew file for small size generation
// genrate the apk file and build the gradlew file for small size generation

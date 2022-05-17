import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Loading } from "../../components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { MapScreen } from "../../features/map/screen/map.screen";
import { WriteScreen } from "../../features/write/screen/write.screen";
import { EmojiSelectScreen } from "../../features/write/screen/emojiSelect.screen";
import { CameraScreen } from "../../features/write/screen/camera.screen";

import { SignIn0101 } from "../../features/login/Screens/SignIn/SignIn0101.js";
import { SignIn0201 } from "../../features/login/Screens/SignIn/SignIn0201.js";
import { SignIn0202 } from "../../features/login/Screens/SignIn/SignIn0202";
import { SignIn0203 } from "../../features/login/Screens/SignIn/SignIn0203";
import { SignIn0204 } from "../../features/login/Screens/SignIn/SignIn0204";

import { WalkThrough0101 } from "../../features/login/Screens/WalkThrough/WalkThrough0101.js";

import { SignUp0101 } from "../../features/login/Screens/SignUp/SignUp0101";
import { SignUp0201 } from "../../features/login/Screens/SignUp/SignUp0201";
import { SignUp0202 } from "../../features/login/Screens/SignUp/SignUp0202";
import { SignUp0203 } from "../../features/login/Screens/SignUp/SignUp0203";
import { SignUp0204 } from "../../features/login/Screens/SignUp/SignUp0204";
import { SignUp0205 } from "../../features/login/Screens/SignUp/SignUp0205";
import { DetailScreen } from "../../features/detail/DetailScreen";
import { PlaceFeedScreen } from "../../features/Feed/screen/place.feed.screen";
import { AreaFeedScreen } from "../../features/Feed/screen/area.feed.screen";

const MainStack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="WalkThrough0101" component={WalkThrough0101} />
        <MainStack.Screen name="SignIn0101" component={SignIn0101} />
        <MainStack.Screen name="SignIn0201" component={SignIn0201} />
        <MainStack.Screen name="SignIn0202" component={SignIn0202} />
        <MainStack.Screen name="SignIn0203" component={SignIn0203} />
        <MainStack.Screen name="SignIn0204" component={SignIn0204} />
        <MainStack.Screen name="SignUp0101" component={SignUp0101} />
        <MainStack.Screen name="SignUp0201" component={SignUp0201} />
        <MainStack.Screen name="SignUp0202" component={SignUp0202} />
        <MainStack.Screen name="SignUp0203" component={SignUp0203} />
        <MainStack.Screen name="SignUp0204" component={SignUp0204} />
        <MainStack.Screen name="SignUp0205" component={SignUp0205} />

        <MainStack.Screen name="Loading" component={Loading} />
        <MainStack.Screen name="MapScreen" component={MapScreen} />
        <MainStack.Screen name="PlaceFeedScreen" component={PlaceFeedScreen} />
        <MainStack.Screen name="AreaFeedScreen" component={AreaFeedScreen} />

        <MainStack.Screen name="WriteScreen" component={WriteScreen} />
        <MainStack.Screen name="DetailScreen" component={DetailScreen} />

        <MainStack.Group screenOptions={{ presentation: "modal" }}>
          <MainStack.Screen name="Emoji" component={EmojiSelectScreen} />
          <MainStack.Screen name="CameraScreen" component={CameraScreen} />
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer> // DropsOnMap은 MapScreen과 사실상 동일. 기능 구분을 용이하게 하기 위해 임시 분리.
  );
};

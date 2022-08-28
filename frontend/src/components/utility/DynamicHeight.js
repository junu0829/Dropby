import * as React from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

export const DynamicHeight = ({ animValue }) => {
  const Max_Height = 150;
  const Min_Height = 95;
  const Scroll_Distance = Max_Height - Min_Height;

  // const animatedHeaderHeight = scrollOffsetY.interpolate({
  //   inputRange: [0, Scroll_Distance],
  //   outputRange: [Max_Header_Height, Min_Header_Height],
  //   extrapolate: "clamp",
  // });

  return null;
};
